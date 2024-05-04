/*!
**********************************************************************
@file 	localization.js

Copyright 2003-2006 Adobe Systems Incorporated.                     
All Rights Reserved.                                                
                                                                    
NOTICE: All information contained herein is the property of Adobe   
Systems Incorporated.                                                                                                                    

***********************************************************************
*/

/** 
Defines methods related to localization support
*/

/**
A localization dictionary for translating strings, with optional token substitution.
*/
function Localization(inSession, inStringPath, inPropertyMap, inLoadAllLanguages /* = false */)
{
	this.session = inSession;
	this.stringMap = null;
	this.propertyMap = inPropertyMap;
	this.uiLanguage = getUserInterfaceLanguage(inSession);
	this.stringPath = inStringPath;

	if (this.stringPath)
	{
		if (inLoadAllLanguages)
			this.stringMap = inSession.GetStringsForLanguage(this.stringPath);
		else
			this.stringMap = inSession.GetStringsForLanguage(this.stringPath, this.uiLanguage);
	}
}


/**
Translate a string to the current UI language with an optional property map for token
substitution.  This is a shorthand for GetStringForLanguage with a null inIsoCode.
*/
Localization.prototype.GetString = function(inStringID, inOptDefault, inOptPropertyMap, inOptReplaceSingleQuote)
{
	return this.GetStringForLanguage(inStringID, null, inOptDefault, inOptPropertyMap, inOptReplaceSingleQuote);
}


