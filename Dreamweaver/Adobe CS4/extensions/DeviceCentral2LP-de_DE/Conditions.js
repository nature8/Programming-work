
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_9050DE2F645EF21FBFC8759CC6E47D69", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="de_DE"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="de_DE")
	{
		_RIBS_function_setPersistentProperty("ADOBE_9050DE2F645EF21FBFC8759CC6E47D69", 1);
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
	