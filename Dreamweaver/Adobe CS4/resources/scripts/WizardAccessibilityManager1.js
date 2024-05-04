/*!
**********************************************************************
@file WizardAccessibilityManager1.js

Copyright 2003-2008 Adobe Systems Incorporated.                     
All Rights Reserved.                                                
                                                                    
NOTICE: All information contained herein is the property of Adobe   
Systems Incorporated.                                                                                                                    

***********************************************************************
*/
/**
Wizard Accessibility Manager1
Trivia :: The number 1 in all my widgets signifies that all these are first time written original code. (egirishg@adobe.com).
They are also not there in cs3 installers. You can also look at them as v1.0 release of javascript widgets api.
*/

var ePageRef = document.getElementById("container");
var eFullArray;

/*ON THEIR OWN, THEY MEAN SOMETHING*/

var eTAB = 9;//SWITCH FOCUS ONLY
var eSPACE = 32;//SELECT CURRENTLY FOCUSED ELEMENT
var eESCAPE = 27;//MAPPED TO AN ELEMENT OF CURRENT PAGE
var eENTER = 13;//MAPPED TO AN ELEMENT OF CURRENT PAGE

/*ON THEIR OWN, THEY MEAN SOMETHING*/
var eLEFTARROW = 37;//MOVE FOCUS TO PREVIOUS SIMILAR ELEMENT
var eUPARROW = 38;//MOVE FOCUS TO NEXT SIMILAR ELEMENT
var eRIGHTARROW = 39;//MOVE FOCUS TO NEXT SIMILAR ELEMENT
var eDOWNARROW = 40;//MOVE FOCUS TO PREVIOUS SIMILAR ELEMENT

/*ONLY WITH ALT KEY, THE RANGE OF ALPHABETS AND NUMBERS MEAN SOMETHING*/
var eALT = 18;
var eA = 65;
var eZ = 90;
var ea = 97;
var ez = 122;
var e0 = 48;
var e9 = 57;
var e0_numpad = 96;
var e9_numpad = 105;

function WizardAccessibilityManager1(jawsIsRunning)
{
	this.SetFocusStyleGlobal("1px solid white","none");
	this.CurrentFocusElementIndex = -1;
	this.EventContainer = document;
	this.PageDefaultFocusElement = null;//document.body;
	this.CurrentFocusElement = this.PageDefaultFocusElement;
	this.jawsISRunning = jawsIsRunning;
	this.ClearAllElements();
}

WizardAccessibilityManager1.prototype.ClearAllElements = function()
{
	this.PageAccessibleElementsArray = new Array();
	this.AddElement({element:this.PageDefaultFocusElement,hotkey:'0',virtualtype:'EventContainer'});
}

WizardAccessibilityManager1.prototype.AddElementSet = function(ElementSet)
{
	for(var i=0;i<ElementSet.length;i++)
	{
		this.AddElement(ElementSet[i]);
	}
}

WizardAccessibilityManager1.prototype.RemoveAllElements = function()
{
	while (this.PageAccessibleElementsArray.length > 0)
	{
		var E = this.PageAccessibleElementsArray.pop();

		E.onfocus = E.prev_onfocus;
		E.onclick = E.prev_onclick;
		if (E.parentWizard) {
			E.parentWizard.SetClickFunction(E.prev_onclick);
		}
		E.onclick = E.prev_onclick;
		E.onkeydown = E.prev_onkeydown;
		
		if(this.jawsISRunning && ((E.virtualtype=='WizardButton1') || (E.virtualtype=='ReadableText'))) {
			var id = E.virtualtype+E.Index;
			for (var n = 0; n < E.childNodes.length; n++) {
				if (id==E.childNodes[n].id) {
					E.removeChild(E.childNodes[n]);
					break;
				}
			}
		}
		E.Index = null;
		E.WizardAccessibilityManager = null;
	}
	this.CurrentFocusElementIndex = -1;
	// Reset default focus Elements
	this.SetPageDefaultEnterElement(null);
	this.SetPageDefaultEscapeElement(null);
	this.SetPageDefaultFocusElement(null);
	this.ClearPageFocus();
}

