
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_49A6313B3395EB9EB61351F831637AE2", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="ko_KR"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="ko_KR")
	{
		_RIBS_function_setPersistentProperty("ADOBE_49A6313B3395EB9EB61351F831637AE2", 1);
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
	