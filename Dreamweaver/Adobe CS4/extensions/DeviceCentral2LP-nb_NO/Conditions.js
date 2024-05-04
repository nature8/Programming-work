
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_33011761134448A539DE8EB46330C21C", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="nb_NO"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="nb_NO")
	{
		_RIBS_function_setPersistentProperty("ADOBE_33011761134448A539DE8EB46330C21C", 1);
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
	