/*_BEGIN_GLOBAL_TEMPLATE
EObjectRef =	{
					element			:	_,
					hotkey			:	_,	//(& localization)
					focal			:	_,
					nofocal			:	_,
					virtualtype		:	_,
					//jaws label	: _		//(& localization)
				};
ElementSet =	[
					EObjectRef1,
					EObjectRef2
				];
_END_GLOBAL_TEMPLATE*/

WizardAccessibilityManager1.prototype.AddElement = function(EObjectRef)//take care of real properties like taborder, tabindex and label which jaws might be using
{
	var E = EObjectRef.element;

	if (E == null)
		return;
	if (!this.jawsISRunning && EObjectRef.virtualtype == 'ReadableText')
		return;
	E.WizardAccessibilityManager = this;
	if(E.style)
	{
	}
	else
	{
		E.style = new Object();
	}
	// New one?
	if (E.Index == null) {
		E.Index = this.PageAccessibleElementsArray.length;
		this.PageAccessibleElementsArray.push(E);
		E.oldborder = E.style.border;
		// Add event handling for element (not for body 0-index)
		E.prev_onfocus = E.onfocus;
		if (E.parentWizard) {
			E.prev_onclick = E.parentWizard.GetClickFunction();
		}
		if (E.prev_onclick == null) {
			E.prev_onclick = E.onclick;
		}
		E.prev_onkeydown = E.onkeydown;

		E.jawslabel = EObjectRef.jawslabel;
		E.virtualtype=EObjectRef.virtualtype;
		var thisWAM = this;

		if (this.jawsISRunning) {
			if (E.virtualtype=='WizardButton1')
				E.jawslabel = " Button. Press Spacebar To Select";
			if (!E.jawslabel)
			{
				if(E.virtualtype=='WizardRadioButton1')
					E.jawslabel = "Radio Button.";
				else if (E.virtualtype=='CheckBox')
					E.jawslabel = "Check box.";
				else if (E.virtualtype=='DisclosureTriangle')
					E.jawslabel = "Disclosure Triangle.";
				else
					E.jawslabel = "";
			}
			if(E.jawslabel && (E.jawslabel != ''))
			{
				if((E.virtualtype=='WizardRadioButton1') || (E.virtualtype=='CheckBox')  || (E.virtualtype=='DisclosureTriangle'))
				{
					if (E.virtualtype=='WizardRadioButton1') {
						E.jawslabel += " Press Spacebar To Select.";
					}
					else {// => 'WizardCheckBox1'
						E.jawslabel += " Press Spacebar To Toggle State.";
					}
					E.alt=E.jawslabel;
				}
				else if((E.virtualtype=='WizardButton1') || (E.virtualtype=='ReadableText'))
				{
					var z = document.createElement("span");
					z.id=E.virtualtype+E.Index;
					z.style.display="none";
					z.style["font-size"]="1px";
					z.style.height="1px";
					z.style.width="1px";
					z.style.position=E.style.position;
					z.style.left=E.style.left;
					z.style.top=E.style.top;
					z.style["z-index"]=55;
					z.innerText = E.jawslabel;
					E.appendChild(z);
					E.mez=z;
				}
			}
		}
		E.onfocus = function()//fully faltoo , complications galore!
		{
			thisWAM.AnnounceJawsMessage(this);
			// We are already in focus function, so only draw the focus border and do not put focus again.
			this.bDontCallFocus = true; // Don't call focus
			thisWAM.SetFocusElement(this);
			this.bDontCallFocus = false; // Restore back default value.
			if (this.prev_onfocus)
				this.prev_onfocus();
		};

		E.onclick = function()//complications part two!
		{
			if(this.virtualtype=='ListBox')
				return;
			//debugger;
			thisWAM.SetFocusElement(this);
			if (this.prev_onclick)
				this.prev_onclick();
			if (!thisWAM.cameFromFireEvent) { // Actual Mouse click
				// This is peice of code will announce JAWS message about the state of a element when it is clicked.
				var thisElement = this;
				setTimeout(function()
				{
					thisWAM.ExtraForceAnnounceJawsMessage(thisElement);
				}, 1);
			}
		};
		if (E.parentWizard) {
			E.parentWizard.SetClickFunction(E.onclick);
		}
		if (EObjectRef.virtualtype == 'InputField') {
			E.onkeydown = function()
			{
				var ekeycode = event.keyCode;
				var econtrolkey = event.ctrlKey;
				var ealtkey = event.altKey;
				var eshiftkey = event.shiftKey;
				var emetakey = event.metaKey;
				
				if(ekeycode==eENTER && !econtrolkey)
				{
					if (!this.isMultiLine || this.readOnly) {
						thisWAM.OnEnterGlobal();
						event.cancelBubble = true;
						event.returnValue = false;
					}
				}
				else if(ekeycode==eESCAPE)
				{
					thisWAM.OnEscapeGlobal();
					event.cancelBubble = true;
					event.returnValue = false;
				}
				else if(ealtkey && thisWAM.IsAlphaNumeric(ekeycode))
				{
					thisWAM.OnHotKeyPressGlobal(ekeycode);
					event.cancelBubble = true;
					event.returnValue = false;
				}
				if (this.prev_onkeydown)
					this.prev_onkeydown();
			};
		}
	}
	E.HasStyleRec = function(style, value)
	{
		var element = this;
		var bHasStyle = false;
		while (element && !bHasStyle) {
			bHasStyle = (element.currentStyle[style] == value);
			element = element.parentElement;
		}
		return bHasStyle;
	}
	E.IsDisabled = function()
	{
		var element = this;
		var bDisabled = false;
		while (element && !bDisabled) {
			bDisabled = element.disabled;
			element = element.parentElement;
		}
		return bDisabled;
	}
	E.CanTakeFocus = function()
	{
		return !(this.HasStyleRec("display", "none") || this.IsDisabled());
	}
	this.SetHotKeyElemental(E,EObjectRef.hotkey);
	if (EObjectRef.virtualtype == 'InputField' || EObjectRef.virtualtype == 'IFrame' || EObjectRef.virtualtype == 'ListBox') {
		E.dontDrawFocusRect = true;
	}
	this.SetFocusStyleElemental(E,EObjectRef.focal,EObjectRef.nofocal);
	E.tabIndex = E.Index;
}

