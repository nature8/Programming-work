
Properties = _RIBS_function_initProperties();
jsExpressionString = "*Uninitialized*";
_RIBS_function_setPersistentProperty("ADOBE_A65FCA15B1BA38ED1FF68FA851DDBB06", null);
try
{
	jsExpressionString = 'Properties[\'installLanguage\']=="zh_CN"';
	_RIBS_function_log(g_kLogDebug, "Evaluating: " + jsExpressionString); 
	if (Properties['installLanguage']=="zh_CN")
	{
		_RIBS_function_setPersistentProperty("ADOBE_A65FCA15B1BA38ED1FF68FA851DDBB06", 1);
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
	