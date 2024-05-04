
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_589425357318E1B4637285505489ECEA", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="en_GB"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="en_GB")
	{
		_RIBS_function_setPersistentProperty("ADOBE_589425357318E1B4637285505489ECEA", 1);
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
	