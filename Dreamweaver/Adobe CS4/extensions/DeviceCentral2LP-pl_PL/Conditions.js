
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_1E70881E477ABF1772736CF2DE2006A0", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="pl_PL"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="pl_PL")
	{
		_RIBS_function_setPersistentProperty("ADOBE_1E70881E477ABF1772736CF2DE2006A0", 1);
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
	