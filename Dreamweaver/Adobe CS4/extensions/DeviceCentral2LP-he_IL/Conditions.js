
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_03D788CB10E59ECF465E9B93A36F1D46", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="he_IL"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="he_IL")
	{
		_RIBS_function_setPersistentProperty("ADOBE_03D788CB10E59ECF465E9B93A36F1D46", 1);
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
	