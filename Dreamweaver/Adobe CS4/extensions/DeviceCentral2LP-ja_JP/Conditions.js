
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_DBEAEF5E90ED8AE85454207F053479B0", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="ja_JP"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="ja_JP")
	{
		_RIBS_function_setPersistentProperty("ADOBE_DBEAEF5E90ED8AE85454207F053479B0", 1);
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
	