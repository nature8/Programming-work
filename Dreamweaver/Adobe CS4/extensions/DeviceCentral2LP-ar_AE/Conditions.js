
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_24FDDF2200359FB06226B9D7D412E6E2", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="ar_AE"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="ar_AE")
	{
		_RIBS_function_setPersistentProperty("ADOBE_24FDDF2200359FB06226B9D7D412E6E2", 1);
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
	