WizardAccessibilityManager1.prototype.ClearFocusBorderElemental = function(E)
{
	if (E.dontDrawFocusRect)
		return;
	if(E.oldborder != null)
		E.style.border = E.oldborder;
	else
	{
		if(E.NoFocusStyleGlobal)
			E.style.border = E.NoFocusStyleGlobal;
		else
			E.style.border = this.NoFocusStyleGlobal;
	}
//	E.blur();
}

WizardAccessibilityManager1.prototype.MakeFocusBorderElemental = function(E)
{
	if (E.dontDrawFocusRect)
		return;
	if(E.FocusStyleGlobal != null)
		E.style.border = E.FocusStyleGlobal;
	else
		E.style.border = this.FocusStyleGlobal;
}

WizardAccessibilityManager1.prototype.ClearPageFocus = function()
{
	this.SetFocusOnDefaultElement();
}

WizardAccessibilityManager1.prototype.SetFocusElement = function(E)
{
	if(E.Index == null || this.CurrentFocusElementIndex==E.Index)
		return;
	if(this.CurrentFocusElement)
		this.ClearFocusBorderElemental(this.CurrentFocusElement);
	this.CurrentFocusElementIndex=E.Index;
	this.MakeFocusBorderElemental(this.GetFocusElement());
	this.CurrentFocusElement=E;
	if (!this.bDontCallFocus)
		E.focus();
}

WizardAccessibilityManager1.prototype.GetFocusElement = function()
{
	if (this.PageAccessibleElementsArray.length == 0 || this.CurrentFocusElementIndex < 0)
		return null;
	return this.PageAccessibleElementsArray[this.CurrentFocusElementIndex];
}

