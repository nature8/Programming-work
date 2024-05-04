
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_8839D9951BEA2180347E2FF981EC763F", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="it_IT"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="it_IT")
	{
		_RIBS_function_setPersistentProperty("ADOBE_8839D9951BEA2180347E2FF981EC763F", 1);
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
	