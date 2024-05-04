
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_555BF10E85B93CD75754B9C832429274", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="cs_CZ"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="cs_CZ")
	{
		_RIBS_function_setPersistentProperty("ADOBE_555BF10E85B93CD75754B9C832429274", 1);
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
	