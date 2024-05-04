
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_139AA33480089C1CAA7A7D1805F8E1F6", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="ru_RU"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="ru_RU")
	{
		_RIBS_function_setPersistentProperty("ADOBE_139AA33480089C1CAA7A7D1805F8E1F6", 1);
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
	