
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_2455490956AFA0788EE9A78505D006B6", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="zh_TW"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="zh_TW")
	{
		_RIBS_function_setPersistentProperty("ADOBE_2455490956AFA0788EE9A78505D006B6", 1);
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
	