/**
Translate a string to the specified language.  If the specified language is null,
use the current UI language.  If a transaltion for inStringID is not found, inDefault
is used.  If inDefault is null, inStringID is used.
*/
Localization.prototype.GetStringForLanguage = function(inStringID, inOptIsoCode, inOptDefault, inOptPropertyMap, inOptReplaceSingleQuote)
{
	var isoCode = inOptIsoCode;
	if (!isoCode)
		isoCode = this.uiLanguage;

	var retVal = null;
	if (this.stringMap && this.stringMap[inStringID])
	{
		retVal = this.stringMap[inStringID][isoCode];
	}
	if (!retVal)
	{
		this.session.LogWarning("Localization: missing stringID \"" + inStringID + "\" for " + isoCode + " in " + this.stringPath);
		retVal = inOptDefault;
	}
	if (!retVal)
	{
		retVal = inStringID;
	}
	if (retVal)
	{
		if (inOptPropertyMap)
		{
			retVal = ExpandTokens(retVal, inOptPropertyMap);
		}
		if (this.propertyMap)
		{
			retVal = ExpandTokens(retVal, this.propertyMap);
		}
	}
	if(inOptReplaceSingleQuote)
	{
		retVal = retVal.replace(/\'/g, "\\\'");
	}
	return retVal;
}


/**
Localize the DOM.  Nodes having a locid attribute are transated using
the Localization object's dictionary.
@param	inRootElement the root of the DOM to localize.
*/
Localization.prototype.LocalizeDOM = function(inRootElement)
{
	var localizationObj = this;

	var localizeNode = function(inNode)
	{
		var locId = inNode.getAttribute("locid");
		// Nodes with IDs matching resource IDs get their content replaced.
		if (locId)
		{
			var locString = localizationObj.GetString(locId);
			if (locString)
			{
				if ((1 == inNode.nodeType) && ("INPUT" == inNode.nodeName))
				{
					inNode.value = locString;
				}
				else
				{
					inNode.innerHTML = locString;
				}
			}
		}

		// All text nodes get scanned for [PropertyName] replacement
		if (inNode.firstChild != null && 3 == inNode.firstChild.nodeType && localizationObj.propertyMap)
		{
			var newText = ExpandTokens(inNode.firstChild.nodeValue, localizationObj.propertyMap);
			inNode.firstChild.nodeValue = newText;
		}
	};
	applyToDOMFragment(inRootElement, localizeNode);
}


/**
Encapsulate a localizable string and token replacement map in an object
for deferred localization.  This is useful in a context where a string
needs to be returned from a context where localization object is not
available.
*/
function LocalizedString(inStringID, inOptDefaultString, inOptPropertyMap)
{
	this.stringID = inStringID;
	this.defaultString = inOptDefaultString;
	if (inOptPropertyMap && typeof inOptPropertyMap == "object")
	{
		this.propertyMap = new Object();
		CloneAcyclicObject(inOptPropertyMap, this.propertyMap);
	}
}


/**
Translate a LocalizedString with a given Localization Object and an optional
language ISO code.  If no parameters are supplied, the fallback is the default
string, or the stringId if the default string is null and token expansion
is performed if a property map is present.
*/
LocalizedString.prototype.Translate = function(inLocalizationObj, inOptIsoCode)
{
	var retVal = null;
	if (inLocalizationObj && inLocalizationObj.GetStringForLanguage)
	{
		retVal = inLocalizationObj.GetStringForLanguage(this.stringID, inOptIsoCode, this.defaultString, this.propertyMap);
	}
	else
	{
		retVal = this.defaultString;
		if (!retVal)
			retVal = this.stringID;

		if (retVal && this.propertyMap)
		{
			retVal = ExpandTokens(retVal, this.propertyMap);
		}
	}
	return retVal;
}


/**
Return the ISO code of the installer display language
*/
function getUserInterfaceLanguage(inContainer)
{
	// CS4 installer spec v4, page 13 indicates OS language
	// should always be used, falling back to English if not available
	var result = "en_US";
	
	try
	{
		var osDefaultLanguage;
		
		// If inContainer is a session with properties, use those
		// Otherwise use the ContainerProxy method to retrieve the language info
		if (null != inContainer.properties)
		{
			osDefaultLanguage = inContainer.properties[gConstants.kPropDefaultLanguage];
		}
		else
		{
			osDefaultLanguage = inContainer.GetDefaultProperties()[gConstants.kPropDefaultLanguage];
		}
		
		// Restrict the language to one supported by localization strings
		if (null != osDefaultLanguage)
			result = getUILanguageForLanguage(osDefaultLanguage);
	}
	catch(e)
	{
		// On serious failure, fall back to English
		result = "en_US";
		inContainer.logError("Exception thrown while getting UI language, using default of: " + result);
	}
	
	return result;
}


/**
Replace inline markup in the string with the default set of token values as well
as any user-supplied ones
@param	inString		String to resolve token references
@param	inUserObj		Additional user object that maps attrToken->value
*/
function ExpandTokens(inString, inUserObj)
{
	var replaceToken = function(token, subexp1)
	{
		if ((null != subexp1) && (null != inUserObj[subexp1]))
		{
			return inUserObj[subexp1];
		}
		else
		{
			return token;
		}
	};

	if (inString && inUserObj)
	{
		return inString.replace(/\[([^\[]+)\]/g, replaceToken);
	}
	else
	{
		return inString;
	}
}


/**
Get all supported languages array
*/
function getAllSupportedLanguagesArray()
{
	return [
		"en_US",
		"en_GB",
		"en_XM",
		"es_QM",
		"fr_FR",
		"de_DE",
		"ja_JP",
		"es_ES",
		"es_MX",
		"it_IT",
		"nl_NL",
		"da_DK",
		"fi_FI",
		"no_NO",
		"sv_SE",
		"pt_BR",
		"ko_KR",
		"zh_CN",
		"zh_TW",
		"fr_CA",
		"es_LA",
		"cs_CZ",
		"pl_PL",
		"tr_TR",
		"ar_AE",
		"hu_HU",
		"he_IL",
		"ru_RU",
		"el_GR",
		"bg_BG",
		"lv_LV",
		"et_EE",
		"hr_HR",
		"ro_RO",
		"sl_SI",
		"sk_SK",
		"th_TH",
		"vi_VN",
		"en_XC",
		"fr_XM",
		"sq_AL",
		"ar_SA",
		"be_BY",
		"ca_ES",
		"hi_IN",
		"is_IS",
		"lt_LT",
		"mk_MK",
		"nn_NO",
		"nb_NO",
		"pt_PT",
		"sh_YU",
		"uk_UA",
		"sr_YU",
		"kk_KZ",
		"az_AZ"
		];
}


/**
For a given iso code, return what UI language to use.  This collapses the large set of payload
languages down to the smaller set of UI languages we have strings for.  The fallback is always
en_US.
*/
function getUILanguageForLanguage(inIsoCode)
{
	/*
	Language mapping table.
	  0: unsupported for UI.  Will fall back to en_US.
	  1: directly supported with no mapping.
	  xx_XX: use this ISO code.
	*/

	var map = {
		ar_AE: 1,
		ar_SA: "ar_AE",
		az_AZ: 0,
		be_BY: 0,
		bg_BG: 0,
		ca_ES: 0,
		cs_CZ: 1,
		da_DK: 1,
		de_DE: 1,
		el_GR: 1,
		en_GB: "en_US",
		en_US: 1,
		en_XC: "en_US",
		en_XM: "en_US",
		es_ES: 1,
		es_LA: "es_ES",
		es_MX: "es_ES",
		et_EE: 0,
		fi_FI: 1,
		fr_CA: "fr_FR",
		es_QM: "es_ES",
		fr_FR: 1,
		fr_XM: "fr_FR",
		he_IL: 1,
		hi_IN: 0,
		hr_HR: 0,
		hu_HU: 1,
		is_IS: 0,
		it_IT: 1,
		ja_JP: 1,
		kk_KZ: 0,
		ko_KR: 1,
		lt_LT: 0,
		lv_LV: 0,
		mk_MK: 0,
		nb_NO: 1,
		nl_NL: 1,
		nn_NO: "nb_NO",
		no_NO: "nb_NO",
		pl_PL: 1,
		pt_BR: 1,
		pt_PT: "pt_BR",
		ro_RO: 1,
		ru_RU: 1,
		sh_YU: 0,
		sk_SK: 0,
		sl_SI: 0,
		sq_AL: 0,
		sr_YU: 0,
		sv_SE: 1,
		th_TH: 0,
		tr_TR: 1,
		uk_UA: 1,
		vi_VN: 0,
		zh_CN: 1,
		zh_TW: 1
		};
		
	var mapping = map[inIsoCode];
	if (mapping)
	{
		if (mapping == 1)
			return inIsoCode;
		else
			return mapping;
	}
	return "en_US";
}

/**
For a given iso code, return whether the locale is right-to-left (true) or not (false)
*/
function isLanguageRTL(inIsoCode)
{
	/*
	Language mapping table.
	  false: left to right 
	  true: right to left
	*/
	var map = {
		ar_AE: true,
		ar_SA: true,
		az_AZ: true,
		be_BY: false,
		bg_BG: false,
		ca_ES: false,
		cs_CZ: false,
		da_DK: false,
		de_DE: false,
		el_GR: false,
		en_GB: false,
		en_US: false,
		en_XC: false,
		en_XM: false,
		es_ES: false,
		es_LA: false,
		et_EE: false,
		es_MX: false,
		es_QM: false,
		fi_FI: false,
		fr_CA: false,
		fr_FR: false,
		fr_XM: false,
		he_IL: true,
		hi_IN: false,
		hr_HR: false,
		hu_HU: false,
		is_IS: false,
		it_IT: false,
		ja_JP: false,
		kk_KZ: false,
		ko_KR: false,
		lt_LT: false,
		lv_LV: false,
		mk_MK: false,
		nb_NO: false,
		nl_NL: false,
		nn_NO: false,
		no_NO: false,
		pl_PL: false,
		pt_BR: false,
		pt_PT: false,
		ro_RO: false,
		ru_RU: false,
		sh_YU: false,
		sk_SK: false,
		sl_SI: false,
		sq_AL: false,
		sr_YU: false,
		sv_SE: false,
		th_TH: false,
		tr_TR: false,
		uk_UA: false,
		vi_VN: false,
		zh_CN: false,
		zh_TW: false
	};
		
	return map[inIsoCode];
}

/**
Create a language <select>...</select> element.
*/
function CreateLanguageSelect(inLocalization, inIncludeFunc)
{
	var select = document.createElement("select");
	var languages = getAllSupportedLanguagesArray();
	for (var l = 0; l < languages.length; l++)
	{
		var isoCode = languages[l];
		if (inIncludeFunc(isoCode))
		{
			var languageLabel = inLocalization.GetStringForLanguage("isoToLanguage", isoCode, isoCode);
			var option = document.createElement("option");
			option.appendChild(document.createTextNode(languageLabel));
			option.value = isoCode;
			select.appendChild(option);
		}
	}
	return select;
}
