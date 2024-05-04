/*!
**********************************************************************
@file silentWorkflow.js

Copyright 2003-2006 Adobe Systems Incorporated.                     
All Rights Reserved.                                                
                                                                    
NOTICE: All information contained herein is the property of Adobe   
Systems Incorporated.                                                                                                                    

***********************************************************************
*/

/** Global session instance */
var gSession = null;

////////////////////////////////////////////////////////////////////////////
// Installer Actions
////////////////////////////////////////////////////////////////////////////

/**	The installAction that means don't do anything */
var kInstallerActionNone = "none"

/**  The installAction that means "install" */
var kInstallerActionInstall = "install";

/** The installAction that means remove */
var kInstallerActionRemove = "remove";

/**  The installAction that means "repair" */
var kInstallerActionRepair = "repair";
var kInstallerActionModify = "modify";

/**  The installAction that means "dont do anything" */
var kInstallerActionDoNotInstall = "donotinstall";

////////////////////////////////////////////////////////////////////////////
// Current workflow mode
////////////////////////////////////////////////////////////////////////////

/** Installation workflow */
var kWorkflowModeInstall = "Install";

/** Uninstallation workflow */
var kWorkflowModeUninstall = "Uninstall";

/** Maintenance workflow */
var kWorkflowModeMaintenance = "Maintenance";


var kOpResultSuccessWithReboot = 5;
var kOpResultSuccess = 0;
var kORSuccessWithMessage	= 7;

var kMultiLingualIsoCode = "ot_OT";

