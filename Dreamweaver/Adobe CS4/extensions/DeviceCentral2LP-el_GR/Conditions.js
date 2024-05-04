
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_44F439C43296FBF6522F4018D3EA7B39", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="el_GR"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="el_GR")
	{
		_RIBS_function_setPersistentProperty("ADOBE_44F439C43296FBF6522F4018D3EA7B39", 1);
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
	