
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_6D67AF5B34BF7377E7E470782BB31CFD", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="en_XM"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="en_XM")
	{
		_RIBS_function_setPersistentProperty("ADOBE_6D67AF5B34BF7377E7E470782BB31CFD", 1);
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
	