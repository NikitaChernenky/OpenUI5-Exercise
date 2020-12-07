/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject','sap/ui/core/DeclarativeSupport','sap/ui/core/library','./View'],function(q,M,D,l,V){"use strict";var H=V.extend("sap.ui.core.mvc.HTMLView",{metadata:{library:"sap.ui.core"}});sap.ui.htmlview=function(i,v){return sap.ui.view(i,v,sap.ui.core.mvc.ViewType.HTML);};H._sType=sap.ui.core.mvc.ViewType.HTML;H.asyncSupport=true;H._mTemplates={};H._mAllowedSettings={"viewName":true,"controller":true,"viewContent":true,"controllerName":true,"resourceBundleName":true,"resourceBundleUrl":true,"resourceBundleLocale":true,"resourceBundleAlias":true};H._getTemplate=function(t,o){var u=this._getViewUrl(t);var h=this._mTemplates[u];if(!h){h=this._loadTemplate(t,o);if(o&&o.async){var a=this;return h.then(function(_){a._mTemplates[u]=_;return Promise.resolve(_);});}else{this._mTemplates[u]=h;}}return o.async?Promise.resolve(h):h;};H.prototype.getControllerName=function(){return this._controllerName;};H._getViewUrl=function(t){return q.sap.getModulePath(t,".view.html");};H._loadTemplate=function(t,o){var r=q.sap.getResourceName(t,".view.html");return q.sap.loadResource(r,o);};H.prototype.initViewSettings=function(s){if(!s){throw new Error("mSettings must be given");}if(s.viewName&&s.viewContent){throw new Error("View name and view content are given. There is no point in doing this, so please decide.");}else if(!s.viewName&&!s.viewContent){throw new Error("Neither view name nor view content is given. One of them is required.");}var t=this;function I(){t._oTemplate=document.createElement("div");if(typeof h==="string"){t._oTemplate.innerHTML=h;}else{var n=h;var f=document.createDocumentFragment();for(var i=0;i<n.length;i++){f.appendChild(n.item(i));}t._oTemplate.appendChild(f);}var m=t._oTemplate.getElementsByTagName("template")[0];var p=t.getMetadata().getAllProperties();if(m){q.each(m.attributes,function(b,A){var N=D.convertAttributeToSettingName(A.name,t.getId());var v=A.value;var P=p[N];if(!s[N]){if(P){s[N]=D.convertValueToType(D.getPropertyDataType(P),v);}else if(H._mAllowedSettings[N]){s[N]=v;}}});t._oTemplate=m;}if(t._oTemplate.content){var f=t._oTemplate.content;t._oTemplate=document.createElement("div");t._oTemplate.appendChild(f);}if(s.controllerName){t._controllerName=s.controllerName;}if((s.resourceBundleName||s.resourceBundleUrl)&&(!s.models||!s.models[s.resourceBundleAlias])){var a=new sap.ui.model.resource.ResourceModel({bundleName:s.resourceBundleName,bundleUrl:s.resourceBundleUrl,bundleLocale:s.resourceBundleLocale});t.setModel(a,s.resourceBundleAlias);}}var h=s.viewContent;if(!h){h=H._getTemplate(s.viewName,{async:s.async});}if(s.async){return h.then(function(_){h=_;I();});}I();};H.prototype.onControllerConnected=function(c){var t=this;M.runWithPreprocessors(function(){D.compile(t._oTemplate,t);},{settings:this._fnSettingsPreprocessor});};H.prototype.exit=function(){this._oTemplate=null;V.prototype.exit.call(this);if(this._connectedControls){for(var i=0;i<this._connectedControls.length;i++){this._connectedControls[i].destroy();}this._connectedControls=null;}};H.prototype.connectControl=function(c){this._connectedControls=this._connectedControls||[];this._connectedControls.push(c);};return H;});
