
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_4447400F88E856DC5F1B025689923A45", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="fi_FI"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="fi_FI")
	{
		_RIBS_function_setPersistentProperty("ADOBE_4447400F88E856DC5F1B025689923A45", 1);
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
	