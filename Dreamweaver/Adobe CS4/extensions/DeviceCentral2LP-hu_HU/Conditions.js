
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_149FFBF7B459A45E57F6491C335ECBD5", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="hu_HU"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="hu_HU")
	{
		_RIBS_function_setPersistentProperty("ADOBE_149FFBF7B459A45E57F6491C335ECBD5", 1);
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
	