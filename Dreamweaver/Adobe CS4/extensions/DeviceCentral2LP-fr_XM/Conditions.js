
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_EBF8BC3F79BA5605A263A86089A2F9B2", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="fr_XM"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="fr_XM")
	{
		_RIBS_function_setPersistentProperty("ADOBE_EBF8BC3F79BA5605A263A86089A2F9B2", 1);
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
	