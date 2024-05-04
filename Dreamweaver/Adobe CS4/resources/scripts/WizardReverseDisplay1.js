/*!
**********************************************************************
@file WizardReverseDisplay1.js

Copyright 2003-2008 Adobe Systems Incorporated.                     
All Rights Reserved.                                                
                                                                    
NOTICE: All information contained herein is the property of Adobe   
Systems Incorporated.                                                                                                                    

***********************************************************************
*/

/**
Wizard ReverseDisplay1 for reversing the display for rtl languages like arabic, no ui componentz
*/

//var zeg=null;

function WizardReverseDisplay1(inElement)
{
/*
	if(!zeg)
	{
		zeg=document.createElement("textarea");
		zeg.rows=10;
		zeg.cols=300;
		document.getElementById("zeg").appendChild(zeg);
		document.getElementById("zeg").style.left=5;
		document.getElementById("zeg").style.bottom=5;
	}
*/
	WizardReverseDisplay1_RRleft(inElement);
	//alert(inElement.style.left+"="+"("+inElement.pwidth+")-(("+inElement.cleft+"-"+inElement.pleft+")+"+inElement.cwidth+");");
	//WizardReverseDisplay1_RRtop(inElement);
}

var textmarkupmertl = {
							"span":true,
							"h1":true,
							"p":true,
							"pre":true,
							"i":true,
							"u":true,
							"ul":true,
							"li":true
						};

function WizardReverseDisplay1_RRleft(inElement)
{
	if(inElement.tagName=="!"/* || inElement.tagName.toLowerCase()=="i"*/)//IGNORE CASES HERE, SPECIFIC CONDITIONS MEETING
		return;
		
	if(inElement.ignore)
	{
	}
	else
	{
		//If there are any special cases, handle them here before proceeding
		//For example, if(inElement.tagName.toLowerCase()=="span" or "p" or "pre")/*GProbably Texter*/{inElement.dir="rtl";return;}
		if(textmarkupmertl[inElement.tagName.toLowerCase()]==true)
		{
			inElement.dir="rtl";
		}
		
		if(inElement.tagName.toLowerCase()=="table")
		{
			inElement.dir="rtl";
			//inElement.ignorechildren=true;
		}
		
		if(inElement.specialrtlhandling)
		{
			inElement.specialrtlhandling();
		}
		
		//left info should be stored after calling children
		inElement.cleft=PixelToInt(ActualLeft(inElement));
		inElement.cwidth=PixelToInt(inElement.offsetWidth);
		inElement.pleft=PixelToInt(ActualLeft(inElement.parentElement));
		inElement.pwidth=PixelToInt(inElement.parentElement.offsetWidth);

		/*try
		{
			inElement.innerHTML+="<i style='color:white;background-color:orange;'>"+inElement.ctop+" : "+inElement.ptop+"</span>";
			inElement.style.border="1px solid orange";
			//inElement.style.direction="rtl";
		}
		catch(gel)
		{
		}*/
		
		//inElement.style.right=PixelToInt(inElement.cleft)+PixelToInt(inElement.offsetWidth);
		//inElement.style.position="absolute";
		
		/*var systemInfo = gSession.systemInfo;
		var currentPlatform = systemInfo.Macintosh ? "Mac" : "Win";
		if(currentPlatform=="Win")
			inElement.style.left=(inElement.pwidth)-((inElement.cleft-inElement.pleft)+inElement.cwidth);
		else//Mac
			inElement.style.left=(((inElement.pwidth)-((inElement.cleft-inElement.pleft)+inElement.cwidth)).toString())+"px";*/
		inElement.style.left=(((inElement.pwidth)-((inElement.cleft-inElement.pleft)+inElement.cwidth)).toString())+"px";
		//inElement.style.top=(inElement.ctop-inElement.ptop);
		//inElement.style.top=inElement.ctop;
		//inElement.style.top=inElement.deltatop;
			
		/*
		zeg.value+=inElement.tagName+" , "
			+"id : "+inElement.id+" , "
			+"cleft : "+inElement.cleft+" , "
			+"pleft : "+inElement.pleft+" , "
			+"cwidth : "+inElement.cwidth+" , "
			+"pwidth : "+inElement.pwidth+" , "
			+"newleft : "+inElement.style.left
			+" [ "+((inElement.pwidth)-((inElement.cleft-inElement.pleft)+inElement.cwidth)).toString()+" ] "
			+" _E_";
		*/
		
		//EXTRA REVERSE MAPPINGS HERE, FOR EXAMPLE, MARGIN, PADDING, ETC.
		var temp=inElement.style["margin-right"];
		if(inElement.style["margin-left"])
			inElement.style["margin-right"]=inElement.style["margin-left"];
		if(temp)
			inElement.style["margin-left"]=temp;
		
		temp=inElement.style["padding-right"];
		if(inElement.style["padding-left"])
			inElement.style["padding-right"]=inElement.style["padding-left"];
		if(temp)
			inElement.style["padding-left"]=temp;
		
	}
	
	if(inElement.ignorechildren)
	{
		//nothing to do;
	}
	else//process children
	{
		//top info should be stored before calling children
		//inElement.ctop=PixelToInt(ActualTop(inElement));
		//inElement.ptop=PixelToInt(ActualTop(inElement.parentElement));
		//forlater working
		inElement.deltatop=PixelToInt(inElement.offsetTop);//==PixelToInt(inElement.ctop-inElement.ptop);
		
		var elchildren = inElement.children;
		
		for (var i=0;i<elchildren.length;++i)
		{
			WizardReverseDisplay1_RRleft(elchildren[i]);
		}
		
		if(inElement.style)
		{
		}
		else
		{
			alert(inElement.innerHTML+" : no styling!");
			inElement.style={};
		}
	}
}

function WizardReverseDisplay1_RRtop(inElement)
{
	if(inElement.tagName=="!" || inElement.tagName.toLowerCase()=="i")
		return;
	
	var elchildren = inElement.children;
	
	inElement.style.top=inElement.deltatop;
	
	for (var i=0;i<elchildren.length;++i)
	{
		WizardReverseDisplay1_RRtop(elchildren[i]);
	}
}

function ActualLeft(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		do
		{
			curleft += obj.offsetLeft;
		}
		while(obj = obj.offsetParent);
	}
	return curleft;
}

function ActualTop(obj)
{
	var curtop = 0;
	if(obj.offsetParent)
	{
		do
		{
			curtop += obj.offsetTop;
		}
		while(obj = obj.offsetParent);
	}
	return curtop;
}

function PixelToInt(inPixel)//input can be "35px" or "35"
{
	if(typeof(inPixel)=="string")
	{
		if(inPixel=="")
			return 0;
		return parseInt(inPixel.replace("px",""))+0;
	}
	else
		return inPixel+0;
}
