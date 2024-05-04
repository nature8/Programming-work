/*!
**********************************************************************
@file WizardWidgets.js

Copyright 2003-2006 Adobe Systems Incorporated.                     
All Rights Reserved.                                                
                                                                    
NOTICE: All information contained herein is the property of Adobe   
Systems Incorporated.                                                                                                                    

***********************************************************************
*/
/**
Button widget
*/

function WizardButton1(inTabIndex, inAccessKey, inLabel, sizeX, sizeY, left, top, baseButtonImg, addToContainer, onClickFunc, imagefolderURL)
{
	/*PART1 :: WizardImage1 inherits from WizardWidget1*/
	this.base=WizardWidget1;
	/*END OF PART1*/
	
	/*PART2 :: Create main element*/
		//Make default if no value
		if(!inLabel || inLabel==null || inLabel=="")
			inLabel="i am a button";
		if(!sizeX || sizeX==null || sizeX=="")
			sizeX="30px";
		if(!sizeY || sizeY==null || sizeY=="")
			sizeY="6px";
		//End of Make default if no value
		
		//MAIN DIV
		var maindiv = document.createElement("a");
		this.uielement=maindiv;
		this.maindiv=maindiv;
		this.imagefolderURL=imagefolderURL;
		if(!(this.imagefolderURL) || this.imagefolderURL==null || this.imagefolderURL=="")
		{
			var imagefolderArray =  new Array(gSession.GetResourcesPath(), "media", "img");
			this.imagefolderURL = "file://" + _concatPaths(imagefolderArray, gSession.GetDefaultProperties().platform)+"/";
			var systemInfo = gSession.systemInfo;
			var currentPlatform = systemInfo.Macintosh ? "Mac" : "Win";
			if(currentPlatform=="Win")
			{
				this.imagefolderURL = this.imagefolderURL.replace(/\\+/g, "/");
			}
		}
		
		if(baseButtonImg)
		    this.baseButtonImg = baseButtonImg;
		else
		    this.baseButtonImg = "bigbutton_normalsize";
		maindiv.baseButtonImg = this.baseButtonImg;
		
		//IMAGE
			this.button_wz = new WizardImage1(this.imagefolderURL + this.baseButtonImg + "_upstate.png", null, null, maindiv, null, null, null, true);
			this.button = this.button_wz.GetDisplayElement();
				this.button.style.position = "absolute";
				this.button.style.left = "0px";
				this.button.style.top = "0px";
				this.button.style["z-index"]="78";
		
		//LABEL
			this.label = document.createElement("span");
			this.label.innerHTML=inLabel;
			this.label.className = this.baseButtonImg + "_buttonText";
			
			
				this.label.style.position = "absolute";
				this.button.style.height = sizeY;
				this.button.style.width = sizeX;
				this.label.style["z-index"]="79";
				this.label.style.color = "white";

		//ADDING
		maindiv.appendChild(this.label);
		
		//FUNCTIONING
		maindiv.imagefolderURL = this.imagefolderURL;
		this.uielement.button=this.button;//for mouseup and mousedown eventzg
		
			maindiv.style.position = "absolute";
			maindiv.style.left = left;
			maindiv.style.top = top;
			maindiv.style.height = sizeY;
			maindiv.style.width = sizeX;
			//maindiv.style.border = "3px blue groove";
			maindiv.style["z-index"]="77";
			maindiv.style.display="block";
			maindiv.style.visibility="visible";
			maindiv.style["text-align"]="center";
			maindiv.style["vertical-align"]="middle";
			
			maindiv.button_wz=this.button_wz;
	/*END OF PART2*/
	
	/*PART3 :: Create, object of event references in proper format*/
	var objectEventRef=		{
								onclick:onClickFunc,
								onmousedown:function(){this.button_wz.SetSrc(this.imagefolderURL + this.baseButtonImg + "_downstate.png");},
								onmouseup:function(){this.button_wz.SetSrc(this.imagefolderURL + this.baseButtonImg + "_upstate.png");},
								onmouseover:function(){this.button_wz.SetSrc(this.imagefolderURL + this.baseButtonImg + "_overstate.png");},
								onmouseout:function(){this.button_wz.SetSrc(this.imagefolderURL + this.baseButtonImg + "_upstate.png");},
								onblur:function(){this.button_wz.SetSrc(this.imagefolderURL + this.baseButtonImg + "_upstate.png");}
							};
	/*END OF PART3*/
	
	/*PART4 :: Inheritance Part, Call Parent Constructor*/
	this.base(this.maindiv, null, null, null, addToContainer, objectEventRef);
	//this.prototype = new WizardWidget1(this.maindiv, null, null, null, addToContainer, objectEventRef);
	/*END OF PART4*/
	
	/*PART5 :: Any Extra Performance, Post Appending To Dom, Etc.*/
	//centering possible only here after an element is part of the main dom
	//label positioning center offsetWidth
	this.label.style.left = ((sizeX.replace("px","")-this.label.offsetWidth)/2)+"px";//center X
	this.label.style.top = ((sizeY.replace("px","")-this.label.offsetHeight)/2)+"px";//making inLabel.height == 3px//center Y
	
	this.maindiv.style.cursor="default";
	/*END OF PART5*/
}

//WizardButton1.prototype = new WizardWidget1;
WizardButton1.prototype = WizardWidget1.prototype;

WizardButton1.prototype.SetLabel = function(inLabel)
{
		this.label.innerHTML=inLabel;
}

WizardButton1.prototype.GetLabel = function()
{
		return this.label.innerHTML;
}

WizardButton1.prototype.GetLabelElement = function()
{
		return this.label;
}

/*WizardButton1.prototype.SetPos = function(inLeft, inTop)
{
	this.mainelement.style.left = inLeft + "0px";
	this.mainelement.style.top = inTop + "0px";
	this.label.style.left = ((this.mainelement.style.width.replace("px","")-this.label.style.width.replace("px",""))/2)+"px";
	this.label.style.top = ((this.mainelement.style.width.replace("px","")-this.label.style.height.replace("px",""))/2)+"px";
}

*/