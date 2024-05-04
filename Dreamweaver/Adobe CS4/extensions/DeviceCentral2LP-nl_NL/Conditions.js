
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_CBA29E9CC54BA75F05F5385363928658", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="nl_NL"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="nl_NL")
	{
		_RIBS_function_setPersistentProperty("ADOBE_CBA29E9CC54BA75F05F5385363928658", 1);
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
	