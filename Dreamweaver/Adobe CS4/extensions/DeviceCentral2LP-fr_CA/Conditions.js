
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_6DCB3FAF21F0800EC5B6E04DF331E85F", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="fr_CA"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="fr_CA")
	{
		_RIBS_function_setPersistentProperty("ADOBE_6DCB3FAF21F0800EC5B6E04DF331E85F", 1);
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
	