WizardAccessibilityManager1.prototype.FocusPreviousElement = function(etype)
{
	if (this.PageAccessibleElementsArray.length == 0)
		return;

	var currentFocusElementIndex = this.CurrentFocusElementIndex;

	if (currentFocusElementIndex < 0) // Currently no focus
		currentFocusElementIndex = 0; // Start from beginning
	for(var i=(currentFocusElementIndex-1); i!=currentFocusElementIndex;i--)
	{
		if (i < 0)
			i=(this.PageAccessibleElementsArray.length)-1;
		var E = this.PageAccessibleElementsArray[i];

		if(etype && E.virtualtype!=etype)
		{
			continue;
		}
		if (E.CanTakeFocus()) {
			if(etype == 'WizardRadioButton1') {
				this.ClickElement(E, true);
			}
			else {
				this.SetFocusElement(E);
			}
			return;
		}
	}
	return;
}

WizardAccessibilityManager1.prototype.FocusNextElement = function(etype)
{
	if (this.PageAccessibleElementsArray.length == 0)
		return;

	var currentFocusElementIndex = this.CurrentFocusElementIndex;

	if (currentFocusElementIndex < 0) // Currently no focus
		currentFocusElementIndex = 0; // Start from beginning
	for(var i=(currentFocusElementIndex+1); i!=currentFocusElementIndex;i++)
	{
		if (i >= this.PageAccessibleElementsArray.length)
			i=0;
		var E = this.PageAccessibleElementsArray[i];

		if(etype) {
			if (E.virtualtype!=etype)
				continue;
		}
		if (E.CanTakeFocus()) {
			if(etype == 'WizardRadioButton1') {
				this.ClickElement(E, true);
			}
			else {
				this.SetFocusElement(E);
			}
			return;
		}
	}
	return;
}

WizardAccessibilityManager1.prototype.FocusPreviousSimilarElement = function()
{
	if (this.PageAccessibleElementsArray.length == 0 || this.CurrentFocusElementIndex < 0)
		return;
	var E = this.PageAccessibleElementsArray[this.CurrentFocusElementIndex];
	if (!E.dontDrawFocusRect) {
		this.FocusPreviousElement(E.virtualtype);
	}
}

WizardAccessibilityManager1.prototype.FocusNextSimilarElement = function()
{
	if (this.PageAccessibleElementsArray.length == 0 || this.CurrentFocusElementIndex < 0)
		return;
	var E = this.PageAccessibleElementsArray[this.CurrentFocusElementIndex];
	if (!E.dontDrawFocusRect) {
		this.FocusNextElement(E.virtualtype);
	}
}

WizardAccessibilityManager1.prototype.ClickElement = function(E, bDontCheckCanTakeFocus)
{
	if (bDontCheckCanTakeFocus || E.CanTakeFocus()) {
		this.SetFocusElement(E);
		this.cameFromFireEvent = true;
		E.fireEvent("onclick");
		this.cameFromFireEvent = false;
		this.ExtraForceAnnounceJawsMessage(E);
	}
}

WizardAccessibilityManager1.prototype.SetPageDefaultFocusElement = function(PageDefaultFocusElement)
{
	this.PageDefaultFocusElement = PageDefaultFocusElement;
}

WizardAccessibilityManager1.prototype.SetPageDefaultEscapeElement = function(PageDefaultEscapeElement)
{
	this.PageDefaultEscapeElement = PageDefaultEscapeElement;
}

WizardAccessibilityManager1.prototype.SetPageDefaultEnterElement = function(PageDefaultEnterElement)
{
	this.PageDefaultEnterElement = PageDefaultEnterElement;
}

WizardAccessibilityManager1.prototype.GetPageDefaultFocusElement = function()
{
	return this.PageDefaultFocusElement;
}

WizardAccessibilityManager1.prototype.SetFocusStyleGlobal = function(focal,nofocal)
{
	this.FocusStyleGlobal = focal;
	this.NoFocusStyleGlobal = nofocal;
}

WizardAccessibilityManager1.prototype.SetFocusStyleElemental = function(E,focal,nofocal)
{
	E.FocusStyleGlobal = focal;
	E.NoFocusStyleGlobal = nofocal;
}

WizardAccessibilityManager1.prototype.SetHotKeyElemental = function(E,key)
{
	E.hotkey=key;
}

