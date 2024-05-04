var gINSTALLDIRFolderName = null;
var gShouldInstallColorProfileAliases = false;
var gPermanentColorProfileCount = 0;
var gShouldUninstallColorProfileAliases = false;
var gCAPSCollectionDataToWrite = null;
var gCAPSPayloadDataToWrite = null;
var gCAPSCollectionDataToRemove = null;
var gCAPSPayloadDataToRemove = null;
var gInstallMode = ARKGetProperty("INSTALL_MODE");
var gThirdParty = ARKGetProperty("THIRD_PARTY_RIBS");
var gAddRemoveInfo = null;
var gRelocatablePaths = new Object();
var gRelocatedPathTree = null;
var gAdobeCode = ARKGetProperty("adobeCode");

var gPayloadIdentifier = ARKGetProperty("adobeCode");
if (null == gPayloadIdentifier)
{
	gPayloadIdentifier = ARKGetProperty("sessionID");
}

var gPayloadInstallMode = null;

var gTokenPathsToTrack = new Object();
var gInstalledInfoPlistPaths = new Array();

//======================================
// Miscellaneous Utilities
//

var		g_kLogDebug  	= 0;
var		g_kLogInfo		= 1;
var 	g_kLogCritical	= 2;

function _RIBS_function_log(theLevel, theString)
{
	ARKLogMessage(theLevel, theString);
}


function ThrowIfFalse(value)
{
	if (false == value)
	{
		throw "ThrowIfFalse throw";
	}
}


function CompareVersionArrays(lhsVersionArray, rhsVersionArray, index)
{
	var result;
	
	if (null == index)
		index = 0;
	
	var lhsTestValue = lhsVersionArray[index];
	var rhsTestValue = rhsVersionArray[index];
	
	if (null == lhsTestValue)
		lhsTestValue = 0;
	if (null == rhsTestValue)
		rhsTestValue = 0;
	
	if (lhsTestValue > rhsTestValue)
	{
		result = 1;
	}
	else if (lhsTestValue < rhsTestValue)
	{
		result = -1;
	}
	else
	{
		if ((index < lhsVersionArray.length)
			|| (index < rhsVersionArray.length))
		{
			result = CompareVersionArrays(lhsVersionArray, rhsVersionArray, index + 1);
		}
		else
		{
			result = 0;
		}
	}
	return result;
}


function SetFractionComplete(numerator, denominator)
{
	return ARKSetFractionComplete(numerator, denominator);
}


