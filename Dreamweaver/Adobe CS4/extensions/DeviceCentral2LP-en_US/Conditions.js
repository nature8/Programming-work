
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_FC47F349A0CB7DC7DC93DB2C956AE3AE", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="en_US"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="en_US")
	{
		_RIBS_function_setPersistentProperty("ADOBE_FC47F349A0CB7DC7DC93DB2C956AE3AE", 1);
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
	