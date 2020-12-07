/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Label","sap/m/library","./DraftIndicatorRenderer"],function(C,L,l,D){"use strict";var a=l.DraftIndicatorState;var b=C.extend("sap.m.DraftIndicator",{metadata:{library:"sap.m",designtime:"sap/m/designtime/DraftIndicator.designtime",properties:{state:{type:"sap.m.DraftIndicatorState",group:"Behavior",defaultValue:a.Clear},minDisplayTime:{type:"int",group:"Behavior",defaultValue:1500}},aggregations:{_label:{type:"sap.m.Label",multiple:false,visibility:"hidden"}}}});var B=sap.ui.getCore().getLibraryResourceBundle("sap.m");b._oTEXTS={};b._oTEXTS[a.Saving]=B.getText("DRAFT_INDICATOR_SAVING_DRAFT");b._oTEXTS[a.Saved]=B.getText("DRAFT_INDICATOR_DRAFT_SAVED");b._oTEXTS[a.Clear]="";b.prototype.init=function(){this.aQueue=[];this.iDelayedCallId=null;};b.prototype.exit=function(){this._resetDraftTimer();};b.prototype.setState=function(s){this.setProperty("state",s);this._addToQueue(s);if(s===a.Saving){this._addToQueue(a.Clear);}return this;};b.prototype._getLabel=function(){var c=this.getAggregation('_label');if(!c){var c=new L({id:this.getId()+"-label"});this.setAggregation('_label',c,true);c=this.getAggregation('_label');}return c;};b.prototype.showDraftSaving=function(){this._addToQueue(a.Saving);this._addToQueue(a.Clear);};b.prototype.showDraftSaved=function(){this._addToQueue(a.Saved);};b.prototype.clearDraftState=function(){this._addToQueue(a.Clear);};b.prototype._addToQueue=function(s){this.aQueue.push(s);this._processQueue();};b.prototype._processQueue=function(){if(this.iDelayedCallId){return;}var n=this.aQueue.shift();var t=this.getMinDisplayTime();if(!n){return;}this._applyState(n);if(n===a.Clear){this._proceed();return;}this.iDelayedCallId=setTimeout(this._proceed.bind(this),t);};b.prototype._proceed=function(){this._resetDraftTimer();this._processQueue();};b.prototype._applyState=function(s){this._getLabel().setText(b._oTEXTS[s]);};b.prototype._resetDraftTimer=function(){clearTimeout(this.iDelayedCallId);this.iDelayedCallId=null;};return b;});
