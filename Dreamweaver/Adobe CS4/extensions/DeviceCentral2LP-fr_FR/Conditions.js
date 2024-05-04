
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_BFD18E4E82701025A9D6ABEEC29B4D30", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="fr_FR"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="fr_FR")
	{
		_RIBS_function_setPersistentProperty("ADOBE_BFD18E4E82701025A9D6ABEEC29B4D30", 1);
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
	