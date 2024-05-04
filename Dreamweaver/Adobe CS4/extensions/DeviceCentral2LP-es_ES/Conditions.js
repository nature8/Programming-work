
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_39DECE844E725D33DBBEB253279AC4EA", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="es_ES"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="es_ES")
	{
		_RIBS_function_setPersistentProperty("ADOBE_39DECE844E725D33DBBEB253279AC4EA", 1);
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
	