WizardAccessibilityManager1.prototype.IsAlphaNumeric = function(ekeycode)
{
	if(((ekeycode >= eA) && (ekeycode <= eZ)) || ((ekeycode >= ea) && (ekeycode <= ez)))
		return true;
	if(((ekeycode >= e0) && (ekeycode <= e9)) || ((ekeycode >= e0_numpad) && (ekeycode <= e9_numpad)))
		return true;
	return false;
}

WizardAccessibilityManager1.prototype.OnTabGlobal = function(eshiftkey)
{
	this.bDontCallFocus = true;
	if(eshiftkey)
	{
		this.FocusPreviousElement();
	}
	else
	{
		this.FocusNextElement();
	}
	this.bDontCallFocus = false;
}

WizardAccessibilityManager1.prototype.OnSpaceGlobal = function()
{
	if (this.PageAccessibleElementsArray.length == 0 || this.CurrentFocusElementIndex < 0)
		return;
	this.ClickElement(this.PageAccessibleElementsArray[this.CurrentFocusElementIndex]);
}

WizardAccessibilityManager1.prototype.OnArrowGlobal = function()
{
}

WizardAccessibilityManager1.prototype.OnEnterGlobal = function()
{
	var thisCB = this;
	// Using timeout as IE causing events to be mess up.
	setTimeout(function() {thisCB.OnEnterGlobalEx();}, 1);
}

WizardAccessibilityManager1.prototype.OnEnterGlobalEx = function()
{
	if (this.PageAccessibleElementsArray.length == 0 || this.CurrentFocusElementIndex < 0)
		return;
	var E = this.PageAccessibleElementsArray[this.CurrentFocusElementIndex];
	if (E.virtualtype == 'WizardButton1')
		this.ClickElement(E);
	else if (this.PageDefaultEnterElement)
		this.ClickElement(this.PageDefaultEnterElement);
}

WizardAccessibilityManager1.prototype.OnEscapeGlobal = function()
{
	if (this.PageDefaultEscapeElement)
		this.ClickElement(this.PageDefaultEscapeElement);
}

WizardAccessibilityManager1.prototype.OnHotKeyPressGlobal = function(ekeycode)
{
	this.hotKeyCode = ekeycode;
	var thisCB = this;
	// Using timeout as IE causing events to be mess up.
	setTimeout(function() {thisCB.OnHotKeyPressGlobalEx();}, 1);
}

WizardAccessibilityManager1.prototype.OnHotKeyPressGlobalEx = function()
{
	var ekeycode = this.hotKeyCode;

	if (ekeycode) {
		for(var i=0;i<this.PageAccessibleElementsArray.length;i++)
		{
			var E = this.PageAccessibleElementsArray[i];

			if(E.hotkey && E.hotkey.charCodeAt()==ekeycode)
			{
				//debugger;
				if(E.virtualtype=='ListBox' && E.CanTakeFocus())
					this.SetFocusElement(E);
				else
					this.ClickElement(E);
				break;
			}
		}
	}
	this.hotKeyCode = null;
}

WizardAccessibilityManager1.prototype.OnClickGlobal = function()
{
}