/**  SilentWorkflow */
function SilentWorkflow()
{
	this.bootstrapperInstalled = false;
	this.inContainer = null;
	this.deploymentData = null;
	this.installPayloadCount = -1;
	this.repairPayloadCount = -1;
	this.removePayloadCount = -1;
	this.totalPayloadCount = 0;
	this.alreadyDidExit = false;
	this.isFixedInstallDir = false;
	this.PayloadsToCheck = new Array();
	this.restartNeeded = false;
	this.removableMediaErrors = 0;
	this.payloadSerialWarnings = new Array();
	this.payloadsnottoinstall = new Array();
	this.payloadschecknottoinstall = new Array();
	this.driverPresentInDeployment = false;


	/**  Translate a LocalizedString for logging.
	If the supplied object is not a LocalizedString, assume it is a string and return
	it directly. */
	this._stringForLog = function(inStringOrObj)
	{
		var result = inStringOrObj;
		if (inStringOrObj.Translate && typeof inStringOrObj.Translate == "function" && gSession && gSession.localization)
		{
			result = inStringOrObj.Translate(gSession.localization, "en_US");
		}
		return result;
	}


	/**
	Fabricate the DOM for a system check error/warning
	*/
	this._logStuff = function(inClass, inText)
	{
		var session = gSession;

		var isArray = function(inObj)
		{
			return typeof inObj == "object" && inObj.length && inObj.concat && inObj.join;
		};

		var isLocalizedString = function(inObj)
		{
			return typeof inObj == "object" && inObj.Translate && typeof inObj.Translate == "function";
		};

		var resolveString = function(inObj, forLog)
		{
			if (isLocalizedString(inObj))
			{
				if (forLog)
					return inObj.Translate(session.localization, 'en_US');
				else
					return inObj.Translate(session.localization);
			}
			return inObj;
		};

		var contentList = inText;
		if (!isArray(inText))
			contentList = new Array(inText);

		for (var i in contentList)
		{
			var item = contentList[i];
			if (isArray(item))
			{
				if (item.length > 0)
				{
					for (var si in item)
					{
						if (inClass == "alertCritical")
							session.LogError(" - " + resolveString(item[si], true));
						else
							session.LogWarning(" - " + resolveString(item[si], true));
					}
				}
			}
			else
			{
				if (inClass == "alertCritical")
					session.LogError(resolveString(item, true));
				else
					session.LogWarning(resolveString(item, true));
			}
		}
	}


	/**  Install the bootstrapper
	returning true if sucessfully installed, false if not installed */
	this.silentInstallBootstrapper = function()
	{
		var retVal;
		if (this.inContainer)
		{		
			retVal = this.inContainer.InstallBootstrapper("install");
		}
	
		return (retVal && retVal.success == 1);
	};


	/**  Remove the bootstrapper, if the session is in a valid state for it to be removed
	returning true if sucessfully removed, false if not removed or found */
	this.silentUninstallBootstrapper = function()
	{
		var retVal;
		var shouldRemove = true;

		if (this.inContainer && this.bootstrapperInstalled)
		{
			if (gSession && gSession.sessionCollection)
			{
				var capsData = gSession.GetCAPS();
				
				if (capsData && capsData.Payloads)
				{
					for (var p in capsData.Payloads)
					{
						for (var c in capsData.Payloads[p].Collections)
						{
							if ((gSession.sessionCollection.collectionID == capsData.Payloads[p].Collections[c].collectionID) && (capsData.Payloads[p].Collections[c].installState != "0"))
								shouldRemove = false;
						}
					}
				}
			} 
			
			if (shouldRemove)	
				retVal = this.inContainer.InstallBootstrapper("remove");
		}
	
		return (retVal && retVal.success == 1);
	}

	
	/** Get the deployment file data */
	this.loadDeploymentFile = function()
	{
	    var retVal = false;
		var commandlineArgs = this.inContainer.GetCommandLineArguments();
		
		if(this.bExtensionsOnly == true)
		{
		    if (commandlineArgs && commandlineArgs.Properties && commandlineArgs.Properties.adobeCodeList)
		    {
		        this.deploymentData = new Object();
		        this.deploymentData.Properties = new Object();
		        this.deploymentData.PayloadActions = new Array();
		        var adobeCodes = commandlineArgs.Properties.adobeCodeList.split(",");
		        for(var index = 0; index <  adobeCodes.length; ++index)
		        {
		            var payloadAction = new Object();
		            payloadAction.adobeCode = adobeCodes[index];
		            payloadAction.action = "install";
		            this.deploymentData.PayloadActions.push(payloadAction);
		        }
			    retVal = true;		    		
			}
		}
		else
		{
		    if (commandlineArgs && commandlineArgs.DeploymentData)
		    {
			    this.deploymentData = commandlineArgs.DeploymentData;
			    retVal = true;
		    }
		} 
		
		return retVal;
	};
	

	/** Callback for installer progress, for looks */
	this.operationCallback = function(inOperationStatus)
	{
		var message  = null;
		try
		{
			message = gSession.PeekInstallThreadMessage();		
		}
		catch (ex)
		{
			gSession.LogFatal("Exception in message handling: " + ex);
			if (message && message.messageID)
				gSession.PostInstallThreadMessageResult(message.messageID, 0);
		}

		if (inOperationStatus.areAllOperationsComplete() == true)
		{
			if (!this.alreadyDidExit)
			{
				var thisCB = this;
				this.alreadyDidExit = true;
			}
		} 
		
		return (!this.alreadyDidExit);
	};	
	
	
	/**  Output the session errors, if any, to the log file */	
	this.logSessionErrors = function()
	{
		if (gSession.sessionErrorMessages && gSession.sessionErrorMessages[0])
		{
			gSession.LogFatal("Critical errors were found in setup:");

			for (var i = 0; i < gSession.sessionErrorMessages.length; i++)
				gSession.LogFatal(" - " + gSession.sessionErrorMessages[i][1]);
		}
	}
	
    this.SelectDependenciesForPayload = function (payload)
    {            
	    if(payload._dependentsArray != null)
	    {							    
	        for(var index=0; index < payload._dependentsArray.length; ++index)
	        {
	            var dependency = payload._dependentsArray[index];
	            this.SelectDependenciesForPayload(dependency);
	            gSession.LogInfo("Payload " + dependency.GetAdobeCode() + " is dependency for " + payload.GetAdobeCode() + " Aligning its action according to parent.");
	            dependency.policyNode.SetAction(true/*kPolicyActionYes*/);
	        }
	    }
	    //Also check if current payload is parent for some other payloads
	    for(var adobecode in gSession.sessionPayloads)
	    {
	        var extn = gSession.sessionPayloads[adobecode];
	        if(extn && extn.parentPayload && (extn.parentPayload.GetAdobeCode() == payload.GetAdobeCode()))
	        {
	            gSession.LogInfo("Payload " + extn.GetAdobeCode() + " is extension payload. Aligning its action according to parent.");
    	        extn.policyNode.SetAction(true/*kPolicyActionYes*/);    	        
	        }    
	    }
    }
    
	/**  Run the silent workflow, including bootstrapping and installation
	return true if we ran as expected, false if with any error */
	this.runSilent = function()
	{	
	    var retVal = false;
		var objProps;
		var objDirMap;
		var uiCallbackObj;
		var commandlineArgs;		
		var conflictingBlockingErrorList = new Array();
		
		this.bExtensionsOnly = false;

		// --------------------------- A. Bootstrap workflow ---------------------------
		// Here we can't yet log exceptions; depend on ES workflow to catch exceptions outside try
		this.inContainer = new ContainerProxy;	
		
		// Note : For Fix for bug 1622425, reinstall will also install bootstrapper, 
		// earlier it was only installing bootstrapper if it was not installed
		if (this.inContainer)
		{
		    commandlineArgs = this.inContainer.GetCommandLineArguments();
		    if(commandlineArgs && commandlineArgs.Properties && commandlineArgs.Properties.extensionsOnly && commandlineArgs.Properties.extensionsOnly == "1")
		    {
		        this.bExtensionsOnly = true;
		    }
			try
			{
			    // Test for singleton
				if (this.inContainer.IsSetupLocked() ||
					this.inContainer.IsBootstrapperLocked() ||
						!this.inContainer.AcquireSetupLock())
				{
					this.inContainer.SetWorkflowExitCode("11");
					this.inContainer.LogError("Setup Aready Running.");
					throw "Setup Aready Running.";
				}
				
				// Check security credentials
				var userCredentials = this.inContainer.GetUserInfo();
				var isValid = (null != userCredentials);
				if (userCredentials && userCredentials.hasCredentials)
					isValid = (1 == userCredentials.hasCredentials) ? true : false;

				if (!isValid)
				{
					this.inContainer.SetWorkflowExitCode("14");
					this.inContainer.LogError("The current user doesn't have sufficient security credentials to install this software.");
					throw "The current user doesn't have sufficient security credentials to install this software";	
				}
				
				objProps = this.inContainer.GetDefaultProperties();
				objDirMap = this.inContainer.GetDirectoryTokenMap();
			
				if (objProps && objDirMap)
				{
					var bootstrapInstallDir = _concatPaths(new Array(objDirMap["[AdobeCommon]"], "Installers", objProps["sessionID"], "resources", "scripts", "InstallerSession.js"), objProps["platform"]);
					var pageDataObj = this.inContainer.LoadFile(bootstrapInstallDir);
							
					if (pageDataObj)
					{
						var pageData = pageDataObj.data;
						var actionString = "";
						if (this.loadDeploymentFile())
						{
							if (this.deploymentData && this.deploymentData.PayloadActions)
								actionString = this.deploymentData.PayloadActions[0].action;
						}
	                    
	                    //Bootstrapping not required when patching
	                    if(this.bExtensionsOnly != true)
	                    {
						    if (actionString != kInstallerActionRemove) 
						    {
							    if (this.silentInstallBootstrapper())
								    this.bootstrapperInstalled = true;
							    else
								    throw "Could not install the bootstrapper - Not Remove"; 
						    }
						    else
						    {
							    if (!pageData)
							    {
								    if (this.silentInstallBootstrapper())
									    this.bootstrapperInstalled = true;
								    else
									    throw "Could not install the bootstrapper"; 
							    } 
							    else
							    {
								    this.bootstrapperInstalled = true;
							    }
						    }
						}
						else
						{
    						this.bootstrapperInstalled = true;
						}
					} 
					else
					{
						throw "Failure searching for installed bootstrapper: missing files";
					}
				}
				else
				{
					throw "Failure searching for installed bootstrapper: could not aquire container properties";
				}
			}
			catch (ex)
			{
				this.inContainer.LogFatal("Exception: " + ex);
			}
		}
		else
		{
			throw "Failure searching for installed bootstrapper: could not create the container";
		}

		// --------------------------- B. Main Workflow  ---------------------------
		// Here we can use logging upon finding an exception, once we create our session
		try
		{ 
			if (this.bootstrapperInstalled)
			{	
				// --------------------------- Load the JavaScript support files ---------------------------
				var filesToLoad = new Array("constants.js", "InstallerPayload.js", "InstallerSession.js", "UICallback.js", "WizardWidgets.js",
											"WizardPage.js", "WizardControl.js", "WizardPayload.js");

				if (objProps && objDirMap)
				{	
					// Standard files
					for (var i = 0; i < filesToLoad.length; i++)
					{
						// Get the path to the file in question
						var bootstrapInstallDir = _concatPaths(new Array(objDirMap["[AdobeCommon]"], "Installers", objProps["sessionID"], "resources", "scripts", filesToLoad[i]), objProps["platform"]);
						var pageDataObj = this.inContainer.LoadFile(bootstrapInstallDir);

						if (pageDataObj)
						{
							var pageData = pageDataObj.data;

							if (pageData && pageData != '')
								var pageClass = eval(pageData);
						}
					} 
				
					// System Requirements file
					var bootstrapInstallDir = _concatPaths(new Array(objDirMap["[AdobeCommon]"], "Installers", objProps["sessionID"], "resources", "pages", "systemCheck", "systemCheck.js"), objProps["platform"]);
					var pageDataObj = this.inContainer.LoadFile(bootstrapInstallDir);

					if (pageDataObj)
					{
						var pageData = pageDataObj.data;

						if (pageData && pageData != '')
							var pageClass = eval(pageData);
					}
				}
				
				try {
					// Verify we have the building blocks we need
					if (systemCheck_wp == null)
						throw "systemCheck.js";
						
					if (UICallback == null)
						throw "UICallback.js";						
						
					if (InstallerSession == null)
						throw "InstallerSession.js";
						
					if (InstallerPayload == null)
						throw "InstallerPayload.js";	
						
					if (WizardButton == null)
						throw "WizardWidgets.js";	
						
					if (WizardPage == null)
						throw "WizardPage.js";													

					if (WizardControl == null)
						throw "WizardControl.js";
						
					if (WizardPayload == null)
						throw "WizardPayload.js";													
				} 
				catch (exc)
				{
					if (exc)
						throw "JavaScript Support file could not be loaded: " + exc;
					else
						throw "JavaScript Support files could not be loaded";
				}
				
				// --------------------------- Initialize the session ---------------------------
				gSession = new InstallerSession();
				uiCallbackObj = new UICallback();
				
				if (this.inContainer)
				{
					this.inContainer.LogInfo(""); 
					this.inContainer.LogInfo("-----------------------------------------------------------------");	
					this.inContainer.LogInfo("----------------- BEGIN Silent Installer Session ----------------");
					this.inContainer.LogInfo("-----------------------------------------------------------------");
				}
				
				if (gSession) 
				{
					// Load the main localization
					var xmlPath = _concatPaths(new Array(objDirMap["[AdobeCommon]"], "Installers", objProps["sessionID"], "resources", "main.xml"), objProps["platform"]);
					gSession.localization = new Localization(gSession, xmlPath, gSession.properties, true);

					if (!gSession.CreatePayloadSession(uiCallbackObj))
					{
						var setupCount = 0;
						var setupName = "Setup";
						var allRunningApps = gSession.GetRunningApplications();

						if (allRunningApps && allRunningApps.Applications && allRunningApps.Applications[0])
						{	
							for (var appIndex=0; appIndex < allRunningApps.Applications.length; ++appIndex)
							{		
								if (allRunningApps.Applications[appIndex].friendlyName == "Setup" || allRunningApps.Applications[appIndex].friendlyName == "Adobe Setup" )
								{
									setupName = allRunningApps.Applications[appIndex].friendlyName;
									setupCount++;
								}
							}
						}
						
						if (setupCount > 1)
							throw "Installation cannot continue until other instances of Setup are closed.";
						else
							throw "Failed to create payload session";
					}
				
					if (null == gSession.sessionPayloads)
						throw "Could not initialize the session: session payloads are not defined"
					else
						gSession.LogInfo("Initialized the session for the silent workflow");
				} 
				else
				{
					throw "Could not initialize the session: failure creating new installer session";
				}
				if (!gSession.IsBootstrapped())
				{
					gSession.sessionErrorMessages.push(["sessionErrorInstallerDatabaseInvalid", "The installer database is invalid.  Please re-install the product from the original media."]);
					throw "The installer database is invalid.  Please re-install the product from the original media.";
				}
				
				// --------------------------- Load the deployment file ---------------------------
				if (!this.loadDeploymentFile())
					throw "Payload deployment data is invalid or missing";
				else 
					gSession.LogInfo("Found deployment data: \n" + this.inContainer._objectToString(this.deploymentData, 1));
				
				// --------------------------- Set the installation properties ---------------------------
				
				// Set the default INSTALLDIR, as long as we can find the driver payload
				var driver = gSession.GetDriverPayload();
				if (driver)
				{
					if (driver.INSTALLDIR && ("1" == driver.INSTALLDIR.isFixed))
					{
						this.isFixedInstallDir = true;
						gSession.LogInfo("Ignoring deployment input for the INSTALLDIR: marked as fixed");
					}
					
					if (driver.INSTALLDIR)
					{
						var installdir;
						if (driver.INSTALLDIR[objProps["platform"]])
							installdir = driver.INSTALLDIR[objProps["platform"]];
						else
							installdir = driver.INSTALLDIR["default"];
				
						if (installdir)
						{
							for (var eachAttr in objDirMap)
								installdir = installdir.replace(eachAttr, objDirMap[eachAttr]);

							installdir = _concatPaths(new Array(installdir), objProps["platform"]);
							gSession.properties["INSTALLDIR"] = installdir;
							gSession.LogInfo("Set the default INSTALLDIR to: " + gSession.properties["INSTALLDIR"]);
						}
					}
					else
					{
						gSession.LogWarning("Could not set the default INSTALLDIR: driver payload does not have an INSTALLDIR attribute");
					}
				}
				else
				{
					gSession.LogWarning("Could not set the default INSTALLDIR: could not find the driver payload");
				}
				
				if (this.deploymentData.Properties)
				{
					gSession.LogInfo("Found deployment properties: ");
					for (var prop in this.deploymentData.Properties)
					{
						// Installation Directory
						if (prop == "INSTALLDIR" && !this.isFixedInstallDir)
						{
							gSession.properties["INSTALLDIR"] = _concatPaths(new Array(this.deploymentData.Properties[prop]), objProps["platform"]);
							gSession.LogInfo("Setting property \"INSTALLDIR\" to: " + gSession.properties["INSTALLDIR"]);
					
						}
						// Install language
						else if (prop == "installLanguage")
						{
							gSession.properties[gConstants.kPropInstallLanguage] = this.deploymentData.Properties[prop];
							gSession.LogInfo("Setting property \"" + gConstants.kPropInstallLanguage + "\" to: " + gSession.properties[gConstants.kPropInstallLanguage] );
							
							var supportedLanguages = gSession.GetSupportedLanguagesArray();

							if (supportedLanguages && supportedLanguages[0])
							{
								gSession.LogInfo("Attempting to find the selected language in the set of available payload languages");
								var foundLanguage = false;
								
								for (var i = 0; i < supportedLanguages.length; i++)
								{
									if (supportedLanguages[i] == gSession.properties[gConstants.kPropInstallLanguage])
									{
										foundLanguage = true;
										break;
									}
								}
								
								if (!foundLanguage)
									throw "Language " + gSession.properties[gConstants.kPropInstallLanguage] + " is not in the list of supported languages";
							}
							else
							{
								throw "Could not get the list of supported languages";
							}
						}
						// Any other properties
						else if (prop != "INSTALLDIR")
						{
							gSession.properties[prop] = this.deploymentData.Properties[prop];
							gSession.LogInfo("Setting property \"" + prop + "\" to: " + gSession.properties[prop]);
						}
					}
				}
				else
				{
					throw "Could not set the properties from the silent deployment file";
				}	
				
				// --------------------------- Check and remove x64 payloads on x86 ---------------------------
				if (this.deploymentData.PayloadActions)
				{
					var deploymentCount = this.deploymentData.PayloadActions.length;
					for (var i in this.deploymentData.PayloadActions)
					{
						var payload = gSession.x64ExceptionPayloads[this.deploymentData.PayloadActions[i].adobeCode];
						if(payload)
						{
							var actionString = this.deploymentData.PayloadActions[i].action;
						
							gSession.LogWarning("64-bit payload specified in deployment. Currently running on x86 machine. Skipping this payload. AdobeCode:" + payload.GetAdobeCode() + " Product Name:" + payload.GetProductName() + " Deployment action was: " + actionString);					
									
							this.deploymentData.PayloadActions[i] = null;
						}
					}
				}
				
				// --------------------------- Set the payload choices ---------------------------
				if (this.deploymentData.PayloadActions)
				{
					gSession.LogInfo("Found payload actions: ");
					this.installPayloadCount = 0;
					this.removePayloadCount = 0;
					this.repairPayloadCount = 0;

					var deploymentCount = this.deploymentData.PayloadActions.length;
					var deploymentMap = new Object();

					// 1. Decide the mode.  We can't mix remove with install/repair because we don't know
					// how to sort the operations in that case.  We also throw errors here if the deployment
					// file specifies AdobeCodes not in our session.

					gSession.LogDebug("Deciding what installer mode to use...");
					
					this.mode = gSession.IsMaintenanceMode() ? null : kWorkflowModeInstall;

					for (var i in this.deploymentData.PayloadActions)
					{
						if(this.deploymentData.PayloadActions[i] == null)
							continue;
							
						var payload = gSession.sessionPayloads[this.deploymentData.PayloadActions[i].adobeCode];
						if (payload)
						{
							if (gSession.GetSessionData().driverPayloadID && this.deploymentData.PayloadActions[i].adobeCode == gSession.GetSessionData().driverPayloadID)
							{
								this.driverPresentInDeployment = true;
							}
							var actionString = this.deploymentData.PayloadActions[i].action;
							gSession.LogDebug("Requested action \"" + actionString + "\" for " + payload.LogID());
							switch (actionString)
							{
								case kInstallerActionInstall:
									if (this.mode == kWorkflowModeUninstall)
									{
										throw "Cannot mix install/repair actions with remove actions in a deployment file."
									}
									if (this.mode == null) // null == !kWorkflowModeMaintenance
									{
										this.mode = kWorkflowModeMaintenance;
									}
									break;
								case kInstallerActionRepair:
									if (this.mode == kWorkflowModeUninstall)
									{
										throw "Cannot mix install/repair actions with remove actions in a deployment file."
									}
									if (this.mode == kWorkflowModeInstall)
									{
										throw "Cannot repair payloads in install mode."
									}
									this.mode = kWorkflowModeMaintenance;
									break;
								case kInstallerActionRemove:
									if (this.mode == kWorkflowModeMaintenance || this.mode == kWorkflowModeInstall)
									{
 										throw "Cannot mix install/repair actions with remove actions in a deployment file."
									}
									this.mode = kWorkflowModeUninstall;
									break;
								case kInstallerActionDoNotInstall:
									if(this.mode == kWorkflowModeUninstall)
									{
										throw "Can not mix donotinstall action  with remove actions in a deployment file."
									}
								case kInstallerActionNone:
									// no-op
									break;
								default:
									throw "Invalid mode \"" + actionString + "\" for payload " + payload.LogID();
							}
							deploymentMap[this.deploymentData.PayloadActions[i].adobeCode] = actionString;
						}
						else
						{
							throw "An invalid AdobeCode was specified in the deployment file: " + this.deploymentData.PayloadActions[i].adobeCode;
						}
					}
					
					// If nothing is in the deployment file and we are in maintenance mode, assume modify
					if (this.mode == null)
						this.mode = kWorkflowModeMaintenance;
						
					gSession.LogDebug("Using installer mode " + this.mode);

					// --------------------------- Check for Personalization ---------------------------
					if (this.mode != kWorkflowModeUninstall)
					{
						var validResults = null;
						var serialNumberValid = "0";
						var serialNumberOutput = "";
						var serialNumberUpgrade = "";
						var serialNumberUpsell = "";
						var serialNumberUpdate = "";

						var mustProvideSerial = false;

						gSession.LogInfo("Checking for personalization streams");

	                    var driver = gSession.GetDriverPayload();
	                    if(driver)
	                    {
	                        driver = driver.AdobeCode;
	                        if(driver)
	                        {
                                validResults = gSession.GetStreamsForAdobeCode(driver, "SIF");

                                if (validResults && validResults["Streams"]) 
                                {
	                                if (validResults["Streams"][0]) 
	                                {
		                                for (var i = 0; i < validResults["Streams"].length; i++) 
		                                {
			                                if (validResults["Streams"][i]["name"] == "SIF")
			                                {
				                                this.PayloadsToCheck.push(driver);
                        						
				                                gSession.LogInfo("Driver payload with Adobe Code" + driver + " includes a serial check: defined \"serialNumber\" property required to install/repair");
				                                gSession.LogInfo("No trial option available for this install");
				                                mustProvideSerial = true;
			                                }
		                                }
	                                }	
                                }
	                        }
	                    }

						gSession.LogInfo("Setting the default afllanguage to ot_OT")
						gSession.aflLanguage = kMultiLingualIsoCode;
						if(this.bExtensionsOnly == true )
						{
							    //for patch no need of SN validation
							 mustProvideSerial=false;
						}

								
						// Check the serial number if a SIF was found in any payload
						if (this.PayloadsToCheck && this.PayloadsToCheck[0])
						{
							gSession.LogInfo("Checking for personalization information");

							// If a serial number was provided OR we have a driver with a SIF, we must match the number
							if (gSession.properties["serialNumber"] || mustProvideSerial)
							{
								/* Fix for bug 1746476 (tested) bug got deferred 
								if (gSession.properties["serialNumber"] && gSession.properties["serialNumber"].length == 29)
								{
									var validhypen = true;
									for (var i = 1; i <= 5; i++)
									{
										if (gSession.properties["serialNumber"].charAt(4*i+(i-1)) != '-')
										{
											validhypen = false;
											break;
										}
									}
									if (validhypen == false)
									{
									    throw "Hypen in \"serialNumber\" are not at correct positions";
									}
								} */


								if (!(gSession.properties["serialNumber"] && ((gSession.properties["serialNumber"].length == 24) /* || (gSession.properties["serialNumber"].length == 29)*/ )))
									throw "Property \"serialNumber\" is not valid: number is not present or well-formed";

								var serialResults = null;

								// Check each payload with a SIF
								for (var i = 0; i < this.PayloadsToCheck.length; i++)
								{
									serialResults = null;
									serialResults = gSession.IsValidSerialNumberForAdobeCode(this.PayloadsToCheck[i], gSession.properties["serialNumber"]);

									if (!(serialResults && serialResults["isValid"] && serialResults["isValid"] == "1"))
										break;
								}			

								if (serialResults) {
									if (null == serialResults["_error"] || "0" == serialResults["_error"]) {
										serialNumberOutput = serialResults["serialOutput"];
										serialNumberValid = serialResults["isValid"];
									}
								}
								


								gSession.LogInfo("Value of locale returned by the Serials.locale : " + serialResults.locale)
								if (serialResults.locale != kMultiLingualIsoCode)
								{
									gSession.LogInfo("Locale is not mul for serial number");
									if(gSession.properties[gConstants.kPropInstallLanguage])
									{
										gSession.LogInfo("Install Language is present");
										// since in reinstall mode we always say the install Language as the language in which installation was done , so we will override with the new 
										// language that the serial number returns.
										

										if( gSession.properties[gConstants.kPropInstallLanguage] != serialResults.locale && (this.mode != kWorkflowModeMaintenance))
										{
											throw "Property \"serialNumber\" locale: " + serialResults.locale + " does not match with the property \"installLanguage\" :" + gSession.properties[gConstants.kPropInstallLanguage] + " in Install silent mode deployment file "
										}
										else if(gSession.properties[gConstants.kPropInstallLanguage] != serialResults.locale && (this.mode == kWorkflowModeMaintenance))
										{
											// Setting the install Language as the language of the new serial number in the case of the Reinstall.
											gSession.LogInfo("Resetting installLanguage property to that of the serial Locale as we are running in reinstall mode and user has specified a new serial number");
											gSession.properties[gConstants.kPropInstallLanguage] = serialResults.locale
											
										}
										else if(gSession.properties[gConstants.kPropInstallLanguage] == serialResults.locale)
										{
											gSession.LogInfo("installLanguage property matches serial serial Locale");
										}
									}
									else
									{
										gSession.properties[gConstants.kPropInstallLanguage] = serialResults.locale
										gSession.LogInfo("Since installLanguage property is not defined setting it to the serial Locale");

									}
									gSession.LogInfo("changing the default afl language to the language of the serialResults.locale")
									gSession.aflLanguage = serialResults.locale
									gSession.LogInfo(" the new value of the aflLanguage is " + gSession.aflLanguage)
						
								}
								// we will add  a check for upgrade serial number here. We will see if this is an upgrade serial number.
								// if it is upgrade serial number we will throw an error saying that we do not accept upgrade serial numbers
								// in silent workflow 
								serialNumberUpgrade = serialResults["isUpgrade"];
								serialNumberUpsell = serialResults["isUpsell"];
								serialNumberUpdate = serialResults["isUpdate"];
					
					// If it is an upgrade serial number, populate the upgrade products list dropdown
							if(( serialNumberValid && serialNumberValid == "1" ) && ((serialNumberUpgrade && serialNumberUpgrade == "1") || (serialNumberUpdate && serialNumberUpdate == "1") || (serialNumberUpsell && serialNumberUpsell == "1") ))
							{
								// the serial number is valid but is an upgrade serial number.
								// lets throw an error and quit.
								throw "Property \"serialNumber\" contains value for an Upgrade/Update/Upsell serial number which should not be used for silent installation."


							}

								if ("1" == serialNumberValid) 
									gSession.properties["pers_EPIC_SERIAL"] = serialNumberOutput;
								else 
									throw "Property \"serialNumber\" is not valid: number does not match product"

								gSession.LogInfo("Found a valid serial number");
							}
							// If no serial was provided and we aren't asked to provide one for the driver, allow us to pass with a warning
							else
							{
							    if(this.bExtensionsOnly != true)
							    {
								    gSession.LogWarning("No 'serialNumber' property provided");
								    gSession.LogWarning("Skipping installation of the following payloads:");
								    for (var i = 0; i < this.PayloadsToCheck.length; i++)
								    {
									    var p = gSession.sessionPayloads[this.PayloadsToCheck[i]];
									    gSession.LogWarning("- " + p.GetProductName());
									    this.payloadSerialWarnings.push(p.GetProductName());

									    gSession.sessionPayloads[this.PayloadsToCheck[i]].SetInstallerAction(kInstallerActionNone);
								    }
								 }
							}
						}
						else
						{
							gSession.LogInfo("Skipping personalization checks");
						}
					}

					// Clear the plaintext serial number, as we don't wish to store this (valid even if no SN was given)	
					gSession.properties["serialNumber"] = "";

					// 2. Initialize the payload graph
					gSession.PayloadPolicyInit(this.mode);

					// 3. Iterate deployment payloads, and SetAction
					gSession.LogInfo("BEGIN Setting requested payload actions");
					var payloadList = PayloadDependencySort(gSession.sessionPayloads, this.mode == kWorkflowModeUninstall);
					var payloadPolicyFailure = false;
					for (var anAdobeCode in payloadList)
					{
						var payload = payloadList[anAdobeCode];
						var actionString = deploymentMap[payload.GetAdobeCode()];
						var installedStatus = null;
						var installedForThisSession = null;
						var installedOrUpdated = null;
						//new logic
						installedStatus = payload.GetPhysicalInstallState(gSession);
						installedStatus.logicallyInstalled = installedStatus.logicallyInstalled != "0";
						installedStatus.physicallyInstalled = installedStatus.physicallyInstalled != "0";
						installedOrUpdated = (installedStatus.logicallyInstalled
										|| installedStatus.physicallyInstalled
										|| installedStatus.effectiveAdobeCode != payloadList[anAdobeCode].GetAdobeCode()
										);

						gSession.LogInfo("Value returned on lookup of payload: "+ payload.LogID() + "is: " + installedOrUpdated);
						//Adding a simple check to throw an error in case a payload is marked for removal from the session in the deployment file but it is physically not installed on the user's machine.
						if((actionString == "remove" ) &&  (installedOrUpdated == false))
						{
									gSession.LogInfo("Payload " + payload.LogID() + " is not installed so should not be there in the deployment file");
									throw ("Payload" + payload.LogID() + "is not installed so should not be there in the deployment file");
						}
						// Fix for bug 1743923 donotinstall action doesn't work during reinstall if recommended dependency is already installed
						/*
						if ((actionString == "donotinstall") && (installedOrUpdated == true))
						{
									gSession.LogInfo("Payload " + payload.LogID() + " is already installed so action should not be donotinstall in the deployment file");
									throw ("Payload" + payload.LogID() + "is already installed so action should not be donotinstall in the deployment file");						
						}*/
						// Force driver to be checked
						if (null == actionString && payload.IsDriverForSession(gSession) && this.mode == kWorkflowModeInstall)
						{
							actionString = kInstallerActionInstall;
						}

						var uiPolicy = payload.policyNode.GetUIPolicy();
						gSession.LogInfo("action string for  " + payload.LogID() + "  is " + actionString);
							
						if (payload.policyNode.IsProtected(anAdobeCode))
						{
							payload.policyNode.SetAction(kPolicyActionYes);
						}
						if (actionString == kInstallerActionInstall || actionString == kInstallerActionRepair || actionString == kInstallerActionRemove)
						{
							gSession.LogDebug("Setting action for " + payload.LogID() + " per deployment file.");
							if (uiPolicy.selectable || (this.mode != kWorkflowModeUninstall && payload.IsDriverForSession(gSession)))
							{
								payload.policyNode.SetAction(kPolicyActionYes);
							}					
							else if (payload.hasUIParent())
							{
								var parentInstalledStatus = null;
								var parentInstalledOrUpdated = null;

								parentInstalledStatus = payload.uiParentPayload.GetPhysicalInstallState(gSession);
								parentInstalledStatus.logicallyInstalled = parentInstalledStatus.logicallyInstalled != "0";
								parentInstalledStatus.physicallyInstalled = parentInstalledStatus.physicallyInstalled != "0";
								parentInstalledOrUpdated = (parentInstalledStatus.logicallyInstalled
										|| parentInstalledStatus.physicallyInstalled
										|| parentInstalledStatus.effectiveAdobeCode != payloadList[anAdobeCode].GetAdobeCode()
										);
								if (payload.uiParentPayload.policyNode.GetAction() == kPolicyActionYes || parentInstalledOrUpdated)
								{
									payload.policyNode.SetAction(kPolicyActionYes)
								}
							}
							else
							{
								gSession.LogInfo("Selection of payload " + payload.LogID() + " is forbidden by the policy.");
							}

							if (payload.policyNode.GetAction() != kPolicyActionYes)
							{
								if (this.mode == kWorkflowModeMaintenance && payload.GetDependentsArray().length == 0)
									continue;

								// Ooops, we hit a constraint of some sort.  Log the info.
								payloadPolicyFailure = true;
								this._logStuff("alertWarning", "Error setting action for " + payload.LogID() + ":");
								if (payload.policyNode._message)
								{
									if (payload.policyNode._message.note)
									{
										this._logStuff("alertWarning", payload.policyNode._message.note);
									}
									if (payload.policyNode._message.detail)
									{
										for (var i in payload.policyNode._message.detail)
										{
											var detailItem = payload.policyNode._message.detail[i];
											this._logStuff(detailItem.className, detailItem.text);
										}
									}
								}
							}
							else
							{
							    //We are successful in setting the action. We should try setting action for the dependencies
							    this.SelectDependenciesForPayload(payload);
							}

						}
                        else
                        {			
	                        var bSkipThis = false;
	                        if(!this.bExtensionsOnly && payload.parentPayload)
	                        {
		                        gSession.LogInfo("Payload " + payload.GetAdobeCode() + " is extension payload. Aligning its action according to parent.");
		                        payload.policyNode.SetAction(payload.parentPayload.policyNode.GetAction());
		                        bSkipThis = true;		                        
	                        }
							if(uiPolicy.selectable && (actionString == kInstallerActionDoNotInstall) && (this.mode != kWorkflowModeUninstall) && !payload.IsDriverForSession(gSession))
							{
									gSession.LogInfo("Selection of payload " + payload.LogID() + " is allowed but the user has marked it for not to install");
									payload.policyNode.SetAction(kPolicyActionNo);
									//Lets set this in the array so that we know that it is not to be installed and later we can remove it from the session.payloadlist
									this.payloadsnottoinstall.push(payload.GetAdobeCode());
									
							}
							else if(!uiPolicy.selectable && (actionString == kInstallerActionDoNotInstall) && (this.mode != kWorkflowModeUninstall) && !payload.IsDriverForSession(gSession) && !payload.policyNode.IsProtected(anAdobeCode))
							{
									gSession.LogInfo("Selection of payload " + payload.LogID() + " is not allowed therefore shall be re-checking later");
									this.payloadschecknottoinstall.push(payload);
							}


                			// changing to take into account the factor of action string to be do not install.
	                        // Payload was not specified in the deployment and it is user selectable, set the action
	                        if ((bSkipThis == false) && uiPolicy.selectable && (actionString != kInstallerActionDoNotInstall))
	                        {
		                        if (!(this.mode == kWorkflowModeUninstall && payload.GetSatisfiedArray().length > 0))
		                        {
			                        payload.policyNode.SetAction(deploymentCount > 0 ? kPolicyActionNo : kPolicyActionYes);
		                        }
	                        }
							
                        }	
					}

					for(var p1 in this.payloadschecknottoinstall)
					{
				            var payload = this.payloadschecknottoinstall[p1];
							var err = false;
							for (var p2 in payload.satisfiesDependencies)
	                        {
	                             var dep_type = payload.satisfiesDependencies[p2].type;
	                             if (dep_type != kDependencyTypeRecommended)
	                             {
	                                 action = payload.satisfiesDependencies[p2].owningPayload.GetInstallerAction();
	                                 if (action != kInstallerActionNone)
	                                     err = true;
	                              }
	                                            	
		                    }
		                    if (err == true)
		                    {
								gSession.LogInfo("Selection of payload " + payload.LogID() + " is not allowed ");
		                        throw ("Payload" + payload.LogID() + "is non-selectable and should be removed from deployment.xml file");
		                    }
		                    else
		                    {
								gSession.LogInfo("Selection of payload " + payload.LogID() + " is allowed but the user has marked it for not to install");
				                this.payloadsnottoinstall.push(payload.GetAdobeCode());
		                    }
					}


	                for (var p1 in this.payloadsnottoinstall)
                    {
				            var payload = gSession.sessionPayloads[this.payloadsnottoinstall[p1]];
				            var depArray = payload.GetDependentsArray()
							for (var p2 in depArray)
	                        {
	                            var markdependent = true;
	                            depAdobeCode = depArray[p2].GetAdobeCode();
								for (var p3 in depArray[p2].satisfiesDependencies)
	                            {
	                                 if (depArray[p2].satisfiesDependencies[p3].owningPayload.GetAdobeCode() != this.payloadsnottoinstall[p1])
	                                 {
										  if (depArray[p2].satisfiesDependencies[p3].owningPayload.policyNode.GetAction() == kPolicyActionYes)
										  {
											  markdependent = false;
											  break;
										  }
	                                 }
	                            }                	
	                            if (markdependent == true)
	                            {
	                                for (var p4 in  this.payloadsnottoinstall)
	                                {
	                                    if (depAdobeCode == this.payloadsnottoinstall[p4])
	                                    {
	                                        markdependent = false;
	                                        break;
	                                    }
	                                }
	                                if (markdependent == true)
	                                      this.payloadsnottoinstall.push(depAdobeCode);    
	                            }
		                    }                             
                    }


					// For uninstall mode, mark driver and dependencies for uninstall
					// if all non-dependencies are marked for uninstall.
					if (this.mode == kWorkflowModeUninstall)
					{
						var driverAction = kPolicyActionYes;
						for (var anAdobeCode in payloadList)
						{
							var payload = payloadList[anAdobeCode];
							var uiPolicy = payload.policyNode.GetUIPolicy();
							if (uiPolicy.selectable && payload.policyNode.GetAction() == kPolicyActionNo  && payload.GetSatisfiedArray() == 0)
							{
								driverAction = kPolicyActionNo;
								break;
							}
						}

						if (gSession.GetSessionData().driverPayloadID)
						{
							var driver = gSession.sessionPayloads[gSession.GetSessionData().driverPayloadID];
							if (driver && driver.policyNode)
							{
								driver.policyNode.SetAction(driverAction);
							}
						}
					}

					// Tally up the operations

					for (var anAdobeCode in payloadList)
					{

						var payload = payloadList[anAdobeCode];
						var actionString = payload.GetInstallerAction();
						
						if (actionString == kInstallerActionInstall)
							this.installPayloadCount++;
						else if (actionString == kInstallerActionRepair)
							this.repairPayloadCount++;
						else if (actionString == kInstallerActionRemove)
							this.removePayloadCount++;
					}
					
					gSession.LogInfo("END Setting requested payload actions");
					if (payloadPolicyFailure)
					{
						var retryPolicyFailure = false;
						for (var anAdobeCode in payloadList)
						{
							var payload = payloadList[anAdobeCode];
							var actionString = deploymentMap[payload.GetAdobeCode()];
							if (actionString == kInstallerActionInstall || actionString == kInstallerActionRepair || actionString == kInstallerActionRemove)
							{	
								if (payload.policyNode.GetAction() != kPolicyActionYes)
								{
									  retryPolicyFailure = true;
								}
							}
						}

						if (retryPolicyFailure)
						{
							gSession.LogWarning("Some payload actions specified in the deployment file could not be applied.")
							throw "Payload actions could not be set. Search the log for \"BEGIN Setting requested payload actions\" for details.";
						}
					}

					
					// 4. Iterate all session payloads we are operating on and check the media
					for (var anAdobeCode in gSession.sessionPayloads)
					{
						var payload = gSession.sessionPayloads[anAdobeCode];
						if (payload && 
							payload.policyNode.GetAction == kPolicyActionYes &&
							payload._sessionData && 
							payload._sessionData.MediaInfo && 
							payload._sessionData.MediaInfo.type && 
							payload._sessionData.MediaInfo.path && 
							payload._sessionData.MediaInfo.type == 1)
						{
							// If this payload is not in the payloads folder, mark it as an error
							var mediaPathInfo = gSession.GetPathInformation(payload._sessionData.MediaInfo.path);
							// Test to see if the disk needed is there, if not, prompt
							if (!(mediaPathInfo && mediaPathInfo.isValidPath && mediaPathInfo.isValidPath == 1 && mediaPathInfo.pathExists && mediaPathInfo.pathExists == 1))
							{
								gSession.sessionErrorMessages.push(["sessionErrorMediaInvalidSilent", payload.LogID() + ": payload not found in the local payloads folder"]);
								this.removableMediaErrors++;	
							}
						} 
					}

					if (this.removableMediaErrors > 0)
					{
						throw "Removable media cannot be used for silent installation; please copy payloads to the local \"payloads\" folder to proceed";
					}
				}
				else
				{
					throw "Could not set the installer payload choices from the silent deployment file";
				}
				
				
				// --------------------------- Test the INSTALLDIR var various maladies ---------------------------
				if (this.installPayloadCount > 0 || this.repairPayloadCount > 0)
				{
					var installPathInfo = gSession.GetPathInformation(gSession.properties["INSTALLDIR"]);
					
					if (installPathInfo)
					{
						gSession.LogInfo("Collected advanced path check information for INSTALLDIR");

						// Check for invalid characters
						if (1 == installPathInfo.isValidCharacters)
							gSession.LogInfo("INSTALLDIR contains only valid characters");
						else
							throw "INSTALLDIR contains invalid characters";	

						// Check for length
						if (1 == installPathInfo.isValidLength)
							gSession.LogInfo("INSTALLDIR path does not exceed the maximum length");
						else
							throw "INSTALLDIR path exceeds the maximum allowable length";

						// Check for well-formed path
						if (1 == installPathInfo.isValidPath)
							gSession.LogInfo("INSTALLDIR is a well-formed path");
						else
							throw "INSTALLDIR is not a well-formed path";						

						// Check for root path
						if (1 == installPathInfo.isRootPartition)
							throw "INSTALLDIR cannot be the root path";
						else
							gSession.LogInfo("INSTALLDIR is not the root path");
						
						if (1 == installPathInfo.rootPath)
							throw "INSTALLDIR cannot be the root path";
						else
							gSession.LogInfo("INSTALLDIR is not the root path");

						// Check for local
						if (1 == installPathInfo.volumeInfo.isLocal)
							gSession.LogInfo("INSTALLDIR is on a local volume");
						else
							throw "INSTALLDIR is not on a local volume"; 

						// Check for writable
						if (1 == installPathInfo.volumeInfo.isWritable)
							gSession.LogInfo("INSTALLDIR is on a writable volume");
						else
							throw "INSTALLDIR path is not on a writable volume";

						// Check for case-sensitive
						if (1 == installPathInfo.volumeInfo.isCaseSensitive)
							throw "INSTALLDIR is on a case sensitive volume";	
						else
							gSession.LogInfo("INSTALLDIR is not on a case sensitive volume");				

						// Update space required
						gSession.LogInfo("Calculating space required...");	
						var spaceRequiredVolumeList = _calculateRequiredSpace(gSession);					
						
						// Check space required for each volume
						if (spaceRequiredVolumeList)
						{	
							for (var volumeName in spaceRequiredVolumeList)
							{
								gSession.LogInfo("Checking space for volume: " + volumeName);
								var sizeInfoForVolume = gSession.GetVolumeStatisticsFromPath(volumeName);
							
								if (sizeInfoForVolume)
								{
									if (spaceRequiredVolumeList[volumeName] > sizeInfoForVolume.freeSize)
										throw "Space on the volume " + sizeInfoForVolume.friendlyName + " is not sufficient to install: at least " + bytesToText(spaceRequiredVolumeList[volumeName]-sizeInfoForVolume.freeSize) + " needed to continue";
									else
										gSession.LogInfo("Space on volume " + sizeInfoForVolume.friendlyName + " is sufficient to install");
								}
								else
								{
									throw "Could not collect volume statistics for INSTALLDIR's volume";
								}
							}
						}
						else
						{
							throw "Could not collect volume statistics for verification of disk sizes";
						}
					}
					else
					{
						throw "Could not collect path information for directory INSTALLDIR";
					}
				}

				gSession.LogInfo("INSTALLDIR passed path basic path validation: " + gSession.properties["INSTALLDIR"]);
				
				// --------------------------- Do System/Conflict/Manifest Error Checks ---------------------------
				var sysCheckPage = new systemCheck_wp(null);
				var hasBlockingAppConflict = false;
				
				if (sysCheckPage)
				{
					// Conflicting Processes
					
					if (commandlineArgs && commandlineArgs.Properties && commandlineArgs.Properties.skipProcessCheck && commandlineArgs.Properties.skipProcessCheck == '1')
					{
						gSession.LogInfo("Skipping conflicting process check...");
					}
					else
					{
						gSession.LogInfo("Checking conflicting processes...");
						var runningAppWarningsAndErrors = sysCheckPage.updateRunningAppsList(gSession);

						if (runningAppWarningsAndErrors && (runningAppWarningsAndErrors[0] || runningAppWarningsAndErrors[1])) 
						{
							if (runningAppWarningsAndErrors[0].length > 0)
							{
								hasBlockingAppConflict = true;
								// We will add this information in an array that we can access later on at the end.
								gSession.LogError("Installation cannot continue until the following applications are closed:");
								conflictingBlockingErrorList = runningAppWarningsAndErrors[0];
								for (var i=0; i<runningAppWarningsAndErrors[0].length; i++)
								{
									gSession.LogError(" - " + runningAppWarningsAndErrors[0][i]);
								}
							}

							if (runningAppWarningsAndErrors[1].length > 0)
							{
								gSession.LogWarning("Please quit the following running applications prior to installation:");

								for (var i=0; i<runningAppWarningsAndErrors[1].length; i++)
								{
									gSession.LogWarning(" - " + runningAppWarningsAndErrors[1][i]); 
								}
							}	
						}
					}

					/*
					// System checks
					// Only check system requirements if we are installing something for the first time
					if (this.installPayloadCount > 0)
					{
						gSession.LogInfo("Checking system requirements...");
						var systemRequirementResults = sysCheckPage.runSystemRequirementsCheck(gSession);
						var hasBlockingSystemRequirementError = false;

						if (systemRequirementResults)
						{
							if (systemRequirementResults[0] && (systemRequirementResults[0].length > 0))
							{
								hasBlockingSystemRequirementError = true;
								gSession.LogError("The minimum system requirements listed below are needed in order to run this Adobe Product and are not met.");
								for (var i=0; i<systemRequirementResults[0].length; i++)
								{
									gSession.LogError(" - " + this._stringForLog(systemRequirementResults[0][i])); 
								}
								gSession.LogError("Please upgrade or adjust your system to meet these minmum requirements and then restart the installer.");
							}
							
							if (systemRequirementResults[2] && (systemRequirementResults[2].length > 0))
							{
								hasBlockingSystemRequirementError = true;
								gSession.LogError("This Adobe Product cannot run on the systems listed below.");
								for (var i=0; i<systemRequirementResults[2].length; i++)
								{
									gSession.LogError(" - " + this._stringForLog(systemRequirementResults[2][i])); 
								}
								gSession.LogError("You must upgrade or adjust your system and then restart the installer.");
							}
							
							if (systemRequirementResults[1] && (systemRequirementResults[1].length > 0))
							{
								gSession.LogWarning("The minimum system requirements listed below are recommended in order to run Adobe Product properly and are not met: ");
								for (var i=0; i<systemRequirementResults[1].length; i++)
								{
									gSession.LogWarning(" - " + this._stringForLog(systemRequirementResults[1][i])); 
								}
								gSession.LogWarning("It is recommended that you upgrade or adjust your system to meet these minmum requirements and then restart the installer.");
							}
						}
					}
					*/

					// Manifest errors		
					gSession.LogInfo("Checking for manifest errors...");
					var manifestErrorCount = sysCheckPage.checkManifestErrors(gSession);

					if (manifestErrorCount > 0)
					{	
						gSession.LogError(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");		
						gSession.LogError("Manifest errors were found:");
						gSession.LogError("Number of payloads with errors: " + manifestErrorCount);
						gSession.LogError(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
					}

					if (hasBlockingAppConflict /* || hasBlockingSystemRequirementError*/)
					{
						throw "Exiting from installation due to blocking error."
					}
					
					//Run the custom action code for pre-systemcheck
					sysCheckPage.RunCustomActions(gSession);
				}
				else
				{
					throw "Could not check for conflicting processes or system errors"
				}

				// --------------------------- Check for and report problems with the simulated install ---------------------------
				var sessionIsValid = true;
				var payloadErrors = new Array();
				var noOperationCouldBePerformed = true;
				
				_simulatePayloadOperations(gSession);

				// Report the results
				for (var anAdobeCode in gSession.sessionPayloads)
				{
					var aPayload = gSession.sessionPayloads[anAdobeCode];
					if (aPayload.GetOperationResult() != null)
					{
						noOperationCouldBePerformed = false;
						if ( aPayload.GetOperationResult().message
						&& aPayload.GetOperationResult().message.simulationResults)
						{
							var simulationResults = aPayload.GetOperationResult().message.simulationResults;
							for (var conflictIndex = 0; conflictIndex < simulationResults.conflicting.length; ++conflictIndex)
							{
								sessionIsValid = false;
								var conflictingAdobeCode = simulationResults.conflicting[conflictIndex];
								var conflictingPayload = gSession.allPayloads[conflictingAdobeCode];
								payloadErrors.push("critical", aPayload.GetProductName() + " cannot be installed alongside " + conflictingPayload.GetProductName());
							}
						}
					}
					gSession.LogDebug(aPayload.GetOperationResult());
				}

				// Report any payload dependencies that would not be met if the installation were to proceed
				var unsatisfiedDependenciesArray = gSession.AccumulateUnsatisfiedDependencies();
				for (var index = 0; index < unsatisfiedDependenciesArray.length; ++index)
				{
					sessionIsValid = false;
					var curDependency = unsatisfiedDependenciesArray[index];
					payloadErrors.push("critical", curDependency.owningPayload.GetProductName()	+ " depends on " + curDependency.productName	+ " to be installed.");
				}
				
				if(!sessionIsValid)
				{
					gSession.LogError("Found payload conflicts and errors:")
					for (var err = 0; err < payloadErrors.length; err++)
						gSession.LogError(" - " + payloadErrors[err]);
					
					throw "Conflicts were found in the selected payloads. Halting installation."
				}
				else
				{
					if (noOperationCouldBePerformed == true && this.mode == kWorkflowModeUninstall && this.driverPresentInDeployment == true)
					{
					    gSession.LogError("Other payload actions MUST be specified for uninstall in the Deployment file, besides the driver")
						throw "Other payload actions MUST be specified for uninstall in the Deployment file, besides the driver"
					}
					gSession.LogInfo("Payloads passed preflight validation.")
				}


				if(this.payloadsnottoinstall.length > 0)
				{
							for(var p1 in this.payloadsnottoinstall)
							{

								for (var p in gSession.sessionPayloads)
								{
										if(gSession.sessionPayloads[p].GetAdobeCode()==this.payloadsnottoinstall[p1])
										{
										    // Action set to None for payload not to install
											gSession.sessionPayloads[p].SetInstallerAction(kInstallerActionNone);
										}
										
								}
							}
				}

				// --------------------------- Perform the install/repair/remove action ---------------------------
				gSession.StartPayloadOperations(this.operationCallback);
				
				// --------------------------- Find post-install errors and warnings ---------------------------
				// Walk through the payloads that were successfully installed | uninstalled | repaired and note their status	
				var totalPayloadsInstalled = 0;
				var totalPayloadsRepaired = 0;	
				var totalPayloadsRemoved = 0;		
				var totalPayloadErrors = 0;
				var payloadErrors = new Array();
				var payloadInstalls = new Array();
				var payloadRepairs = new Array();
				var payloadRemoves = new Array();

				for (var adobeCode in gSession.sessionPayloads)
				{
					var p = gSession.sessionPayloads[adobeCode];
					var actionState = p.GetInstallerAction();
					var operationResult = p.GetOperationResult();

					if (actionState != kInstallerActionNone)
					{
						if (operationResult &&
							operationResult.message &&
							operationResult.message.code)
						{
							if (operationResult.message.code == kOpResultSuccess || operationResult.message.code == kOpResultSuccessWithReboot || operationResult.message.code == kORSuccessWithMessage)
							{
								if (operationResult.message.code == kOpResultSuccessWithReboot)
									this.restartNeeded = true;
									
								if(operationResult.message.code==kORSuccessWithMessage)
								{
									if (operationResult.message.args)
									{
										gSession.LogInfo("Setup succeeded with message: " + operationResult.message.args["en_US"]);
									}
								}
								switch (actionState)
								{
									case kInstallerActionInstall:
										totalPayloadsInstalled++;
										payloadInstalls.push(p.GetProductName());
										break;
									case kInstallerActionRepair:
										totalPayloadsRepaired++;
										payloadRepairs.push(p.GetProductName());
										break;
									case kInstallerActionRemove:
										totalPayloadsRemoved++;
										payloadRemoves.push(p.GetProductName());
										break;
									case kInstallerActionNone:
										// Do nothing
										break;
									default:
										gSession.LogError("Bad install state \"" + actionState + "\" for " + adobeCode);
										break;
								}
							}
							else
							{
								var errorMessage = "";
								switch (operationResult.message.code)
								{
									case gConstants.kORUserCancel:
										errorMessage = "User canceled installation";
										break;
									case gConstants.kORConflictsExist:
										errorMessage = "Conflicts with a component already installed";
										break;
									case gConstants.kORUpgradeFailure:
										errorMessage = "Upgrade failed";
										break;
									default:
										errorMessage = "Install failed";
										break;
								}
																
								payloadErrors.push(p.GetProductName() + ": " + errorMessage);
								totalPayloadErrors++;
							}
						}
						else
						{
							gSession.LogError("Payload " + adobeCode + " has an action \"" + actionState + "\" but no resultState");
						}
					}
				}
				
				// --------------------------- Uninstall the bootstrapper, if required ---------------------------
				if (this.bootstrapperInstalled && this.silentUninstallBootstrapper())
				{
					gSession.LogInfo("Ran uninstall for the bootstrapper");
					this.bootstrapperInstalled = false;
				}
				
				// --------------------------- Report the final results ---------------------------
				if (totalPayloadsInstalled > 0) 
				{
					gSession.LogInfo("Successfully installed " + totalPayloadsInstalled + " component" + ((totalPayloadsInstalled == 1) ? "" : "s") + ":");
					for (var msg = 0; msg < payloadInstalls.length; msg++)
						gSession.LogInfo(" - " + payloadInstalls[msg]);
				}
				else
				{
					gSession.LogInfo("Total components installed: 0");
				}

				if (totalPayloadsRepaired > 0)
				{
					gSession.LogInfo("Successfully repaired " + totalPayloadsRepaired + " component" + ((totalPayloadsRepaired == 1) ? "" : "s") + ":");
					for (var msg = 0; msg < payloadRepairs.length; msg++)
						gSession.LogInfo(" - " + payloadRepairs[msg]);
				}
				else
				{
					gSession.LogInfo("Total components repaired: 0");
				}

				if (totalPayloadsRemoved > 0)
				{
					gSession.LogInfo("Successfully removed " + totalPayloadsRemoved + " component" + ((totalPayloadsRemoved == 1) ? "" : "s") + ":");
					for (var msg = 0; msg < payloadRemoves.length; msg++)
						gSession.LogInfo(" - " + payloadRemoves[msg]);
				}
				else
				{
					gSession.LogInfo("Total components removed: 0");
				}	

				// Log the serial warnings
				if (this.payloadSerialWarnings && this.payloadSerialWarnings.length > 0)
				{
					gSession.LogWarning("The following payloads were not installed due to a missing serial number:");
					for (var msg = 0; msg < this.payloadSerialWarnings.length; msg++)
						gSession.LogWarning(" - " + this.payloadSerialWarnings[msg]);
				}

				// Log the payload errors
				if (totalPayloadErrors > 0)
				{
					gSession.LogError("The following payload errors were found during install:");
					for (var msg = 0; msg < payloadErrors.length; msg++)
						gSession.LogError(" - " + payloadErrors[msg]);

					// Return error to setup
					gSession.SetWorkflowExitCode("6");
				}
				
				// Note if restart is required
				if (this.restartNeeded || gSession.IsRestartNeeded())
				{
					gSession.LogInfo(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");		
					gSession.LogInfo("Restarting your computer is recommended:");
					gSession.LogInfo("In order to complete the installation, please restart the computer");
					gSession.LogInfo(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				}
				
			} // Bootstrapper installed
		} 
		catch (ex)
		{
			// Uninstall the bootstrapper, if required
			if (this.bootstrapperInstalled && this.silentUninstallBootstrapper())
			{
				if (gSession)
					gSession.LogInfo("Ran uninstall for the bootstrapper due to an exception");
				this.bootstrapperInstalled = false;
			}
			
			if (gSession)
				this.logSessionErrors();
			
			if (this.inContainer)
			{
				// Log the general exception
				this.inContainer.LogFatal("Exception: " + ex);
				// Add here logic to display the list of conflicting process that might be causing the problem.
				if(conflictingBlockingErrorList.length > 0)
					gSession.LogError(" The silent installation has failed due to the following Conflicting Processes running: ");
				for (var i=0; i<conflictingBlockingErrorList.length; i++)
				{	
					gSession.LogError(" - " + conflictingBlockingErrorList[i]);
				}
				this.inContainer.LogFatal("Exit code: 7");
				this.inContainer.SetWorkflowExitCode("7"); 
			} 
		} 
		
		if (this.inContainer)
		{
			this.inContainer.LogInfo("-----------------------------------------------------------------");	
			this.inContainer.LogInfo("------------------ END Silent Installer Session -----------------");
			this.inContainer.LogInfo("-----------------------------------------------------------------");			
			this.inContainer.LogInfo(""); 			
		}
	} 
}

/** Silent Worfklow "main" */

var silentInstall = new SilentWorkflow();

silentInstall.runSilent();
