
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_2C78C9ECEDF1EF73D5F070B8A2062B72", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="ro_RO"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="ro_RO")
	{
		_RIBS_function_setPersistentProperty("ADOBE_2C78C9ECEDF1EF73D5F070B8A2062B72", 1);
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
	