
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_43E5C4E1B939CF76427726B7945D0EAE", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="es_MX"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="es_MX")
	{
		_RIBS_function_setPersistentProperty("ADOBE_43E5C4E1B939CF76427726B7945D0EAE", 1);
		_RIBS_function_log(g_kLogDebug, "	Condition satisfied");
	}
	else
	{
		_RIBS_function_log(g_kLogDebug, "	Condition not met");
	}
}
catch (ex)
{
	_RIBS_function_logException(jsExpressionString, ex);
}
	