/*!
**********************************************************************
@file WizardImage1.js

Copyright 2003-2008 Adobe Systems Incorporated.                     
All Rights Reserved.                                                
                                                                    
NOTICE: All information contained herein is the property of Adobe   
Systems Incorporated.                                                                                                                    

***********************************************************************
*/
/**
Image widget for handling image transparency of png, portable networks graphics type of imagez
*/
/*
new WizardImage1(imgsrc);//common, intuitive, easy to use
new WizardImage1(imgsrc, inId);//common, intuitive, easy to use
new WizardImage1(imgsrc, inId, inClName);//very common, intuitive, easy to use
new WizardImage1(imgsrc, inId, inClName, addToContainer);//common, intuitive, easy to use
*/
function WizardImage1(imgsrc, inId, inClName, addToContainer, onClickFunc, inAlt, inO, forceImage)
{
	/*PART1 :: WizardImage1 inherits from WizardWidget1*/
	this.base=WizardWidget1;
	/*END OF PART1*/
	
	/*PART2 :: Create main element*/
		if(imgsrc)
		{
		}
		else
		{
			imgsrc="media/img/WizardImage1.png";
			//gSession.LogDebug("WizardImage: Image source not specified. Using default image for image id: " + inId);
		}

		if(forceImage)//force img for scrollbar widget
		{
			this.image = document.createElement("img");
			this.image.src = imgsrc;
		}
		else
		{
			//////////////////////////////////////////////////////	=>	Do specific to platform stuff now
			var currentPlatform="Mac";
			if(inO && inO != null && inO !="")
				currentPlatform=inO;
			else
			{
				var systemInfo = gSession.systemInfo;
				currentPlatform = systemInfo.Macintosh ? "Mac" : "Win";
			}
			
			//For auxiliary functions like SetSrc below, changing image source dynamically needs ie7 determination and other information
			this.platform=currentPlatform;
			this.addToContainer=addToContainer;
			
			if(currentPlatform=="Mac")
			{
				this.image = document.createElement("img");
				this.image.src = imgsrc;
			}
			else
			{
				if(!_global_ie7)//if not ie7, apply pngfix
				{
					this.image = document.createElement("p");
					this.image.style.filter="";
					this.image.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+imgsrc+"', sizingMethod='scale');";
					this.image.src = imgsrc;//only for ease of access via GetSrc, instead of doing a regex match of above filterZ.
				}
				else
				{
					this.image = document.createElement("img");
					this.image.src = imgsrc;
				}
			}
		}
	/*END OF PART2*/
	
	/*PART3 :: Create, object of event references in proper format*/
	if(onClickFunc)
	{
		var objectEventRef=		{
									onclick:onClickFunc
								};
	}
	/*END OF PART3*/
	
	/*PART4 :: Inheritance Part, Call Parent Constructor*/
	this.base(this.image, inId, inClName, inAlt, addToContainer, objectEventRef);
	//this.prototype = new WizardWidget1(this.image, inId, inClName, inAlt, addToContainer, objectEventRef);
	/*END OF PART4*/
	
	/*PART5 :: Any Extra Performance, Post Appending To Dom, Etc.*/
	this.forceImage=forceImage;
	/*END OF PART5*/
}

//WizardImage1.prototype = new WizardWidget1();
WizardImage1.prototype = WizardWidget1.prototype;

WizardImage1.prototype.SetSrc = function(imgsrc)
{
	if(this.forceImage)//force img for scrollbar widget and button widget
	{
		//this.image = document.createElement("img");
		this.image.src = imgsrc;
	}
	else
	{
		var currentPlatform = this.platform;
		var addToContainer = this.addToContainer;
		
		if(currentPlatform=="Mac")
		{
			//this.image = document.createElement("img");
			this.image.src = imgsrc;
		}
		else
		{
			if(!_global_ie7)//if not ie7, apply pngfix
			{
				//this.image = document.createElement("p");
				this.image.style.filter="";
				this.image.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+imgsrc+"', sizingMethod='scale');";
				this.image.src = imgsrc;//only for ease of access via GetSrc, instead of doing a regex match of above filterZ.
			}
			else
			{
				//this.image = document.createElement("img");
				this.image.src = imgsrc;
			}
		}
	}
}

WizardImage1.prototype.GetSrc = function()
{
		return this.image.src;
}

WizardImage1.prototype.GetRawImage = function()
{
		return this.GetDisplayElement();
}

WizardImage1.prototype.GetRawImageStyle = function()
{
	return this.GetRawImage().style;
}