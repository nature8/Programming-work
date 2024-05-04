/*!
**********************************************************************
@file WizardWidget1.js

Copyright 2003-2008 Adobe Systems Incorporated.                     
All Rights Reserved.                                                
                                                                    
NOTICE: All information contained herein is the property of Adobe   
Systems Incorporated.                                                                                                                    

***********************************************************************
*/
/**
Wizard widget for all other widgets, This is the common parent of all other widgets, extendable for future.
Arguments :: mainelement, objectEventRef
mainelement :: the main html element, that will be rendered & all other functions below apply stuff to this element
objectEventRef is of this format :: 
{onclick:function(){onclickFunctionCodez},
onkeyup:function(){onkeyupFunctionCodez},
etc.}
*/

/*5 EASY STEPS TO INHERIT AND USE WIZARDWIDGET1*/
/*PART1 :: WizardImage1 inherits from WizardWidget1*/
/*PART2 :: Create main element*/
/*PART3 :: Create, object of event references in proper format*/
/*PART4 :: Inheritance Part, Call Parent Constructor*/
/*PART5 :: Any Extra Performance, Post Appending To Dom, Etc.*/

function WizardWidget1(mainelement, inId, inClName, inAlt, addToContainer, objectEventRef)
{
	this.mainelement=mainelement;
	
	if(inId)	this.mainelement.id = inId;
	
	if(inClName)	this.mainelement.className = inClName;
	
	if(inAlt)	this.mainelement.alt = inAlt;
	
	if(addToContainer)
		this.addToContainer=addToContainer;
	else
		this.addToContainer=document;
	
	this.addToContainer.appendChild(this.mainelement);
	
	if(objectEventRef)
		this.objectEventRef=objectEventRef;
	else
		this.objectEventRef=new Object();
	for(var eventName in this.objectEventRef)
	{
		this.mainelement[eventName]=this.objectEventRef[eventName];
	}
	
	if(!(this.mainelement.style))
		this.mainelement.style="";
	this.mainelement.parentWizard=this;
	
	this.disabled = false;
}

WizardWidget1.prototype.Enable = function()
{
	for(var eventName in this.objectEventRef)
	{
		this.mainelement[eventName]=this.objectEventRef[eventName];
	}
	
	this.mainelement.style["-khtml-opacity"]="1.0";
	this.mainelement.style["khtml-opacity"]="1.0";
	this.mainelement.style["opacity"]="1.0";
	this.mainelement.style["filter"]="alpha(opacity=100)";

	this.disabled = false;
	this.mainelement.disabled = false; // TODO: disable text is drawn by OS due to this, need to restyle text 
}

WizardWidget1.prototype.Disable = function()
{
	for(var eventName in this.objectEventRef)
	{
		this.mainelement[eventName]=function(){};
	}
	
	this.mainelement.style["-khtml-opacity"]="0.5";
	this.mainelement.style["khtml-opacity"]="0.5";
	this.mainelement.style["opacity"]="0.5";
	this.mainelement.style["filter"]="alpha(opacity=50)";

	this.disabled = true;
	this.mainelement.disabled = true;
}

WizardWidget1.prototype.Show = function(displayStyle)
{
    if(displayStyle)
		this.mainelement.style["display"] = displayStyle;
	else
		this.mainelement.style["display"] = "block";
}

WizardWidget1.prototype.SetVisibility = function(displayStyle)
{
    if(displayStyle)
		this.mainelement.style["visibility"] = displayStyle;
}

WizardWidget1.prototype.Hide = function(displayStyle)
{
	if(displayStyle)
		this.mainelement.style["display"] = displayStyle;
	else
		this.mainelement.style["display"] = "none";
}

WizardWidget1.prototype.SetPos = function(inLeft, inTop)
{
    if(inLeft)
    {
		if(inLeft.indexOf("px")!= -1)
			this.mainelement.style.left = inLeft;
	    else
	    	this.mainelement.style.left = inLeft + "px";
	}
    if(inTop)
    {
		if(inTop.indexOf("px")!= -1)
			this.mainelement.style.top = inTop;
		else
			this.mainelement.style.top = inTop + "px";
	}
}

WizardWidget1.prototype.SetWidth = function(inWidth)
{
    if(inWidth != null)
    {
		if(inWidth.indexOf("px")!= -1)
			this.mainelement.style.width = inWidth;
	    else
	    	this.mainelement.style.width = inWidth + "px";
	}
}

WizardWidget1.prototype.SetHeight = function(inHeight)
{
    if(inHeight != null)
    {
		if(inHeight.indexOf("px")!= -1)
			this.mainelement.style.width = inHeight;
	    else
	    	this.mainelement.style.width = inHeight + "px";
	}
}

WizardWidget1.prototype.SetId = function(inId)
{
	this.mainelement.id = inId;
}

WizardWidget1.prototype.SetClassName = function(inClName)
{
	this.mainelement.className = inClName;
}

WizardWidget1.prototype.SetAddToContainer = function(addToContainer)
{
	this.addToContainer.removeChild(this.mainelement);
	
	if(addToContainer)
		this.addToContainer=addToContainer;
	else
		this.addToContainer=document;
	
	this.addToContainer.appendChild(this.mainelement);
}


WizardWidget1.prototype.SetObjectEventRef = function(objectEventRef)
{
	if(!(this.objectEventRef))
		this.objectEventRef=new Object();//If It Never Got Created!
	for(var eventName in objectEventRef)
	{
		this.objectEventRef[eventName]=objectEventRef[eventName];//Update Collection
		this.mainelement[eventName]=this.objectEventRef[eventName];
	}
}

WizardWidget1.prototype.GetObjectEventRef = function(eventName)
{
	if(!(this.objectEventRef))
		return null;
	return this.objectEventRef[eventName];
}

WizardWidget1.prototype.SetAlt = function(inAlt)
{
	this.mainelement.alt = inAlt;
}

WizardWidget1.prototype.GetDisplayElement = function()
{
	return this.mainelement;
}

WizardWidget1.prototype.SetClickFunction = function(onClickFunc)
{
	var objectEventRef=		{
								onclick:onClickFunc
							};
	this.SetObjectEventRef(objectEventRef);
}

WizardWidget1.prototype.GetClickFunction = function()
{
	return this.GetObjectEventRef('onclick');
}

WizardWidget1.prototype.IsDisabled = function()
{
	return (this.disabled);
}
