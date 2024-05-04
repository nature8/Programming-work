
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_AEB9AC597D3B4BC5C9990582528F250B", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="tr_TR"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="tr_TR")
	{
		_RIBS_function_setPersistentProperty("ADOBE_AEB9AC597D3B4BC5C9990582528F250B", 1);
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
	