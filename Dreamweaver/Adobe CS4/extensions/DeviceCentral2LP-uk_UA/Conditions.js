
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_25E3B2454DA0A1A88BE6BC6B60B849BA", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="uk_UA"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="uk_UA")
	{
		_RIBS_function_setPersistentProperty("ADOBE_25E3B2454DA0A1A88BE6BC6B60B849BA", 1);
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
	