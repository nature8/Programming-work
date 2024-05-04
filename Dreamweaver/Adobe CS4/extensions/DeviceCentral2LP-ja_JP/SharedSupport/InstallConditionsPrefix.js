
//======================================
// Conditional Evaluation
//


gNewProperties = new Object;


function _RIBS_function_initProperties()
{
	if ("undefined" == typeof gProperties)
	{
		gProperties = new Object;
		var allKeys = ARKGetAllPropertyKeys();
		for (var i = 0, e = allKeys.length;
			 i != e;
			 ++i)
		{
			var curKey = allKeys[i];
			gProperties[curKey] = ARKGetProperty(curKey);
		}
	}
	
	// return copy of gInitialProperties instead
	return gProperties;
}


function _RIBS_function_setPersistentProperty(theKey, theValue)
{
	gNewProperties[theKey] = theValue;
}


function _RIBS_function_logException(inExpression, inException)
{
	_RIBS_function_log(g_kLogCritical, inException);
}


function _RIBS_function_CommitNewProperties()
{
	for (var curKey in gNewProperties)
	{
		gProperties[curKey] = gNewProperties[curKey];
	}
	gNewProperties = new Object;
}
