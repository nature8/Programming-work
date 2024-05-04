
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_A031E193EE494CFA116EF82582A1CDBA", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="pt_BR"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="pt_BR")
	{
		_RIBS_function_setPersistentProperty("ADOBE_A031E193EE494CFA116EF82582A1CDBA", 1);
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
	