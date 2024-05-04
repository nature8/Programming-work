
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_F1FA8BD294F74E904F38BD2141B5420A", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="da_DK"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="da_DK")
	{
		_RIBS_function_setPersistentProperty("ADOBE_F1FA8BD294F74E904F38BD2141B5420A", 1);
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
	