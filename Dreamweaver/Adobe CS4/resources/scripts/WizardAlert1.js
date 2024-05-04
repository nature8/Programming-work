/*!
**********************************************************************
@file WizardAlert1.js

Copyright 2003-2008 Adobe Systems Incorporated.                     
All Rights Reserved.                                                
                                                                    
NOTICE: All information contained herein is the property of Adobe   
Systems Incorporated.                                                                                                                    

***********************************************************************
*/
/*
WizardAlert1 for reporting any Wizardalert1 screens.
*/

function WizardAlert1(inSession, inTitle, inBody, buttonsArray, subTitle, extraOptions)
{
	try
	{
		if(inSession)
			this.session = inSession;
		else
		{
            this.LogError("Installer Session needs to be passed to WizardAlert1, trying out gWizardControl.session as alternative!");			
            //alert("Installer Session needs to be passed to WizardAlert1, trying out gWizardControl.session as alternative!");
			this.session = gWizardControl.session;
		    if(!this.session)
		    {
		        if(gWizardControl)
		            gWizardControl.NavQuit();
		        else
		        {
		            alert("Critical errors were found in setup");  
		        }
		    }
		}
		if (!this.alert1Template)
		{
			var alert1PathArray = new Array(this.session.GetResourcesPath(), "/common/alert1/alert1.html");
			var alert1Path = _concatPaths(alert1PathArray, this.session.GetDefaultProperties().platform);
			var alert1Contents = this.session.LoadFile(alert1Path);
			this.alert1Template = alert1Contents.data;	
		}

		if (!this.alert1Template || this.alert1Template.length <= 0)
		{
			throw "Unable to load alert1.html";
		}

		var systemInfo = this.session.systemInfo;
		var currentPlatform = systemInfo.Macintosh ? "Mac" : "Win";
		
		//correct path to css via code
		var cssURLArray;
		if(currentPlatform=="Win")
		{
		    cssURLArray =  new Array(this.session.GetResourcesPath(), "common", "alert1", "alert1_win");
		}
		else
		{
		    cssURLArray =  new Array(this.session.GetResourcesPath(), "common", "alert1", "alert1_mac");
		}
		var cssURL = "file://" + _concatPaths(cssURLArray, this.session.GetDefaultProperties().platform);

		this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_CSS",cssURL);
		
		//correct path to js via code
		var jsURLArray_1 =  new Array(this.session.GetResourcesPath(), "scripts", "WizardButton1");
		var jsURL_1 = "file://" + _concatPaths(jsURLArray_1, this.session.GetDefaultProperties().platform);

		this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_JS1",jsURL_1);
		
		//correct path to js via code
		var jsURLArray_2 =  new Array(this.session.GetResourcesPath(), "scripts", "WizardImage1");
		var jsURL_2 = "file://" + _concatPaths(jsURLArray_2, this.session.GetDefaultProperties().platform);

		this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_JS2",jsURL_2);

		//correct path to js via code
		var jsURLArray_3 =  new Array(this.session.GetResourcesPath(), "scripts", "WizardWidget1");
		var jsURL_3 = "file://" + _concatPaths(jsURLArray_3, this.session.GetDefaultProperties().platform);

		this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_JS3",jsURL_3);
		
		//correct path to js via code
		var jsURLArray_4 =  new Array(this.session.GetResourcesPath(), "scripts", "WizardReverseDisplay1");
		var jsURL_4 = "file://" + _concatPaths(jsURLArray_4, this.session.GetDefaultProperties().platform);

		this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_JS4",jsURL_4);

		//correct path to js via code
		var jsURLArray_5 =  new Array(this.session.GetResourcesPath(), "scripts", "WizardAccessibilityManager1");
		var jsURL_5 = "file://" + _concatPaths(jsURLArray_5, this.session.GetDefaultProperties().platform);

		this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_JS5",jsURL_5);
		//END OF JS REPLACE AREA

                // We used it to check if it is a RTL langage because 'if(this.session.languagertl)' don't work here
                var currentLang = getUserInterfaceLanguage(this.session);
                if ((null != currentLang) && (isLanguageRTL(currentLang)))
			this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_LANGUAGE_RTL","true");
		else
			this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_LANGUAGE_RTL","false");

		var imagefolderArray =  new Array(this.session.GetResourcesPath(), "media", "img");
		var imagefolderURL = "file://" + _concatPaths(imagefolderArray, this.session.GetDefaultProperties().platform)+"/";

		if(currentPlatform=="Win")
		{
			imagefolderURL = imagefolderURL.replace(/\\\\/g, "//");
			imagefolderURL = imagefolderURL.replace(/\\+/g, "/");
		}
		this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_IMAGE_FOLDER",imagefolderURL);
		
		var myregexp_gq = new RegExp("_REPLACE_AREA_OS_PLATFORM", "g");
		this.alert1Template = this.alert1Template.replace(myregexp_gq,currentPlatform);
		/*this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_OS_PLATFORM",currentPlatform);g*/
		
		var myregexp1 = new RegExp("_REPLACE_AREA_TITLE", "g");
		var windowTitle = "";
		if (extraOptions && extraOptions.bNoPrefixProductName) {
			// Do not append product name prefix to the given title
		}
		else {
			windowTitle = this.session.localization.GetString("locProductName") + " - ";
		}
		this.alert1Template = this.alert1Template.replace(myregexp1, windowTitle + inTitle);
		var myregexp = new RegExp("_REPLACE_JAWS_IS_RUNNING", "g");
		this.alert1Template = this.alert1Template.replace(myregexp, this.session.IsJawsRunning() ? "true" : "false");
		var myregexp2 = new RegExp("_REPLACE_AREA_SUB_TITLE", "g");
		if ((subTitle == null) || (subTitle == ""))
			subTitle = inTitle;
		this.alert1Template = this.alert1Template.replace(myregexp2,subTitle);
		this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_BODY",inBody);

		var buttonarea=null;
		var allbuttonz="";
		for(var i=0;i<buttonsArray.length;i++)
		{
			var eachWB = buttonsArray[i];
			allbuttonz+="{"
						+"label:'"
						//+inSession.localization.GetString("loc"+eachWB.label, eachWB.label)
						+eachWB.label
						+"',"
						+"left:'"+eachWB.left+"',"
						+"top:'"+"0px"+"',"
						+"returnCode:'"+eachWB.returnCode+"',"
						+"hotkey:'"+eachWB.hotkey+"',"
						+"defaultOption:'"+eachWB.defaultOption+"'"
							+"}";
			if(i<(buttonsArray.length-1))
			{
				allbuttonz+=",";
			}
		}
		this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_BUTTONZ",allbuttonz);

		if (extraOptions && extraOptions.buttonTemplateToUse) 
		{
			this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_BUTTON_TEMPLATE", extraOptions.buttonTemplateToUse);
		}
		else 
		{
			this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_BUTTON_TEMPLATE", "bigbutton_normalsize");
		}

		if (extraOptions && extraOptions.buttonSizeToUse) 
		{
			this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_BUTTON_SIZE", extraOptions.buttonSizeToUse);
		}
		else 
		{
			this.alert1Template = this.alert1Template.replace("_REPLACE_AREA_BUTTON_SIZE", "128px");
		}

		return this.session.UIShowModalAlert(this.alert1Template);
	}
	catch(ex)
	{
		alert(inBody);
	}
}