WizardAccessibilityManager1.prototype.MakeHotKeysAvailable = function()
{
	var thisWAM = this;
	this.EventContainer.onkeyup = function()
	{
		var ekeycode = event.keyCode;

		if(ekeycode==eSPACE)
		{
			thisWAM.OnSpaceGlobal();
			event.cancelBubble = true;
			event.returnValue = false;
		}
	};
	this.EventContainer.onkeydown = function()
	{
		var ekeycode = event.keyCode;
		var econtrolkey = event.ctrlKey;
		var ealtkey = event.altKey;
		var eshiftkey = event.shiftKey;
		var emetakey = event.metaKey;
		
		if(ekeycode==eSPACE)
		{
			event.cancelBubble = true;
			event.returnValue = false;
		}
/*		else if(ekeycode==eTAB) // Tabbing is done by navigator, not required actually
		{
			thisWAM.OnTabGlobal(eshiftkey);
		}*/
		else if(ekeycode==eENTER)
		{
			thisWAM.OnEnterGlobal();
			event.cancelBubble = true; // Events from alert window are detected in alert and also passed to main window, to prevent double handling
			event.returnValue = false;
		}
		else if(ekeycode==eESCAPE)
		{
			thisWAM.OnEscapeGlobal();
			event.cancelBubble = true; // Events from alert window are detected in alert and also passed to main window, to prevent double handling
			event.returnValue = false;
		}
		else if(ekeycode==eLEFTARROW || ekeycode==eUPARROW)
		{
			thisWAM.OnArrowGlobal();
			thisWAM.FocusPreviousSimilarElement();
		}
		else if(ekeycode==eRIGHTARROW || ekeycode==eDOWNARROW)
		{
			thisWAM.OnArrowGlobal();
			thisWAM.FocusNextSimilarElement();
		}
		else if(ealtkey && thisWAM.IsAlphaNumeric(ekeycode))
		{
			thisWAM.OnHotKeyPressGlobal(ekeycode);
			event.cancelBubble = true; // Events from alert window are detected in alert and also passed to main window, to prevent double handling
			event.returnValue = false;
		}
	};
}

WizardAccessibilityManager1.prototype.SetFocusOnDefaultElement = function()
{
	var E = this.GetPageDefaultFocusElement();
	if (E && E.CanTakeFocus())
		this.SetFocusElement(E);
	else {
		this.EventContainer.focus(); // Put focus on document if none of the element can take focus.
	}
}

WizardAccessibilityManager1.prototype.RunPageControl = function()
{
	this.SetFocusOnDefaultElement();
	this.MakeHotKeysAvailable();
}

WizardAccessibilityManager1.prototype.AnnounceJawsMessage = function(E)
{
	if (!this.jawsISRunning)
		return;
	if(E.virtualtype=='WizardRadioButton1')
	{
		if(E.parentWizard.GetRadioState())
			E.alt=E.jawslabel + " Current state is on.";
		else
			E.alt=E.jawslabel + " Current state is off.";
	}
	else if(E.virtualtype=='CheckBox')
	{
		if(E.parentWizard.GetChecked())
			E.alt=E.jawslabel + " Current state is checked.";
		else
			E.alt=E.jawslabel + " Current state is unchecked.";
	}
	else if(E.virtualtype=='DisclosureTriangle')
	{
		var src = E.parentWizard.GetSrc();
		if(src == kImgSupportingCompClosedTriangleRTL || src == kImgSupportingCompClosedTriangle)
			E.alt=E.jawslabel + " Current state is Closed.";
		else
			E.alt=E.jawslabel + " Current state is Open.";
	}
	else if(E.mez && ((E.virtualtype=='WizardButton1') || (E.virtualtype=='ReadableText')))
	{
		E.mez.innerText = E.jawslabel;
	}
}

WizardAccessibilityManager1.prototype.ExtraForceAnnounceJawsMessage = function(E)
{
	if (!this.jawsISRunning)
		return;
	var thisCB=this;
	//var _EZ = this.GetFocusElement();
	E.blur();
	setTimeout(function()
	{
		if (E.CanTakeFocus())
			E.focus();
	},1);
}
WizardAccessibilityManager1.prototype.GetFirstFocusableItem = function()
{
	var firstFocusItem = null;

	for(var i=0;i<this.PageAccessibleElementsArray.length;i++) {
		var E = this.PageAccessibleElementsArray[i];
		if (E.CanTakeFocus()) {
			firstFocusItem = E;
			break;
		}
	}
	return firstFocusItem;
}
WizardAccessibilityManager1.prototype.AnnouncePageMeesage = function()
{
	if (!this.jawsISRunning)
		return;

	var firstFocusItem = this.GetFirstFocusableItem();

	if (firstFocusItem == null)
		return;
	// The first focussable item is assumed to be page header
	var currentFocusElement = this.CurrentFocusElement;

	this.ExtraForceAnnounceJawsMessage(firstFocusItem);
	setTimeout(function()
	{
		if (currentFocusElement && currentFocusElement.CanTakeFocus())
			currentFocusElement.focus();
	},1000);
}
