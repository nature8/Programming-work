
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_275909DD5C87E29C583A987883643CD3", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="sv_SE"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="sv_SE")
	{
		_RIBS_function_setPersistentProperty("ADOBE_275909DD5C87E29C583A987883643CD3", 1);
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
	