function ExpandEmbeddedPropertyTokens(theString)
{
	var result = '';
	var re = /(\[\w+\])|([^[]+)/g;
	var theMatch = theString.match(re);
	
	for (var i = 0;
		i < theMatch.length;
		++i)
	{
		var segmentString = theMatch[i];
		var expandRegEx = /^\[(.*)\]$/;
		
		var matchResult = segmentString.match(expandRegEx);
		if (matchResult != null)
		{
			segmentString = ARKGetProperty(matchResult[1]);
		}
		
		result += segmentString;
	}
	
	return result;
}

function SetProcessorFamily(inFamily)
{
    ARKSetProperty("ProcessorFamily", inFamily);
    ThrowIfFalse(ARKAddToUninstallScript('ARKSetProperty(\"ProcessorFamily\", \"All\");\n'));
}

function LocalizeFilename(default_name, localizations)
{
	var localizedName = default_name;
	var lang = ARKGetProperty("installLanguage");
	if (localizations && localizations[lang] && localizations[lang].length > 0)
		localizedName = localizations[lang];
	return ExpandEmbeddedPropertyTokens(localizedName);
}


function IsBootstrapper()
{
	var result = false;
	var bootstrapperValue = ARKGetProperty("CAPS_28B98837_8526_4159_B4E7_D0FD5E235960.BootstrapperPackage");
	if (bootstrapperValue && (1 == bootstrapperValue))
	{
		result = true;
	}
	
	return result;
}


function IsDriverPayload()
{
	var result = false;
	
	if (!IsBootstrapper())
	{
		var driverAdobeCode = ARKGetProperty("driverAdobeCode");
		var thisAdobeCode = ARKGetProperty("adobeCode");
	
		if (driverAdobeCode
			&& (null != driverAdobeCode)
			&& (driverAdobeCode == thisAdobeCode))
		{
			result = true;
		}
	}
	
	return result;
}


//======================================
// Path Utilities
//

function ConcatPath()
{
	var arrayResult = new Array;
	var prefix = new String;
	
	for (var argIndex = 0; argIndex < arguments.length; argIndex++)
	{
		var nextString = arguments[argIndex];
		nextString = nextString.replace("\\\\", "||");
		
		if ((0 == argIndex) && ('\\' == nextString.charAt(0)))
			prefix = "\\";
		
		var nextArray = nextString.split('\\');
		
		for (var segmentIndex = 0; segmentIndex < nextArray.length; segmentIndex++)
		{
			if (nextArray[segmentIndex].length > 0)
				arrayResult.push(nextArray[segmentIndex]);
		}
	}
	
	return (prefix.concat(arrayResult.join('\\'))).replace("||", "\\\\");
}


function ExpandPath(path)
{
	path = path.replace("\\\\", "||");
	var pathArray = path.split('\\');
	var expandRegEx = /^\[(.*)\]$/;
	
	var matchResult = pathArray[0].match(expandRegEx);
	if (matchResult != null)
	{
		var tokenName = matchResult[1];
		pathArray[0] = ARKGetProperty(tokenName);
		
		var is64Bit = (ARKGetProperty("ProcessorFamily") == "x64");
		if((is64Bit == true) && (tokenName != "INSTALLDIR") && (0 != tokenName.indexOf("ARK_")) )
		{
		    pathArray[0] = pathArray[0].replace(" (x86)", "");    
		}
		// don't track ARK implementation paths, just RIBS ones
		if (0 != tokenName.indexOf("ARK_"))
			gTokenPathsToTrack[tokenName] = pathArray.join('\\');
	}
	
	return pathArray.join('\\').replace("||", "\\\\");
}


function GetParentPath(path)
{
	path = path.replace("\\\\", "||");
	
	var startsWithSlash = ('\\' == path[0]);
	var resultArray = new Array;
	var pathArray = path.split('\\');
	while (pathArray.length > 0)
	{
		var cur = pathArray.shift();
		if ("" != cur)
			resultArray.push(cur);
	}
	resultArray.pop();	// remove last element
	
	var result;
	if (startsWithSlash)
		result = "\\" + resultArray.join('\\');
	else
		result = resultArray.join('\\');
	
	result = result.replace("||", "\\\\");
	return result;
}


function GetLastPathComponent(path)
{
	var result = path;
	path = path.replace("\\\\", "||");
	var pathArray = path.split('\\');
	if (pathArray.length > 0)
	{
		result = pathArray[pathArray.length - 1];
	}
	
	result = result.replace("||", "\\\\");
	
	return result;
}


function GetPathAttributes(path)
{
	return new ARKPathAttributes(path);
}


function TrackPathForRelocation(path)
{
	gRelocatablePaths[path] = 1;
}


function GetStorageKey()
{
	var storageKey = gPayloadIdentifier;
	if (null == storageKey)
	{
		storageKey = ARKGetProperty("sessionID");
	}
	
	return storageKey;
}


function StoreRelocationData()
{
	/*
	var pathsArray = new Array();
	for (var aPath in gRelocatablePaths)
	{
		pathsArray.push(aPath);
	}
	
	var tokensArray = new Array();
	for (var aTokenName in gTokenPathsToTrack)
	{
		var aTokenPath = gTokenPathsToTrack[aTokenName];
		var aTokenVolumePath = ARKGetVolumePathForPath(aTokenPath);
		tokensArray.push(new Array(aTokenName, aTokenVolumePath));
	}
	
	if ((pathsArray.length > 0)
		|| (tokensArray.length > 0))
	{
		ARKStoreRelocationData(GetStorageKey(), pathsArray, tokensArray);
	}
	*/
}


function DeleteRelocationData()
{
	ARKDeleteRelocationData(GetStorageKey());
}


// utility method for assembling the path tree used in RelocationAccessor.ResolvePath below
function BuildPathRelocationTree(inPathRemapArray)
{
	var result = new Object();
	
	for (var i = 0; i < inPathRemapArray.length; ++i)
	{
		var relocationPair = inPathRemapArray[i];
		if ((null != relocationPair) && (2 == relocationPair.length))
		{
			var originalSegments = relocationPair[0].split('\\');
			var curTreeNode = result;
			for (var segmentIndex = 0; segmentIndex < originalSegments.length; ++segmentIndex)
			{
				var curSegment = originalSegments[segmentIndex];
				if (null == curTreeNode.children)
				{
					curTreeNode.children = new Object();
				}
				
				if (null == curTreeNode.children[curSegment])
				{
					curTreeNode.children[curSegment] = new Object();
				}
				
				curTreeNode = curTreeNode.children[curSegment];
			}
			curTreeNode.remap = relocationPair[1];
		}
		else
		{
			ARKLogMessage(g_kLogCritical, "Unexpected relocation pair data in BuildPathRelocationTree() parameter");
			throw "Unexpected relocation pair data in BuildPathRelocationTree() parameter";
		}
	}
	
	return result;
}


// utility class for accessing relocation data
function RelocationAccessor()
{
	var allRelocationData = ARKGetRelocationData(GetStorageKey());
	
	var pathRelocationData = allRelocationData[0];
	this._relocationPathTree = BuildPathRelocationTree(pathRelocationData);
	
	var tokenVolumeData = allRelocationData[1];
	this._tokenVolumeData = new Object();
	for (var i = 0; i < tokenVolumeData.length; ++i)
	{
		var curTokenVolumeData = tokenVolumeData[i];
		if (curTokenVolumeData.length != 3)
		{
			ARKLogMessage(g_kLogCritical, "Unexpected quantity of token volume data");
			throw "Unexpected quantity of token volume data";
		}
		var newTokenElement = new Object();
		newTokenElement.token = curTokenVolumeData[0];
		newTokenElement.volumePath = curTokenVolumeData[1];
		newTokenElement.volumePathRemap = curTokenVolumeData[2];
		this._tokenVolumeData[newTokenElement.token] = newTokenElement;
	}
}


RelocationAccessor.prototype.ResolveToken = function(inToken)
{
	var curTokenPath = ARKGetProperty(inToken);
	var result = curTokenPath;
	var storedTokenData = this._tokenVolumeData[inToken];
	if (null != storedTokenData)
	{
		if (null != storedTokenData.volumePathRemap)
		{
			// volume alias resolves, use the new volume location
			var curTokenPathVolume = ARKGetVolumePathForPath(curTokenPath);
			// make sure the path starts with its volume path before replacing
			if (0 == curTokenPath.indexOf(curTokenPathVolume))
			{
				result = ConcatPath(storedTokenData.volumePathRemap, curTokenPath.substring(curTokenPathVolume.length));
			}
		}
		else
		{
			// Volume alias did not resolve.
			// If it has moved to the root volume, fail;
			// otherwise use the current path
			if ("\\" != storedTokenData.volumePath)
			{
				var storedVolumeCurVolumePath = ARKGetVolumePathForPath(storedTokenData.volumePath);
				if ("\\" == storedVolumeCurVolumePath)
				{
					ARKLogMessage(g_kLogCritical, "One or more reinstallation path is to a volume that is no longer mounted: " + storedTokenData.volumePath);
					throw "One or more reinstallation path is to a volume that is no longer mounted: " + storedTokenData.volumePath;
				}
			}
		}
	}
	
	return result;
}


// resolve an installed path to the current location of that path
// on the user's system.
RelocationAccessor.prototype.ResolvePath = function(path)
{
	var resolvedPath = path;
	// look for the longest remap of the path segments
	// in the relocation tree
	var pathArray = path.split('\\');
	var curTreeNode = this._relocationPathTree;
	var longestRemappedIndex = null;
	var longestRemappedTarget = null;
	for (var i = 0; (curTreeNode != null) && (i < pathArray.length); ++i)
	{
		var pathSegment = pathArray[i];
		if (curTreeNode.children)
		{
			curTreeNode = curTreeNode.children[pathSegment];
			if (curTreeNode != null)
			{
				if (curTreeNode.remap != null)
				{
					longestRemappedIndex = i;
					longestRemappedTarget = curTreeNode.remap;
				}
			}
		}
		else
		{
			curTreeNode = null;
		}
	}
	
	// if there was a remap in the path,
	// result is the remap plus the remaining path elements
	// after the remapped portion
	if (null != longestRemappedIndex)
	{
		resolvedPath = longestRemappedTarget;
		if ((longestRemappedIndex + 1) < pathArray.length)
		{
			var remainingPathArray = pathArray.slice(longestRemappedIndex + 1);
			resolvedPath += "\\" + remainingPathArray.join('\\');
		}
	}
	
	return resolvedPath;
}


// singleton access to RelocationAccessor instance
var gRelocationAccessor = null;
function GetRelocationAccessor()
{
	if (null == gRelocationAccessor)
	{
		gRelocationAccessor = new RelocationAccessor();
	}
	
	return gRelocationAccessor;
}


//======================================
// Mac Utilities
//

// Locates a version plist at or under the specified
// path. This descends recursively, but will not delve
// into subdirectories that appear to be packages or
// bundles. The objective is to locate the version.plist
// for the path in question, not one for a different
// bundle that happens to be inside.  Note: this can
// be passed a bundle path as its initial starting point
// and it will recurse.  It just won't descend into
// bundles inside the initial path.
function FindVersionPlistInDirectory(path)
{
	var result = null;
	
	var childrenNames = ARKGetPathChildren(path);
	while ((null == result) && (childrenNames.length > 0))
	{
		var childName = childrenNames.shift();
		var childPath = ConcatPath(path, childName);
		var childAttributes = GetPathAttributes(childPath);
		if (childAttributes.isDirectory)
		{
			// only descend if child dir doesn't look like a bundle
			if (-1 == childName.indexOf('.'))
			{
				result = FindVersionPlistInDirectory(childPath);
			}
		}
		else
		{
			if ("version.plist" == childName.toLowerCase())
			{
				result = childPath;
			}
		}
	}
	
	return result;
}


// Locates an Info plist at or under the specified
// path. This descends recursively, but will not delve
// into subdirectories that appear to be packages or
// bundles. The objective is to locate the Info.plist
// for the path in question, not one for a different
// bundle that happens to be inside.  Note: this can
// be passed a bundle path as its initial starting point
// and it will recurse.  It just won't descend into
// bundles inside the initial path.
function FindInfoPlistInDirectory(path)
{
	var result = null;
	
	var childrenNames = ARKGetPathChildren(path);
	while ((null == result) && (childrenNames.length > 0))
	{
		var childName = childrenNames.shift();
		var childPath = ConcatPath(path, childName);
		var childAttributes = GetPathAttributes(childPath);
		if (childAttributes.isDirectory)
		{
			// only descend if child dir doesn't look like a bundle
			if (-1 == childName.indexOf('.'))
			{
				result = FindInfoPlistInDirectory(childPath);
			}
		}
		else
		{
			if ("info.plist" == childName.toLowerCase())
			{
				result = childPath;
			}
		}
	}
	
	return result;
}


function GetVersionForBundle(bundlePath)
{
	var result = null;
	var versionPlistPath = FindVersionPlistInDirectory(bundlePath);
	if (versionPlistPath)
	{
		ARKLogMessage(g_kLogDebug, 'Reading version from version.plist at: ' + versionPlistPath);
		result = ARKGetVersionPlistVersion(versionPlistPath);
	}
	else
	{
		ARKLogMessage(g_kLogDebug, 'Version.plist not found for bundle at: ' + bundlePath);
	}
	
	if (null == result)
	{
		var infoPlistPath = FindInfoPlistInDirectory(bundlePath);
		if (infoPlistPath)
		{
			ARKLogMessage(g_kLogDebug, 'Reading version from Info.plist at: ' + infoPlistPath);
			result = ARKGetVersionPlistVersion(infoPlistPath);
		}
		else
		{
			ARKLogMessage(g_kLogDebug, 'Info.plist not found for bundle at: ' + bundlePath);
		}
	}
	
	if (null == result)
	{
		ARKLogMessage(g_kLogDebug, 'Version not found for path ' + bundlePath + ', using 0.0.0.0.0.');
		result = new Array(0, 0, 0, 0, 0);
	}
	
	return result;
}


//======================================
// Payload Commands
//

function MakeDirectoryPath(path, permanent)
{
	var parentPath;
	var parentAttributes;
	
	if (!ARKPathExists(path))
	{
		parentPath = GetParentPath(path);
		if (parentPath != path)
			MakeDirectoryPath(parentPath, permanent);
		ThrowIfFalse(ARKCreateDirectory(path));
		parentAttributes = GetPathAttributes(parentPath);
		
		if (true != permanent)
		{
			ThrowIfFalse(ARKAddToUninstallScript('UninstallDirectory(decodeURIComponent(\"' + encodeURIComponent(path) + '\"));\n'));
		}
	}
	
	TrackPathForRelocation(path);
}

function InstallFile(source, dest, overwrite, permanent)
{
	// validate source
	if (!ARKPathExists(source))
	{
		var errorMessage = "Source file for installation not found at " + source;
		ARKLogMessage(g_kLogCritical, errorMessage);
		throw errorMessage;
	}

	// if file exists, remove it or fail based on overwrite
	var didDelete = false;
	if (ARKPathExists(dest))
	{
		if (true == overwrite)
		{
			ThrowIfFalse(DeleteFileObject(dest));
			didDelete = true;
		}
		else
		{
			var errorMessage = "Destination path already exists at " + dest + " for file " + source;
			ARKLogMessage(g_kLogCritical, errorMessage);
			throw errorMessage;
		}
	}

	// make intermediate directories as necessary
	var destParentPath = GetParentPath(dest);
	MakeDirectoryPath(destParentPath, permanent);

	// install file, inheriting owner/group
	ThrowIfFalse(ARKCopyFile(source, dest));
	// if we deleted a file, then presumably it is shared and shouldn't be uninstalled
	// so only add a DeleteFile uninstall instruction if one wasn't deleted (and it isn't permanent)
	if ((false == didDelete) && (true != permanent))
	ThrowIfFalse(ARKAddToUninstallScript('UninstallFile(decodeURIComponent(\"' + encodeURIComponent(dest) + '\"));\n'));
}

function RenameFile(src, dst)
{
    if(IsPatch())
            ARKMoveFile(src, dst);
	else    
	        ThrowIfFalse(ARKMoveFile(src, dst));
	        
	ThrowIfFalse(ARKAddToUninstallScript('ARKMoveFile(decodeURIComponent(\"' + encodeURIComponent(dst) + '\"), decodeURIComponent(\"' + encodeURIComponent(src) + '\"));\n'));
}

function IsPatch()
{
	var payloadtype=ARKGetProperty("ExtensionType");
	return (payloadtype == "patch");
}

function TouchFile(dst)
{
	if(!ARKPathExists(dst))
	{
		throw("TouchFile - file not found: " + dst);
	}
	
	ARKTouchFile(dst);
}

function _PatchFile(source, pre_checksum, dest, uninstall_data)
{
	//Get location of patch uninstall folder
	var patchfiles =  ExpandPath("[INSTALLDIR]\\patchfiles\\" + gAdobeCode);	
	
	//Get the post patching checksum of the destination
	var post_checksum = uninstall_data.replace(".rtp", "");	
		
	//Check if the patch delta exists in the archive
	if (!ARKAssetExists(source))
	{
		var errorMessage = "Source file for installation not found at " + source;
		ARKLogMessage(g_kLogCritical, errorMessage);
		throw errorMessage;
	}
	
	//Extract the file to a temp location
	var tempfilename = Math.random().toString().replace(".", "");
	tempfilename += Math.random().toString().replace(".", "");
	tempfilename = patchfiles + "\\" + tempfilename.substr(0, 16) + ".rtp";
	
	
	//Extract the forward delta to the temp filename
	if(ARKPathExists(tempfilename))
		ThrowIfFalse(DeleteFileObject(tempfilename));
			
	ThrowIfFalse(ARKExtractAsset(source, tempfilename));
		
	//Apply the patch
	ThrowIfFalse(ARKPatchFile(tempfilename, dest, pre_checksum, post_checksum));
	
	//Remove the temp forward patch file
	ThrowIfFalse(DeleteFileObject(tempfilename));
	
	//Put the uninstall instruction for the reverse patch
	ThrowIfFalse(ARKAddToUninstallScript('ARKPatchFile(decodeURIComponent(\"' + encodeURIComponent(patchfiles + "\\" + uninstall_data) + '\"), decodeURIComponent(\"' + encodeURIComponent(dest) + '\"), \"' + post_checksum + '\", \"' + pre_checksum + '\");\n'));	
}

function PatchFile(source, pre_checksum, dest, uninstall_data)
{
	//Get location of patch uninstall folder
	var patchfiles =  ExpandPath("[INSTALLDIR]\\patchfiles\\" + gAdobeCode);	
	
	//Get the post patching checksum of the destination
	var post_checksum = uninstall_data.replace(".rtp", "");	
		
	//Check if the patch delta exists in the archive
	if (!ARKPathExists(source))
	{
		var errorMessage = "Source file for installation not found at " + source;
		ARKLogMessage(g_kLogCritical, errorMessage);
		throw errorMessage;
	}
	
	//Apply the patch
	ThrowIfFalse(ARKPatchFile(source, dest, pre_checksum, post_checksum));
	
	//Put the uninstall instruction for the reverse patch
	ThrowIfFalse(ARKAddToUninstallScript('ARKPatchFile(decodeURIComponent(\"' + encodeURIComponent(patchfiles + "\\" + uninstall_data) + '\"), decodeURIComponent(\"' + encodeURIComponent(dest) + '\"), \"' + post_checksum + '\", \"' + pre_checksum + '\");\n'));	
}

function SelfRegister(operation, path)
{

    if (!ARKPathExists(path))
    {
		var errorMessage = "File not found required for self-registration " + path;
		ARKLogMessage(g_kLogCritical, errorMessage);
		throw errorMessage;
    }
	//Apply the patch
	ThrowIfFalse(ARKSelfRegister(operation, path));
	
	//Put the uninstall instruction for the reverse patch
	var reverseOperation = "0";
	if (operation == "0")
		reverseOperation = "1";
	else
		reverseOperation = "0";

	ThrowIfFalse(ARKAddToUninstallScript('ARKSelfRegister( \"' + reverseOperation + '\", decodeURIComponent(\"' + encodeURIComponent(path) + '\"));\n'));	
}





function InstallFileFromArchive(source, dest, overwrite, permanent)
{
	// validate source
	if (!ARKAssetExists(source))
	{
		var errorMessage = "Source file for installation not found at " + source;
		ARKLogMessage(g_kLogCritical, errorMessage);
		throw errorMessage;
	}
	
	// if file exists, remove it or fail based on overwrite
	var didDelete = false;
	if (ARKPathExists(dest))
	{
		if (true == overwrite)
		{
			ThrowIfFalse(DeleteFileObject(dest));
			didDelete = true;
		}
		else
		{
			var errorMessage = "Destination path already exists at " + dest + " for file " + source;
			ARKLogMessage(g_kLogCritical, errorMessage);
			throw errorMessage;
		}
	}
	
	// make intermediate directories as necessary
	var destParentPath = GetParentPath(dest);
	MakeDirectoryPath(destParentPath, permanent);	
	// install file, inheriting owner/group
	ThrowIfFalse(ARKExtractAsset(source, dest));
	
	// if we deleted a file, then presumably it is shared and shouldn't be uninstalled
	// so only add a DeleteFile uninstall instruction if one wasn't deleted (and it isn't permanent)
	if ((false == didDelete) && (true != permanent))
		ThrowIfFalse(ARKAddToUninstallScript('UninstallFile(decodeURIComponent(\"' + encodeURIComponent(dest) + '\"));\n'));
}


function InstallSymlink(source, dest, overwrite, permanent)
{
	// if symlink exists, remove it or fail based on overwrite
	var didDelete = false;
	if (ARKPathExists(dest))
	{
		if (true == overwrite)
		{
			ThrowIfFalse(DeleteFileObject(dest));
			didDelete = true;
		}
		else
		{
			var errorMessage = "Destination path already exists at " + dest + " for symlink " + source;
			ARKLogMessage(g_kLogCritical, errorMessage);
			throw errorMessage;
		}
	}
	
	// make intermediate directories as necessary
	MakeDirectoryPath(GetParentPath(dest), permanent);
	
	// install symlink
	ThrowIfFalse(ARKCopySymlink(source, dest));
	
	// if we deleted a symlink, then presumably it is shared and shouldn't be uninstalled
	// so only add a DeleteSymlink uninstall instruction if one wasn't deleted (and it isn't permanent)
	if ((false == didDelete) && (true != permanent))
		ThrowIfFalse(ARKAddToUninstallScript('UninstallSymlink(decodeURIComponent(\"' + encodeURIComponent(dest) + '\"));\n'));
}


function DuplicateFile(source, dest)
{
	var srcFileName = GetLastPathComponent(source);
	dest = ConcatPath(dest, srcFileName);
	
	var destParentPath = GetParentPath(dest);
	MakeDirectoryPath(destParentPath);
	
	// DuplicateFile doesn't check for source file existance
	// because the file might not be installed yet.  This is
	// fine as long as InstallFile occurs before DuplicateFile
	// and the InstallFile destination is the DuplicateFile
	// source.
	if (!ARKPathExists(dest))
	{
		ThrowIfFalse(ARKCopyFile(source, dest));
		destParentAttributes = GetPathAttributes(destParentPath);
		ThrowIfFalse(ARKChownCommand(dest, destParentAttributes.owner, destParentAttributes.group));
		
		ThrowIfFalse(ARKAddToUninstallScript('UninstallFile(decodeURIComponent(\"' + encodeURIComponent(dest) + '\"));\n'));
	}
}

function MakeRegistrykey(root,role,permission,key)
{
    var parentKey;
	if (!ARKRegistryKeyExists(root,key))
	{
		parentKey = RegistryGetParent(key);
		if (parentKey != key)
			MakeRegistrykey(root,role,permission,parentKey);
	
		ThrowIfFalse(ARKCreateRegistryKey(root,role,permission,key));
		ThrowIfFalse(ARKAddToUninstallScript('ARKDeleteRegistryKey(\"'+root+'\",decodeURIComponent(\"'+encodeURIComponent(key)+'\"));\n'));			                                      	
	}
}


function RegistryAdd(root,role,permission,key,valuename,valuetype,valuedata)
{
    MakeRegistrykey(root,role,permission,key);
    
    if( ARKRegistryValueExists(root,key,valuename,valuetype) )
    {
        var result=ARKRegistryGetValue(root,key,valuename,valuetype);
        ARKAddToUninstallScript('ARKRegistrySetValue(\"'+root+'\",decodeURIComponent(\"'+encodeURIComponent(key)+'\"),\"'+valuename+'\",\"'+valuetype+'\",decodeURIComponent(\"'+encodeURIComponent(result)+'\") );\n');
                              
    }
    ARKRegistrySetValue(root,key,valuename,valuetype,valuedata);
    ARKAddToUninstallScript('ARKDeleteRegistryValue(\"'+root+'\",decodeURIComponent(\"'+encodeURIComponent(key)+'\"),\"'+valuename+'\");\n');
}

function RegistryGetParent(key)
{
	var resultArray = new Array;
	var pathArray = key.split('\\');
	while (pathArray.length > 0)
	{
		var cur = pathArray.shift();
		if ("" != cur)
			resultArray.push(cur);
	}
	resultArray.pop();	// remove last element
	var result;
	result = resultArray.join('\\');
	return result;
}


function RegistryDelete(root,role,permission,key,valuename,valuetype)
{
	var result="";
    if( ARKRegistryValueExists(root,key,valuename,valuetype) )
    {
        result=ARKRegistryGetValue(root,key,valuename,valuetype);
        ARKAddToUninstallScript('ARKRegistrySetValue(\"'+root+'\",decodeURIComponent(\"'+encodeURIComponent(key)+'\"),\"'+valuename+'\",\"'+valuetype+'\",decodeURIComponent(\"'+encodeURIComponent(result)+'\") );\n');
        ARKDeleteRegistryValue(root,key,valuename);
    }
    else {
        ARKDeleteRegistryKey(root, key);
        ARKAddToUninstallScript('RegistryAdd(\"'+root+'\", \"\", \"\", decodeURIComponent(\"'+encodeURIComponent(key)+'\"), \"'+valuetype+'\", \"'+valuename+'\");\n');
   }
}

function LocalizeString(default_name, localizations)
{
    var localizedName = default_name;
    var lang = ARKGetProperty("installLanguage");
 	if (localizations && localizations[lang] && localizations[lang].length > 0)
 		localizedName = localizations[lang];
 	return ExpandEmbeddedPropertyTokens(localizedName);
}


function DeleteFileObject(path)
{
	if (ARKPathExists(path))
	{
		var attributes = GetPathAttributes(path);
		if (attributes.isDirectory)
		{
			ARKLogMessage(g_kLogCritical, "Unexpected directory found instead of a file or symlink at " + path);
			throw "Unexpected directory found instead of a file or symlink at " + path;
		}
		else if (attributes.isRegularFile)
			ThrowIfFalse(ARKDeleteFile(path));
		else if (attributes.isSymlink)
			ThrowIfFalse(ARKDeleteSymlink(path));
		else
		{
			ARKLogMessage(g_kLogCritical, "Unknown file type at path " + path);
			throw "Unknown file type at path " + path;
		}
	}
}


function DeleteFile(path)
{
	if (ARKPathExists(path))
		ThrowIfFalse(ARKDeleteFile(path));
}


function DeleteSymlink(path)
{
	if (ARKPathExists(path))
		ThrowIfFalse(ARKDeleteSymlink(path));
}


function DeleteDirectory(path)
{
	if (ARKPathExists(path))
		ThrowIfFalse(ARKDeleteDirectory(path));
}

function UninstallFile(path)
{
	var uninstallPath = path;//GetRelocationAccessor().ResolvePath(path);
	if (ARKPathExists(uninstallPath))
	{
		if (!ARKDeleteFile(uninstallPath))
		{
			ARKLogMessage(g_kLogInfo, "Unable to uninstall file: " + uninstallPath);
		}
	}	
}


function UninstallSymlink(path)
{
	var uninstallPath = path;//GetRelocationAccessor().ResolvePath(path);
	if (ARKPathExists(uninstallPath))
		ARKDeleteSymlink(uninstallPath);
}


function UninstallDirectory(path)
{
	var uninstallPath = path;//GetRelocationAccessor().ResolvePath(path);
	var childrenNames = ARKGetPathChildren(uninstallPath);
	if (childrenNames && (childrenNames.length == 1))
	{
		var childName = ".DS_Store";
		var childPath = ConcatPath(uninstallPath, childName);

		if (ARKPathExists(childPath))
			ARKDeleteFile(childPath);
	}

	if (ARKPathExists(uninstallPath))
		ARKDeleteDirectory(uninstallPath);
}


function RecursiveDeleteDirectory(path)
{
	if (ARKPathExists(path))
	{
		if ("\\" == path)
		{
			ARKLogMessage(g_kLogCritical, "Deletion of / is not allowed.");
			throw "Deletion of / is not allowed.";
		}
		
		var childrenNames = ARKGetPathChildren(path);
		while (childrenNames.length > 0)
		{
			var childName = childrenNames.shift();
			var childPath = ConcatPath(path, childName);
			var attributes = GetPathAttributes(childPath);
			if (attributes.isDirectory)
				RecursiveDeleteDirectory(childPath);
			else if (attributes.isRegularFile)
				ThrowIfFalse(ARKDeleteFile(childPath));
			else if (attributes.isSymlink)
				ThrowIfFalse(ARKDeleteSymlink(childPath));
			else
			{
				ARKLogMessage(g_kLogCritical, "Unknown file type at path " + childPath);
				throw "Unknown file type at path " + childPath;
			}
		}
		
		ThrowIfFalse(ARKDeleteDirectory(path));
	}
}


function RecursiveUninstallDirectory(path)
{
	var uninstallPath = path;//GetRelocationAccessor().ResolvePath(path);
	if (ARKPathExists(uninstallPath))
	{
		if ("\\" == uninstallPath)
		{
			ARKLogMessage(g_kLogInfo, "Uninstall of / is not allowed.");	
		}
		else
		{	
			var childrenNames = ARKGetPathChildren(uninstallPath);
			while (childrenNames.length > 0)
			{
				var childName = childrenNames.shift();
				var childPath = ConcatPath(uninstallPath, childName);
				var attributes = GetPathAttributes(childPath);
				if (attributes.isDirectory)
					RecursiveUninstallDirectory(childPath);
				else if (attributes.isRegularFile)
					ARKDeleteFile(childPath);
				else if (attributes.isSymlink)
					ARKDeleteSymlink(childPath);
				else
					ARKLogMessage(g_kLogInfo, "Unable to uninstall unknown file type at path: " + childPath);	
			}
			ARKDeleteDirectory(uninstallPath);
		}
	}
}


function UninstallFilesMatchingPattern(path, pattern)
{
	var uninstallPath = path;//GetRelocationAccessor().ResolvePath(path);
	ARKLogMessage(g_kLogInfo, "UninstallFilesMatchingPattern for path: " + uninstallPath);
	
	if (ARKPathExists(uninstallPath))
	{
		var uninstallDirectoryAttributes = GetPathAttributes(uninstallPath);
		var deleteDirectory = true;
		
		if (uninstallDirectoryAttributes.isDirectory)
		{
			var childrenNames = ARKGetPathChildren(uninstallPath);
			while (childrenNames.length > 0)
			{
				var childName = childrenNames.shift();
				var childPath = ConcatPath(uninstallPath, childName);
				var attributes = GetPathAttributes(childPath);
				if (attributes.isRegularFile)
				{
					if (ARKGlobTest(childName, pattern))
					{
						ARKDeleteFile(childPath);
					}
					else
					{
						deleteDirectory = false;
					}
				}
				else if (attributes.isSymlink)
				{
					if (ARKGlobTest(childName, pattern))
					{
						ARKDeleteSymlink(childPath);
					}
					else
					{
						deleteDirectory = false;
					}
				}
				else
				{
					deleteDirectory = false;
				}
			}
		
			if (deleteDirectory)
			{
				ARKDeleteDirectory(uninstallPath);
			}
		}
		else
		{
			ARKLogMessage(g_kLogInfo, "Uninstall path is not a directory: " + uninstallPath);
		}
	}
}

function CreateAlias(name, iconFile, target, directory, overwrite, permanent)
{
	var aliasPath = ConcatPath(directory, name);
	var destParentPath;
	var destParentAttributes;
	
	// if alias exists, remove it or fail based on overwrite
	var didDelete = false;
	if (ARKPathExists(aliasPath))
	{
		if (true == overwrite)
		{
			ThrowIfFalse(DeleteFileObject(aliasPath));
			didDelete = true;
		}
		else
		{
			var errorMessage = "Path to create alias at already exists at " + aliasPath;
			ARKLogMessage(g_kLogCritical, errorMessage);
			throw errorMessage;
		}
	}
	
	// make intermediate directories as necessary
	var destParentPath = GetParentPath(aliasPath);
	MakeDirectoryPath(destParentPath, permanent);
	
	// create alias, inheriting owner/group
	ThrowIfFalse(ARKCreateMacAlias(aliasPath, target, iconFile));
	destParentAttributes = GetPathAttributes(destParentPath);
	ThrowIfFalse(ARKChownCommand(aliasPath, destParentAttributes.owner, destParentAttributes.group));
	
	// if we deleted an alias, then presumably it is shared and shouldn't be uninstalled
	// so only add a DeleteFile uninstall instruction if one wasn't deleted (and it isn't permanent)
	if ((false == didDelete) && (true != permanent))
		ThrowIfFalse(ARKAddToUninstallScript('UninstallFile(decodeURIComponent(\"' + encodeURIComponent(aliasPath) + '\"));\n'));
}


function Chmod(path, sid, permission)
{
	//priorAttributes = GetPathAttributes(path);
	//if (priorAttributes.permissions != mode)
	{
		ThrowIfFalse(ARKSetPermissions(path, sid, permission));
		// Chmod is only applied to things that are logically part of the installation,
		// and as a result, reversing the Chmod should not be necessary during
		// uninstall since the asset will be removed if appropriate.
	}
}


function Chown(path, owner, group)
{
	priorAttributes = GetPathAttributes(path);
	if ("" == owner)
		owner = priorAttributes.owner;
	if ("" == group)
		group = priorAttributes.group;
	if ((priorAttributes.owner != owner) || (priorAttributes.group != group))
	{
		ThrowIfFalse(ARKChownCommand(path, owner, group));
		// Chown is only applied to things that are logically part of the installation,
		// and as a result, reversing the Chown should not be necessary during
		// uninstall since the asset will be removed if appropriate.
	}
}


function InstallFolderIcon(iconSourcePath, folderPath)
{
	// TODO add preservation of old display attributes and create uninstall for it
	var installedIconPath = ConcatPath(folderPath, "Icon\x0D");
	InstallFile(iconSourcePath, installedIconPath);
	ThrowIfFalse(ARKSetDisplayAttributes(installedIconPath,
										 DISPLAY_ATTRIBUTE_IS_INVISIBLE,
										 DISPLAY_ATTRIBUTE_IS_INVISIBLE));
	ThrowIfFalse(ARKSetDisplayAttributes(folderPath,
										 DISPLAY_ATTRIBUTE_HAS_CUSTOM_ICON,
										 DISPLAY_ATTRIBUTE_HAS_CUSTOM_ICON));
}


function BlessFolderIcon(iconPath)
{
	// TODO add preservation of old blessedness and create uninstall for it
	var iconParentPath = GetParentPath(iconPath);
	ThrowIfFalse(ARKSetDisplayAttributes(iconPath,
										 DISPLAY_ATTRIBUTE_IS_INVISIBLE,
										 DISPLAY_ATTRIBUTE_IS_INVISIBLE));
	ThrowIfFalse(ARKSetDisplayAttributes(iconParentPath,
										 DISPLAY_ATTRIBUTE_HAS_CUSTOM_ICON,
										 DISPLAY_ATTRIBUTE_HAS_CUSTOM_ICON));
}

function InstallAdobeVersionedFile(sourcePath, sourceType, sourceVersionString, installPath, permanent)
{
	var shouldInstall = false;
	if (ARKPathExists(installPath))
	{
		var existingTypeVersion = ARKGetAdobeFileVersion(installPath);
		if (null != existingTypeVersion)
		{
			var existingType = existingTypeVersion[0];
			var existingVersionArray = existingTypeVersion[1];
			
			if (existingType != sourceType)
			{
				var errorMessage = "Existing file has type " + existingType + " when it should have type " + sourceType + " at " + installPath;
				ARKLogMessage(g_kLogCritical, errorMessage);
				throw errorMessage;
			}
			
			var compareResult = CompareVersionArrays(sourceVersionString.split('.'), existingVersionArray);
			if (compareResult >= 0)
			{
				shouldInstall = true;
			}
		}
		else
		{
			if (ARKIsFileEmpty(installPath))
			{
				ARKLogMessage(g_kLogCritical, "Unable to read Adobe file version for empty file at path "
										      + installPath + ".  Attempting to overwrite...");
				shouldInstall = true;
			}
			else
			{
				ARKLogMessage(g_kLogCritical, "Unable to read Adobe file version for path " + installPath);
				throw "Unable to read Adobe file version for path " + installPath;
			}
		}
	}
	else
	{
		shouldInstall = true;
	}
	
	if (true == shouldInstall)
	{
		InstallFileFromArchive(sourcePath, installPath, true, permanent);
		if (permanent)
		{
			gPermanentColorProfileCount += 1;
		}
		
		if (ADOBE_FILE_TYPE_COLOR_PROFILE == sourceType)
		{
			InstallColorProfileAliases();
		}
	}
}

function _InstallAdobeVersionedFile(sourcePath, sourceType, sourceVersionString, installPath, permanent)
{
	var shouldInstall = false;
	
	if (ARKPathExists(installPath))
	{
		var existingTypeVersion = ARKGetAdobeFileVersion(installPath);
		if (null != existingTypeVersion)
		{
			var existingType = existingTypeVersion[0];
			var existingVersionArray = existingTypeVersion[1];
			
			if (existingType != sourceType)
			{
				var errorMessage = "Existing file has type " + existingType + " when it should have type " + sourceType + " at " + installPath;
				ARKLogMessage(g_kLogCritical, errorMessage);
				throw errorMessage;
			}
			
			var compareResult = CompareVersionArrays(sourceVersionString.split('.'), existingVersionArray);
			if (compareResult >= 0)
			{
				shouldInstall = true;
			}
		}
		else
		{
			if (ARKIsFileEmpty(installPath))
			{
				ARKLogMessage(g_kLogCritical, "Unable to read Adobe file version for empty file at path "
										      + installPath + ".  Attempting to overwrite...");
				shouldInstall = true;
			}
			else
			{
				ARKLogMessage(g_kLogCritical, "Unable to read Adobe file version for path " + installPath);
				throw "Unable to read Adobe file version for path " + installPath;
			}
		}
	}
	else
	{
		shouldInstall = true;
	}
	
	if (true == shouldInstall)
	{
		InstallFile(sourcePath, installPath, true, permanent);
		if (permanent)
		{
			gPermanentColorProfileCount += 1;
		}
		
		if (ADOBE_FILE_TYPE_COLOR_PROFILE == sourceType)
		{
			InstallColorProfileAliases();
		}
	}
}


function BlindCopy(recurse, source, destination, overwrite, permanent, pattern)
{
	if (ARKPathExists(source))
	{
		var sourceAttributes = GetPathAttributes(source);
		
		if (sourceAttributes.isDirectory)
		{
			if (recurse)
			{
				var childrenNames = ARKGetPathChildren(source);
				while (childrenNames.length > 0)
				{							
					var childName = childrenNames.shift();
					var childSource = ConcatPath(source, childName);
					var childDest = ConcatPath(destination, childName);
					BlindCopy(recurse, childSource, childDest, overwrite, permanent, pattern);
				}
			}
		}
		else
		{
			var shouldInstall = true;
			if (pattern)
			{
				var filename = GetLastPathComponent(source);
				shouldInstall = true;
			}
			
			if (shouldInstall)
			{
				if (sourceAttributes.isRegularFile)
				{
					InstallFile(source, destination, overwrite, permanent);
				}				
			}
		}
	}
}


function Spawn(command, nonBlocking, argPrefix, argSeparator)
{
	var formedArguments = new Array;
	
	var isWhitespaceRegex = /^\s*$/;
	var separatorIsWhitespace = isWhitespaceRegex.test(argSeparator);
	
	for (var argIndex = 4; argIndex < arguments.length; argIndex += 2)
	{
		if ((argIndex + 1) < arguments.length)
		{
			var argName = arguments[argIndex];
			var argValue = arguments[argIndex + 1];
			if (null == argValue)
			{
				argValue = "";
			}
			
			if (separatorIsWhitespace)
			{
				formedArguments.push(argPrefix + argName);
				formedArguments.push(argValue);
			}
			else
			{
				formedArguments.push(argPrefix
										+ argName
										+ argSeparator
										+ argValue);
			}
		}
		else
		{
			ARKLogMessage(g_kLogCritical, "Malformed argument list in call to Spawn.");
			throw "Malformed argument list in call to Spawn.";
		}
	}
	
	ThrowIfFalse(ARKSpawn(command, nonBlocking, formedArguments));
}


function InstallAnchorService(infoPlistPath, productGUID, language)
{
	ThrowIfFalse(ARKInstallAnchorService(infoPlistPath, productGUID, language));
}


function AdobeSelfHealing(libraryPath, installMode, userName, userOrganization, userSerialNumber)
{
	ThrowIfFalse(ARKAdobeSelfHeal(libraryPath, installMode, userName, userOrganization, userSerialNumber));
	ThrowIfFalse(ARKAddToUninstallScript('AdobeSelfHealingUninstall('
										+ 'decodeURIComponent(\"' + encodeURIComponent(libraryPath) + '\"));\n'));
}


function AdobeSelfHealingUninstall(libraryPath)
{
	var resolvedLibraryPath = path;//GetRelocationAccessor().ResolvePath(libraryPath);
	ARKAdobeSelfHealUninstall(resolvedLibraryPath);
}


function InstallFirewallEntry(inLabel)
{
	var portArguments = new Array;
	for (var argIndex = 1; argIndex < arguments.length; ++argIndex)
		portArguments.push(arguments[argIndex]);
	ThrowIfFalse(ARKAddFirewallEntry(inLabel, portArguments));
	ThrowIfFalse(ARKAddToUninstallScript('RemoveFirewallEntry('
										+ 'decodeURIComponent(\"' + encodeURIComponent(inLabel) + '\"));\n'));
}


function WritePDFSettingEntry(language, englishName, localizedName)
{
	// TODO check for prior PDFSetting Entry and only uninstall if it wasn't there
	ThrowIfFalse(ARKWritePDFSettingEntry(language, englishName, localizedName));
	ThrowIfFalse(ARKAddToUninstallScript('RemovePDFSettingEntry('
										+ 'decodeURIComponent(\"' + encodeURIComponent(language) + '\"), '
										+ 'decodeURIComponent(\"' + encodeURIComponent(englishName) + '\"));\n'));
}


function CAPSWriteCollectionData()
{
	if ("install" == gInstallMode)
	{
		gCAPSCollectionDataToWrite = new Object;
		gCAPSCollectionDataToWrite.collectionID = ARKGetProperty("sessionID");
		gCAPSCollectionDataToWrite.driverAdobeCode = ARKGetProperty("driverAdobeCode");
		gCAPSCollectionDataToWrite.installSourcePath = ARKGetProperty("installSourcePath");
		gCAPSCollectionDataToWrite.aliasPath = null;
	}
}


function DoCAPSWriteCollectionData()
{
	if (!gCAPSCollectionDataToWrite
		|| (null == gCAPSCollectionDataToWrite))
	{
		ARKLogMessage(g_kLogCritical, "Unexpected call to DoCAPSWriteCollectionData().");
		throw "Unexpected call to DoCAPSWriteCollectionData().";
	}
	
	ThrowIfFalse(ARKCAPSWriteCollectionData(gCAPSCollectionDataToWrite.collectionID,
											gCAPSCollectionDataToWrite.driverAdobeCode,
											gCAPSCollectionDataToWrite.installSourcePath,
											gCAPSCollectionDataToWrite.aliasPath));
	ThrowIfFalse(ARKAddToUninstallScript('CAPSRemoveCollectionData(\"' + gCAPSCollectionDataToWrite.collectionID + '\");\n'));
}


function CAPSWritePayloadData(inAdobeCode, inFamilyName, inProductName, inVersion, inBuildStamp, inAMTConfigPath, inConflictsArray, inUpgradesArray)
{
	// Whether the data are appropriate to commit is decided internally in the ARKCAPSWriteCollectionData
	gCAPSPayloadDataToWrite = new Object;
	gCAPSPayloadDataToWrite.adobeCode = inAdobeCode;
	gCAPSPayloadDataToWrite.familyName = inFamilyName;
	gCAPSPayloadDataToWrite.productName = inProductName;
	gCAPSPayloadDataToWrite.productVersion = inVersion;
	gCAPSPayloadDataToWrite.buildStamp = inBuildStamp;
	gCAPSPayloadDataToWrite.amtConfigPath = inAMTConfigPath;
	gCAPSPayloadDataToWrite.conflictsArray = inConflictsArray;
	gCAPSPayloadDataToWrite.upgradesArray = inUpgradesArray;
	gCAPSPayloadDataToWrite.updatedAliasPath = null;
	gCAPSPayloadDataToWrite.payloadPath = ARKGetProperty("ARK_PAYLOAD");
	gCAPSPayloadDataToWrite.installMode = gInstallMode;

}


function DoCAPSWritePayloadData()
{
	if (!gCAPSPayloadDataToWrite
		|| (null == gCAPSPayloadDataToWrite))
	{
		ARKLogMessage(g_kLogCritical, "Unexpected call to DoCAPSWritePayloadData().");
		throw "Unexpected call to DoCAPSWritePayloadData().";
	}
	
	var collectionID = ARKGetProperty("sessionID");
	
	var rawSessionProperties = ARKGetRawSessionProperties();
	ThrowIfFalse(ARKCAPSWritePayloadData(collectionID,
										 gCAPSPayloadDataToWrite.adobeCode,
										 gCAPSPayloadDataToWrite.familyName, 
										 gCAPSPayloadDataToWrite.productName,
										 gCAPSPayloadDataToWrite.productVersion,
										 gCAPSPayloadDataToWrite.buildStamp,
										 ARKGetProperty("installLanguage"),
										 ARKGetProperty("INSTALLDIR"),
										 gCAPSPayloadDataToWrite.amtConfigPath,
										 ARKGetProperty("eula_EPIC_EULA_ACCEPTED"),
										 ARKGetProperty("eula_EPIC_EULA_SELECTED"),
										 ARKGetProperty("pers_EPIC_SERIAL"),
										 rawSessionProperties[0],
										 rawSessionProperties[1],
										 gCAPSPayloadDataToWrite.conflictsArray,
										 gCAPSPayloadDataToWrite.upgradesArray,
										 gCAPSPayloadDataToWrite.updatedAliasPath,
										 gCAPSPayloadDataToWrite.payloadPath,
										 gCAPSPayloadDataToWrite.installMode));
	ThrowIfFalse(ARKAddToUninstallScript('CAPSRemovePayloadData(\"' + collectionID + '\", \"' + gCAPSPayloadDataToWrite.adobeCode + '\");\n'));
}


// Formulate the path for the launchd plist from the service name
function ServicePlistPath(inServiceName)
{
	return "\\Library\\LaunchDaemons\\" + inServiceName + ".plist";
}

function ServiceUnInstall(inName)
{
	ThrowIfFalse(ARKServiceUnInstall(inName));
}

// Fabricate and install the launchd plist
function ServiceInstall(inServicePath, inName, inDescription, inArguments, inStartType, inStartOnInstall, inStartElevated, inGroupName, inDependencies)
{

	var binPath = inServicePath;
	for(index=0; index < inArguments.length; ++index)
		binPath = binPath + " \"" + inArguments[index] + "\"";
	
	var depenString = "";
	if(inDependencies != null)
	{
		for(index=0; index < inDependencies.length; ++index)
		{
			if(depenString.length > 1)
				depenString += "|";
			depenString += inDependencies[index][1];
		}
	}
	depenString += "||";
	ThrowIfFalse(ARKServiceInstall(binPath, inName, inDescription, inStartType, inStartOnInstall, inStartElevated, inGroupName, depenString));
	ThrowIfFalse(ARKAddToUninstallScript('ServiceUnInstall(\"' + inName + '\");\n'));
}


function ServiceMonitor(inServiceName, inServicePath, inAction)
{
    if ("install" == inAction)
    {   
    	RegistryAdd("2", "", "", "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", inServiceName, "REG_SZ", "\"" + inServicePath + "\"");	
    }
    else if ("uninstall" == inAction)
    {
    	RegistryDelete("2", "", "", "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run", inServiceName, inServicePath, "REG_SZ");	    	
    }
    
    
}


function DuplicateBrowserPluginContent(source, destArray)
{
	var i;
	
	if (ARKPathExists(source))
	{
		var sourceAttributes = GetPathAttributes(source);

		if (sourceAttributes.isDirectory)
		{
			var childrenNames = ARKGetPathChildren(source);
			while (childrenNames.length > 0)
			{
				var childName = childrenNames.shift();
				var childSource = ConcatPath(source, childName);
				var childDestArray = new Array();
				for (i = 0; i < destArray.length; ++i)
				{
					childDestArray.push(ConcatPath(destArray[i], childName));
				}
				DuplicateBrowserPluginContent(childSource, childDestArray);
			}
		}
		else
		{
			var filename = GetLastPathComponent(source);
			
			if ((true != ARKGlobTest(filename, "*.xpt"))
				&& ("version.txt" != filename.toLowerCase()))
			{
				if (sourceAttributes.isRegularFile)
				{
					for (i = 0; i < destArray.length; ++i)
					{
						InstallFile(source, destArray[i], true, true);
					}
				}
				else if (sourceAttributes.isSymlink)
				{
					for (i = 0; i < destArray.length; ++i)
					{
						InstallSymlink(source, destArray[i], true, true);
					}
				}
			}
		}
	}
}


function InstallXPTFilesInPaths(source, destArray)
{
	if (ARKPathExists(source))
	{
		var sourceAttributes = GetPathAttributes(source);

		if (sourceAttributes.isDirectory)
		{
			var childrenNames = ARKGetPathChildren(source);
			while (childrenNames.length > 0)
			{
				var childName = childrenNames.shift();
				var childSource = ConcatPath(source, childName);
				InstallXPTFilesInPaths(childSource, destArray);
			}
		}
		else
		{
			var filename = GetLastPathComponent(source);
			
			if (true == ARKGlobTest(filename, "*.xpt"))
			{
				for (var i = 0; i < destArray.length; ++i)
				{
					// install .xpt file
					InstallFile(source, ConcatPath(destArray[i], filename), true, true);
					
					// delete xpti.dat cache if it exists
					DeleteFile(ConcatPath(destArray[i], "xpti.dat"));
				}
			}
		}
	}
}


function InstallPluginVersionTXT(source, productInfoFamily, productInfoProductName)
{
	if (ARKPathExists(source))
	{
		var sourceAttributes = GetPathAttributes(source);

		if (sourceAttributes.isDirectory)
		{
			var childrenNames = ARKGetPathChildren(source);
			while (childrenNames.length > 0)
			{
				var childName = childrenNames.shift();
				var childSource = ConcatPath(source, childName);
				InstallPluginVersionTXT(childSource, productInfoFamily, productInfoProductName);
			}
		}
		else
		{
			var filename = GetLastPathComponent(source);
			
			if ("version.txt" == filename.toLowerCase())
			{
				// install version.txt file
				InstallFile(source, ConcatPath(ExpandPath("[UserPreferences]"), productInfoFamily, productInfoProductName, filename), true, true);
			}
		}
	}
}


function InstallBrowserPluginBundle(bundlePath, productInfoFamily, productInfoProductName)
{
	var browserPathsPair = ARKGetBrowserPaths();
	var xptPaths = browserPathsPair[0];
	var pluginPaths = browserPathsPair[1];
	var i;
	
	// add bundle name to each plugin destination to for destination install paths
	var pluginDestinations = new Array();
	var pluginBundleName = GetLastPathComponent(bundlePath);
	ARKLogMessage(g_kLogDebug, 'Preparing to install browser plugin: ' + pluginBundleName);
	var pluginBundleVersion = GetVersionForBundle(bundlePath);
	ARKLogMessage(g_kLogDebug, 'Browser plugin version is: ' + pluginBundleVersion);
	
	for (i = 0; i < pluginPaths.length; ++i)
	{
		var aPluginDestination = ConcatPath(pluginPaths[i], pluginBundleName);
		ARKLogMessage(g_kLogDebug, 'Browser plugin destination: ' + aPluginDestination);
		
		var shouldInstall = false;
		if (ARKPathExists(aPluginDestination))
		{
			var foundPluginVersion = GetVersionForBundle(aPluginDestination);
			ARKLogMessage(g_kLogDebug, 'Plugin already exists with version: ' + foundPluginVersion);
			if (CompareVersionArrays(pluginBundleVersion, foundPluginVersion) >= 0)
			{
				shouldInstall = true;
			}
		}
		else
		{
			shouldInstall = true;
		}
		
		if (shouldInstall)
		{
			ARKLogMessage(g_kLogDebug, 'Will install plugin to: ' + aPluginDestination);
			pluginDestinations.push(aPluginDestination);
		}
		else
		{
			ARKLogMessage(g_kLogDebug, 'Not installing plugin to: ' + aPluginDestination);
		}
	}
	
	// log XPT destinations
	for (i = 0; i < xptPaths.length; ++i)
	{
		ARKLogMessage(g_kLogDebug, 'Browser plugin .xpt destination: ' + xptPaths[i]);
	}
	
	// locate and log user plugin to remove
	var userPlugin = ConcatPath(ExpandPath("[UserInternetPlugins]"), pluginBundleName);
	if (ARKPathExists(userPlugin))
	{
		ARKLogMessage(g_kLogDebug, 'Found user browser plugin at: ' + userPlugin);
	}
	
	// install plugin content to all plugin destinations
	if (pluginDestinations.length > 0)
	{
		DuplicateBrowserPluginContent(bundlePath, pluginDestinations);
	
		// install xpt files to all xpt paths, removing xpti.dat if an xpt was installed
		InstallXPTFilesInPaths(bundlePath, xptPaths);
		
		// installer version.txt file if present
		InstallPluginVersionTXT(bundlePath, productInfoFamily, productInfoProductName);
	}
	
	// remove plugin from user's Internet Plugins if present
	if (ARKPathExists(userPlugin))
	{
		ARKLogMessage(g_kLogDebug, 'Removing user browser plugin from: ' + userPlugin);
		RecursiveDeleteDirectory(userPlugin);
	}
}


function InstallColorProfileAliases()
{
	gShouldInstallColorProfileAliases = true;
}


function DoInstallColorProfileAliases()
{
	var adobeProfilesFolder = ConcatPath(ExpandPath("[AdobeCommon]"), "Color", "Profiles");
	var adobeRecommendedFolder = ConcatPath(adobeProfilesFolder, "Recommended");
	var colorSyncPath = ExpandPath("[ColorSyncProfiles]");
	var profilesAliasPath = ConcatPath(colorSyncPath, "Profiles");
	var recommendedAliasPath = ConcatPath(colorSyncPath, "Recommended");
	var permanentAlias = (gPermanentColorProfileCount > 0) ? true : false;
	
	// if there are profiles, update the profiles alias.  The Alias is permanent is there are any permanent
	// color profiles to install	
	if (ARKPathExists(adobeProfilesFolder))
	{
		CreateAlias(GetLastPathComponent(profilesAliasPath), null, adobeProfilesFolder, GetParentPath(profilesAliasPath), true, true);
	}
	
	// if there are recommended profiles, update the recommended alias 
	if (ARKPathExists(adobeRecommendedFolder))
	{
		CreateAlias(GetLastPathComponent(recommendedAliasPath), null, adobeRecommendedFolder, GetParentPath(recommendedAliasPath), true, true);
	}
	// We only want to add the uninstall if there are no permanent ones
	if (!permanentAlias)	
	{
		ThrowIfFalse(ARKAddToUninstallScript('UninstallColorProfileAliases();\n'));		
	}
}


function RemovePDFSettingEntry(language, englishName, localizedName)
{
	ARKRemovePDFSettingEntry(language, englishName);
}


function RemoveFirewallEntry(inLabel)
{
	ARKRemoveFirewallEntry(inLabel);
}


function CAPSRemoveCollectionData(inCollectionID)
{
	if ("remove" == gInstallMode)
	{
		gCAPSCollectionDataToRemove = new Object;
		gCAPSCollectionDataToRemove.collectionID = inCollectionID;
	}
}


function DoCAPSRemoveCollectionData()
{
	if (!gCAPSCollectionDataToRemove
		|| (null == gCAPSCollectionDataToRemove))
	{
		ARKLogMessage(g_kLogCritical, "Unexpected call to DoCAPSRemoveCollectionData().");
		throw "Unexpected call to DoCAPSRemoveCollectionData().";
	}
	
	var collectionID = ARKGetProperty("sessionID");
	ThrowIfFalse(ARKCAPSRemoveCollectionData(gCAPSCollectionDataToRemove.collectionID));
}


function CAPSRemovePayloadData(inCollectionID, inAdobeCode)
{
	if ("remove" == gInstallMode)
	{
		gCAPSPayloadDataToRemove = new Object;
		gCAPSPayloadDataToRemove.collectionID = inCollectionID;
		gCAPSPayloadDataToRemove.adobeCode = inAdobeCode;
		
		ThrowIfFalse(ARKPCDRemovePayloadData(gCAPSPayloadDataToRemove.adobeCode));
	}
}


function DoCAPSRemovePayloadData()
{
	if (!gCAPSPayloadDataToRemove
		|| (null == gCAPSPayloadDataToRemove))
	{
		ARKLogMessage(g_kLogCritical, "Unexpected call to DoCAPSRemovePayloadData().");
		throw "Unexpected call to DoCAPSRemovePayloadData().";
	}
	
	ThrowIfFalse(ARKCAPSRemovePayloadData(gCAPSPayloadDataToRemove.collectionID, gCAPSPayloadDataToRemove.adobeCode));
}


function UninstallColorProfileAliases()
{
	gShouldUninstallColorProfileAliases = true;
}

function ConditionalUninstallFile(inConditionRefID, inUnexpandedPath, inFileName)
{
	if (Properties[inConditionRefID]==1)
	{
		UninstallFile(ConcatPath(ExpandPath(inUnexpandedPath), inFileName));
	}
}

function DoUninstallColorProfileAliases()
{
	var adobeProfilesFolder = ConcatPath(ExpandPath("[AdobeCommon]"), "Color", "Profiles");
	var adobeRecommendedFolder = ConcatPath(adobeProfilesFolder, "Recommended");
	var colorSyncPath = ExpandPath("[ColorSyncProfiles]");
	var profilesAliasPath = ConcatPath(colorSyncPath, "Profiles");
	var recommendedAliasPath = ConcatPath(colorSyncPath, "Recommended");
	
	// remove profiles alias as appropriate
	if (!ARKPathExists(adobeProfilesFolder))
	{
		UninstallFile(profilesAliasPath);
	}
	
	// remove recommended profiles alias as appropriate
	if (!ARKPathExists(adobeRecommendedFolder))
	{
		UninstallFile(recommendedAliasPath);
	}
}


// Overwrite Setup.app in the resident location if it is newer
// than the one already present there.
function InstallResidentEngine(inSourceEngineParentPath, inSourceResourcesParentPath, inResidentInstallPath)
{
	var sourceEngineBundle = ConcatPath(inSourceEngineParentPath, "Setup.app");
	if (ARKPathExists(sourceEngineBundle))
	{
		var residentEngineBundle = ConcatPath(inResidentInstallPath, "Setup.app");
		
		var sourceEngineVersion = GetVersionForBundle(sourceEngineBundle);
		var residentEngineVersion = [0, 0, 0, 0, 0];
		if (ARKPathExists(residentEngineBundle))
			residentEngineVersion = GetVersionForBundle(residentEngineBundle);
		
		if (CompareVersionArrays(sourceEngineVersion, residentEngineVersion) >= 0)
		{
			// Replace resident Setup.app with source one
			RecursiveDeleteDirectory(residentEngineBundle);
			BlindCopy(true, sourceEngineBundle, residentEngineBundle, true, true);
			
			// Use Neutral iconography for Resident Engine if present
			var neutralIconPath = ConcatPath(residentEngineBundle, "Contents", "Resources", "Neutral.icns");
			if (ARKPathExists(neutralIconPath))
			{
				var setupIconPath = ConcatPath(residentEngineBundle, "Contents", "Resources", "Setup.icns");
				InstallFile(neutralIconPath, setupIconPath, true, true);
			}
			var neutralAliasTemplatePath = ConcatPath(residentEngineBundle, "Contents", "Resources", "NeutralAliasTemplate");
			if (ARKPathExists(neutralAliasTemplatePath))
			{
				var setupAliasTemplatePath = ConcatPath(residentEngineBundle, "Contents", "Resources", "SetupAliasTemplate");
				InstallFile(neutralAliasTemplatePath, setupAliasTemplatePath, true, true);
			}
			
			// Replace resident resources with source ones
			sourceResourcesPath = ConcatPath(inSourceResourcesParentPath, "resources");
			residentResourcesPath = ConcatPath(inResidentInstallPath, "resources");
			RecursiveDeleteDirectory(residentResourcesPath);
			BlindCopy(true, sourceResourcesPath, residentResourcesPath, true, true);
		}
	}
}


function CreateUniqueUninstallerAlias()
{
	var aliasName = null;
	var aliasParentPath = null;
	var replacingAlias = false;
	
	var collectionData = GetCollectionDomainData(ARKGetProperty("sessionID"), kCapsDomainInstaller);
	if (collectionData
		&& collectionData.aliasPath
		&& null != collectionData.aliasPath)
	{
		// if the collection already has an alias, simply update it
		aliasName = GetLastPathComponent(collectionData.aliasPath);
		aliasParentPath = GetParentPath(collectionData.aliasPath);
		replacingAlias = true;
	}
	else
	{
		// if the collection doesn't yet have an alias, create one using
		// a unique name based on the default add remove info
		aliasName = ARKGetProperty("AddRemoveInfoDisplayName");
		if (!aliasName || ('' == aliasName))
		{
			aliasName = ARKGetProperty("productName");
		}
		
		aliasParentPath = ExpandPath("[Utilities]\\Adobe Installers");
		var aliasFullPath = ConcatPath(aliasParentPath, aliasName);
		if (ARKPathExists(aliasFullPath))
		{
			var aliasBaseName = aliasName;
			for (var index = 1; index < 1024; ++index)
			{
				aliasName = aliasBaseName + " " + index;
				aliasFullPath = ConcatPath(aliasParentPath, aliasName);
				if (!ARKPathExists(aliasFullPath))
					break;
			}
			
			if (1024 == index)
				aliasName = null;
		}
	}
	
	if (aliasName)
	{
		CreateAlias(aliasName,
					ConcatPath(GetParentPath(ExpandPath("[ARK_PAYLOAD]")),
							   "Setup.app",
							   "Contents",
							   "Resources",
							   "SetupAliasTemplate"),
					ExpandPath("[INSTALLDIR]/Setup.app"),
					aliasParentPath,
					replacingAlias,
					true);
		
		ThrowIfFalse(ARKAddToUninstallScript('UninstallUninstallerAlias(\"' + ARKGetProperty("sessionID") + '\");\n'));
	}
	else
	{
		_RIBS_function_log(g_kLogCritical, "Unable to create unique alias for uninstallation.");
	}
	
	return ConcatPath(aliasParentPath, aliasName);
}


function UpdateUniqueUninstallerAliasName()
{
	var result = null;
	var desiredName;
	
	var addRemoveInfo = GetAddRemoveInfo();
	if (addRemoveInfo
		&& addRemoveInfo.displayName)
	{
		var lang = ARKGetProperty("installLanguage");
		if (lang)
		{
			desiredName = addRemoveInfo.displayName[lang];
		}
	}
	
	if (desiredName)
	{
		var collectionData = GetCollectionDomainData(ARKGetProperty("sessionID"), kCapsDomainInstaller);
		if (collectionData
			&& collectionData.aliasPath
			&& null != collectionData.aliasPath)
		{
			var existingName = GetLastPathComponent(collectionData.aliasPath);
			if (existingName)
			{
				// only update the alias if its name isn't already based on the same name
				if (desiredName != existingName.substring(0, desiredName.length))
				{
					// determine a new unique alias name based on desiredName
					var newAliasParentPath = GetParentPath(collectionData.aliasPath);
					var newAliasFullPath = ConcatPath(newAliasParentPath, desiredName);
					if (ARKPathExists(newAliasFullPath))
					{
						var newAliasBaseName = desiredName;
						for (var index = 1; index < 1024; ++index)
						{
							desiredName = newAliasBaseName + " " + index;
							newAliasFullPath = ConcatPath(newAliasParentPath, desiredName);
							if (!ARKPathExists(newAliasFullPath))
								break;
						}
						
						if (1024 == index)
							desiredName = null;
					}
					
					// move the alias
					if (desiredName)
					{
						_RIBS_function_log(g_kLogDebug, "Renaming uninstaller alias " + existingName + " to " + desiredName);
						InstallFile(collectionData.aliasPath, newAliasFullPath, false, true)
						UninstallFile(collectionData.aliasPath);
						result = newAliasFullPath;
					}
				}
			}
		}
	}
	
	return result;
}


function UninstallUninstallerAlias(inCollectionID)
{
	var collectionData = GetCollectionDomainData(inCollectionID, kCapsDomainInstaller);
	if (collectionData
		&& collectionData.aliasPath
		&& null != collectionData.aliasPath)
	{
		_RIBS_function_log(g_kLogDebug, "Removing uninstaller alias at " + collectionData.aliasPath);
		UninstallFile(collectionData.aliasPath);
	}
}


function GetCollectionDomainData(inCollectionID, inDomain)
{
	var result = null;
	
	if ("1" == gThirdParty)
	{
		ARKLogMessage(g_kLogCritical, "Unable to get collection domain data for RIBS third party payload.");
		throw "Unable to get collection domain data for RIBS third party payload.";
	}
	
	var collectionDataKeysAndValues = ARKGetCapsCollectionDataKeysAndValues(inCollectionID, inDomain);
	if (collectionDataKeysAndValues)
	{
		result = new Object;
		
		var collectionKeys = collectionDataKeysAndValues[0];
		var collectionValues = collectionDataKeysAndValues[1];
		for (var i = 0; i < collectionKeys.length; ++i)
		{
			result[collectionKeys[i]] = collectionValues[i];
		}
	}
	
	return result;
}


function GetPayloadDomainData(inPayloadID, inDomain)
{
	var result = null;
	
	if ("1" == gThirdParty)
	{
		ARKLogMessage(g_kLogCritical, "Unable to get payload domain data for RIBS third party payload.");
		throw "Unable to get payload domain data for RIBS third party payload.";
	}
	
	var payloadDataKeysAndValues = ARKGetCapsPayloadDataKeysAndValues(inPayloadID, inDomain);
	if (payloadDataKeysAndValues)
	{
		result = new Object;
		
		var payloadKeys = payloadDataKeysAndValues[0];
		var payloadValues = payloadDataKeysAndValues[1];
		for (var i = 0; i < payloadKeys.length; ++i)
		{
			result[payloadKeys[i]] = payloadValues[i];
		}
	}
	
	return result;
}


function GetAddRemoveInfo()
{
	return gAddRemoveInfo;
}


function NearestParentPathWithExtension(inPath, inExtension)
{
	var result = null;
	var lastExtensionIndex = inPath.lastIndexOf("." + inExtension + "\\");
	if (lastExtensionIndex != -1)
	{
		result = inPath.substring(0, lastExtensionIndex + inExtension.length + 1);
	}
	
	return result;
}


function RegisterInstalledApplications()
{
	if (gInstalledInfoPlistPaths.length > 0)
	{
		// form set of unique app paths
		var appPathsSet = new Object();
		for (var i = 0; i < gInstalledInfoPlistPaths.length; ++i)
		{
			var curAppPath = NearestParentPathWithExtension(gInstalledInfoPlistPaths[i], "app");
			if (null != curAppPath)
			{
				appPathsSet[curAppPath] = 1;
			}
		}
		
		// form array from app path set
		var appPathsArray = new Array();
		for (var uniqueAppPath in appPathsSet)
		{
			appPathsArray.push(uniqueAppPath);
		}
		
		// register the application paths
		if (appPathsArray.length > 0)
		{
			ARKRegisterApplications(appPathsArray);
		}
	}
}


function PayloadPrefix(inPayloadIdentifier, inPayloadInstallMode)
{
	gRelocationAccessor = null;
	gPayloadIdentifier = inPayloadIdentifier;
	gPayloadInstallMode = inPayloadInstallMode;
}


function PayloadSuffix()
{	
	if ("remove" == gPayloadInstallMode)
	{
		// delete relocation data
		DeleteRelocationData();
	}	

}


function InstallSuffix()
{
	// update the uninstaller alias name if appropriate
	if (("1" != gThirdParty) && IsDriverPayload() && GetAddRemoveInfo())
	{
		gCAPSPayloadDataToWrite.updatedAliasPath = UpdateUniqueUninstallerAliasName();
	}
	
	// finish color profile installation as appropriate
	if (gShouldInstallColorProfileAliases)
	{
		DoInstallColorProfileAliases();
	}
	
	// register newly installed applications
	RegisterInstalledApplications();
	
	
	// update bootstrapped Setup icon as appropriate
	if (IsBootstrapper())
	{
		var primarySetupIcon = ConcatPath(GetParentPath(ExpandPath("[ARK_PAYLOAD]")),
				   						"Setup.app",
				   						"Contents",
				   						"Resources",
				   						"Setup.icns");
		if (ARKPathExists(primarySetupIcon))
		{
			var redirectorIcon = ConcatPath(ExpandPath("[INSTALLDIR]"),
											"Setup.app",
											"Contents",
											"Resources",
											"Setup.icns");
			InstallFile(primarySetupIcon, redirectorIcon, true, false);
			Chmod(redirectorIcon, 0664);
		}
	}
	
	// create the uninstall alias as appropriate
	if (IsBootstrapper())
	{
		var suppressUninstaller = false;
		
		try
		{
			var suppressUninstallerProperty = ARKGetProperty("suppressUninstaller");
			
			if ((suppressUninstallerProperty != null)
			 	&& ("1" == suppressUninstallerProperty))
			{
				suppressUninstaller = true;
			}
		}
		catch (ex)
		{
			_RIBS_function_log(g_kLogInfo, "Unexpected failure testing suppressUninstaller property, assuming false.");
		}
		
		if (false == suppressUninstaller)
		{
			try
			{
				gCAPSCollectionDataToWrite.aliasPath = CreateUniqueUninstallerAlias();
			}
			catch(ex)
			{
				_RIBS_function_log(g_kLogInfo, "Unexpected failure creating uninstall alias, skipping...");
			}
		}
	}
	
	
	// replace the resident installer engine if appropriate
	if (IsBootstrapper())
	{
		InstallResidentEngine(GetParentPath(ExpandPath("[ARK_PAYLOAD]")),
							  ExpandPath("[INSTALLDIR]"),
							  ConcatPath(GetParentPath(ExpandPath("[INSTALLDIR]")), "R2"));
	}
	
	// write path relocation data
	//StoreRelocationData();
	
	// make deferred CAPS changes
	if ("1" != gThirdParty)
	{
		if (gCAPSCollectionDataToWrite
			&& null != gCAPSCollectionDataToWrite)
		{			
			DoCAPSWriteCollectionData();
		}
		if (gCAPSPayloadDataToWrite
			&& null != gCAPSPayloadDataToWrite)
		{
			DoCAPSWritePayloadData();
		}
	}
	
	// save the uninstall script
	ARKSaveUninstallScript();
	
	
	// launch the bootstrapped Setup instance if we've just bootstrapped
	if (IsBootstrapper())
	{
		var recordWorkflow = 0;
		if (ARKGetProperty("record") != null)
			recordWorkflow = ARKGetProperty("record");
		Spawn(ExpandPath("[INSTALLDIR]/Setup.app/Contents/MacOS/" + "Setup"), true, "--", "=", "ExitWorkflow", ARKGetProperty("ExitWorkflow"), "BootstrappedLaunched", "1", "record", recordWorkflow);
	}
}


function RepairSuffix()
{
	// finish color profile installation as appropriate
	if (gShouldInstallColorProfileAliases)
	{
		DoInstallColorProfileAliases();
	}
	
	
	// register newly installed or reinstalled applications
	RegisterInstalledApplications();
	
	
	// write path relocation data
	//StoreRelocationData();
	
	
	// make deferred CAPS changes
	if ("1" != gThirdParty)
	{
		if (gCAPSPayloadDataToWrite
			&& null != gCAPSPayloadDataToWrite)
		{
			DoCAPSWritePayloadData();
		}
	}
	
	// save the uninstall script
	ARKSaveUninstallScript();
	
	
	// launch the bootstrapped Setup instance if we've just bootstrapped
	if (IsBootstrapper())
	{
		Spawn(ExpandPath("[INSTALLDIR]/Setup.app/Contents/MacOS/" + "Setup"), true, "--", "=", "ExitWorkflow", ARKGetProperty("ExitWorkflow"));
	}
}


function UninstallSuffix()
{
	if (gShouldUninstallColorProfileAliases)
	{
		DoUninstallColorProfileAliases();
	}
	
	
	// make deferred CAPS changes
	if ("1" != gThirdParty)
	{
		if (gCAPSCollectionDataToRemove
			&& null != gCAPSCollectionDataToRemove)
		{
			DoCAPSRemoveCollectionData();
		}
		if (gCAPSPayloadDataToRemove
			&& null != gCAPSPayloadDataToRemove)
		{
			DoCAPSRemovePayloadData();
		}
	}
}

function FlashPlayerTrustFile(pathToTrustFile,pathToWrite)
{
    ARKLogMessage(g_kLogInfo, "calling ARKCommand ARKWriteToTrustFile for "+pathToTrustFile +" Path to write is"+pathToWrite);
    ARKWriteToTrustFile(pathToTrustFile,pathToWrite);
    ARKLogMessage(g_kLogInfo, "Completed ARKCommand ARKWriteToTrustFile for "+pathToTrustFile);
}