/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
if(typeof window.sap!=="object"&&typeof window.sap!=="function"){window.sap={};}if(typeof window.sap.ui!=="object"){window.sap.ui={};}(function(){"use strict";if(typeof window.sap.ui.Device==="object"||typeof window.sap.ui.Device==="function"){var c="1.84.1";window.sap.ui.Device._checkAPIVersion(c);return;}var D={};var F=0,E=1,W=2,I=3,d=4,T=5;var f=function(){function a(i,w){return("000"+String(i)).slice(-w);}this.defaultComponent='DEVICE';this.sWindowName=(window.top==window)?"":"["+window.location.pathname.split('/').slice(-1)[0]+"] ";this.log=function(i,b,e){e=e||this.defaultComponent||'';var q=new Date(),v={time:a(q.getHours(),2)+":"+a(q.getMinutes(),2)+":"+a(q.getSeconds(),2),date:a(q.getFullYear(),4)+"-"+a(q.getMonth()+1,2)+"-"+a(q.getDate(),2),timestamp:q.getTime(),level:i,message:b||"",component:e||""};if(window.console){var w=v.date+" "+v.time+" "+this.sWindowName+v.message+" - "+v.component;switch(i){case F:case E:console.error(w);break;case W:console.warn(w);break;case I:console.info?console.info(w):console.log(w);break;case d:console.debug?console.debug(w):console.log(w);break;case T:console.trace?console.trace(w):console.log(w);break;}}return v;};};var l=new f();l.log(I,"Device API logging initialized");D._checkAPIVersion=function(a){var v="1.84.1";if(v!=a){l.log(W,"Device API version differs: "+v+" <-> "+a);}};var g={};function h(e,a,b){if(!g[e]){g[e]=[];}g[e].push({oListener:b,fFunction:a});}function j(e,a,b){var q=g[e];if(!q){return this;}for(var i=0,v=q.length;i<v;i++){if(q[i].fFunction===a&&q[i].oListener===b){q.splice(i,1);break;}}if(q.length==0){delete g[e];}}function k(e,a){var b=g[e];var q;if(b){b=b.slice();for(var i=0,v=b.length;i<v;i++){q=b[i];q.fFunction.call(q.oListener||window,a);}}}var O={"WINDOWS":"win","MACINTOSH":"mac","LINUX":"linux","IOS":"iOS","ANDROID":"Android","BLACKBERRY":"bb","WINDOWS_PHONE":"winphone"};function n(a,b){a=a||navigator.userAgent;var e,i;function q(){var x=b||navigator.platform;if(x.indexOf("Win")!=-1){var p1=/Windows NT (\d+).(\d)/i;var q1=a.match(p1);var r1="";if(q1[1]=="6"){if(q1[2]==1){r1="7";}else if(q1[2]>1){r1="8";}}else{r1=q1[1];}return{"name":O.WINDOWS,"versionStr":r1};}else if(x.indexOf("Mac")!=-1){return{"name":O.MACINTOSH,"versionStr":""};}else if(x.indexOf("Linux")!=-1){return{"name":O.LINUX,"versionStr":""};}l.log(I,"OS detection returned no result");return null;}e=/Windows Phone (?:OS )?([\d.]*)/;i=a.match(e);if(i){return({"name":O.WINDOWS_PHONE,"versionStr":i[1]});}if(a.indexOf("(BB10;")>0){e=/\sVersion\/([\d.]+)\s/;i=a.match(e);if(i){return{"name":O.BLACKBERRY,"versionStr":i[1]};}else{return{"name":O.BLACKBERRY,"versionStr":'10'};}}e=/\(([a-zA-Z ]+);\s(?:[U]?[;]?)([\D]+)((?:[\d._]*))(?:.*[\)][^\d]*)([\d.]*)\s/;i=a.match(e);if(i){var v=/iPhone|iPad|iPod/;var w=/PlayBook|BlackBerry/;if(i[0].match(v)){i[3]=i[3].replace(/_/g,".");return({"name":O.IOS,"versionStr":i[3]});}else if(i[2].match(/Android/)){i[2]=i[2].replace(/\s/g,"");return({"name":O.ANDROID,"versionStr":i[3]});}else if(i[0].match(w)){return({"name":O.BLACKBERRY,"versionStr":i[4]});}}e=/\((Android)[\s]?([\d][.\d]*)?;.*Firefox\/[\d][.\d]*/;i=a.match(e);if(i){return({"name":O.ANDROID,"versionStr":i.length==3?i[2]:""});}return q();}function s(a,b){D.os=n(a,b)||{};D.os.OS=O;D.os.version=D.os.versionStr?parseFloat(D.os.versionStr):-1;if(D.os.name){for(var e in O){if(O[e]===D.os.name){D.os[e.toLowerCase()]=true;}}}}s();D._setOS=s;var B={"INTERNET_EXPLORER":"ie","EDGE":"ed","FIREFOX":"ff","CHROME":"cr","SAFARI":"sf","ANDROID":"an"};var u=navigator.userAgent;function o(a,b){
/*!
		 * Taken from jQuery JavaScript Library v1.7.1
		 * http://jquery.com/
		 *
		 * Copyright 2011, John Resig
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * Includes Sizzle.js
		 * http://sizzlejs.com/
		 * Copyright 2011, The Dojo Foundation
		 * Released under the MIT, BSD, and GPL Licenses.
		 *
		 * Date: Mon Nov 21 21:11:03 2011 -0500
		 */
function e(a){var q=(a||u).toLowerCase();var B1=/(webkit)[ \/]([\w.]+)/;var C1=/(opera)(?:.*version)?[ \/]([\w.]+)/;var D1=/(msie) ([\w.]+)/;var E1=/(trident)\/[\w.]+;.*rv:([\w.]+)/;var F1=/(edge)[ \/]([\w.]+)/;var G1=/(mozilla)(?:.*? rv:([\w.]+))?/;var H1=F1.exec(q)||E1.exec(q)||B1.exec(q)||C1.exec(q)||D1.exec(q)||q.indexOf("compatible")<0&&G1.exec(q)||[];var I1={browser:H1[1]||"",version:H1[2]||"0"};I1[I1.browser]=true;return I1;}var i=e(a);var q=a||u;var v=b||window.navigator;var w;var x;if(i.mozilla){w=/Mobile/;if(q.match(/Firefox\/(\d+\.\d+)/)){var p1=parseFloat(RegExp.$1);x={name:B.FIREFOX,versionStr:""+p1,version:p1,mozilla:true,mobile:w.test(q)};}else{x={mobile:w.test(q),mozilla:true,version:-1};}}else if(i.webkit){var q1=q.toLowerCase().match(/webkit[\/]([\d.]+)/);var r1;if(q1){r1=q1[1];}w=/Mobile/;var s1=q.match(/(Chrome|CriOS)\/(\d+\.\d+).\d+/);var t1=q.match(/FxiOS\/(\d+\.\d+)/);var u1=q.match(/Android .+ Version\/(\d+\.\d+)/);if(s1||t1||u1){var v1,w1,x1;if(s1){v1=B.CHROME;x1=w.test(q);w1=parseFloat(s1[2]);}else if(t1){v1=B.FIREFOX;x1=true;w1=parseFloat(t1[1]);}else if(u1){v1=B.ANDROID;x1=w.test(q);w1=parseFloat(u1[1]);}x={name:v1,mobile:x1,versionStr:""+w1,version:w1,webkit:true,webkitVersion:r1};}else{var y1=/Version\/(\d+\.\d+).*Safari/;var z1=v.standalone;if(y1.test(q)){var A1=y1.exec(q);var p1=parseFloat(A1[1]);x={name:B.SAFARI,versionStr:""+p1,fullscreen:false,webview:false,version:p1,mobile:w.test(q),webkit:true,webkitVersion:r1};}else if(/iPhone|iPad|iPod/.test(q)&&!(/CriOS/.test(q))&&!(/FxiOS/.test(q))&&(z1===true||z1===false)){x={name:B.SAFARI,version:-1,fullscreen:z1,webview:!z1,mobile:w.test(q),webkit:true,webkitVersion:r1};}else{x={mobile:w.test(q),webkit:true,webkitVersion:r1,version:-1};}}}else if(i.msie||i.trident){var p1;if(document.documentMode&&!a){if(document.documentMode===7){p1=8.0;}else{p1=parseFloat(document.documentMode);}}else{p1=parseFloat(i.version);}x={name:B.INTERNET_EXPLORER,versionStr:""+p1,version:p1,msie:true,mobile:false};}else if(i.edge){var p1=p1=parseFloat(i.version);x={name:B.EDGE,versionStr:""+p1,version:p1,edge:true};}else{x={name:"",versionStr:"",version:-1,mobile:false};}if((i.chrome||window.Intl&&window.Intl.v8BreakIterator)&&'CSS'in window){x.blink=true;}return x;}D._testUserAgent=o;function p(){D.browser=o();D.browser.BROWSER=B;if(D.browser.name){for(var b in B){if(B[b]===D.browser.name){D.browser[b.toLowerCase()]=true;}}}}p();D.support={};D.support.touch=!!(('ontouchstart'in window)||(navigator.maxTouchPoints>0)||(window.DocumentTouch&&document instanceof window.DocumentTouch)||(window.TouchEvent&&D.browser.firefox));D.support.pointer=!!window.PointerEvent;D.support.matchmedia=!!window.matchMedia;var m=D.support.matchmedia?window.matchMedia("all and (max-width:0px)"):null;D.support.matchmedialistener=!!(m&&m.addListener);D.support.orientation=!!("orientation"in window&&"onorientationchange"in window);D.support.retina=(window.retina||window.devicePixelRatio>=2);D.support.websocket=('WebSocket'in window);D.support.input={};D.support.input.placeholder=('placeholder'in document.createElement("input"));D.media={};var R={"SAP_3STEPS":"3Step","SAP_4STEPS":"4Step","SAP_6STEPS":"6Step","SAP_STANDARD":"Std","SAP_STANDARD_EXTENDED":"StdExt"};D.media.RANGESETS=R;D.media._predefinedRangeSets={};D.media._predefinedRangeSets[R.SAP_3STEPS]={points:[520,960],unit:"px",name:R.SAP_3STEPS,names:["S","M","L"]};D.media._predefinedRangeSets[R.SAP_4STEPS]={points:[520,760,960],unit:"px",name:R.SAP_4STEPS,names:["S","M","L","XL"]};D.media._predefinedRangeSets[R.SAP_6STEPS]={points:[241,400,541,768,960],unit:"px",name:R.SAP_6STEPS,names:["XS","S","M","L","XL","XXL"]};D.media._predefinedRangeSets[R.SAP_STANDARD]={points:[600,1024],unit:"px",name:R.SAP_STANDARD,names:["Phone","Tablet","Desktop"]};D.media._predefinedRangeSets[R.SAP_STANDARD_EXTENDED]={points:[600,1024,1440],unit:"px",name:R.SAP_STANDARD_EXTENDED,names:["Phone","Tablet","Desktop","LargeDesktop"]};var _=R.SAP_STANDARD;var M=D.support.matchmedialistener?0:100;var Q={};var r=null;function t(i,a,b){b=b||"px";var q="all";if(i>0){q=q+" and (min-width:"+i+b+")";}if(a>0){q=q+" and (max-width:"+a+b+")";}return q;}function y(a){if(!D.support.matchmedialistener&&r==G()[0]){return;}if(Q[a].timer){clearTimeout(Q[a].timer);Q[a].timer=null;}Q[a].timer=setTimeout(function(){var b=z(a,false);if(b){k("media_"+a,b);}},M);}function z(a,b,e){function v(q1,r1){var q=Q[q1].queries[r1];var x={from:q.from,unit:Q[q1].unit};if(q.to>=0){x.to=q.to;}if(Q[q1].names){x.name=Q[q1].names[r1];}return x;}e=e||D.media.matches;if(Q[a]){var w=Q[a].queries;var x=null;for(var i=0,p1=w.length;i<p1;i++){var q=w[i];if((q!=Q[a].currentquery||b)&&e(q.from,q.to,Q[a].unit)){if(!b){Q[a].currentquery=q;}if(!Q[a].noClasses&&Q[a].names&&!b){A(a,Q[a].names[i]);}x=v(a,i);}}return x;}l.log(W,"No queryset with name "+a+" found",'DEVICE.MEDIA');return null;}function A(a,b,e){var i="sapUiMedia-"+a+"-";C(i+b,e,i);}function C(a,b,e){var q=document.documentElement;if(q.className.length==0){if(!b){q.className=a;}}else{var v=q.className.split(" ");var w="";for(var i=0;i<v.length;i++){if((e&&v[i].indexOf(e)!=0)||(!e&&v[i]!=a)){w=w+v[i]+" ";}}if(!b){w=w+a;}q.className=w;}}function G(){return[window.innerWidth,window.innerHeight];}function H(i,q,v,w){function x(q1,v){if(v==="em"||v==="rem"){var r1=window.getComputedStyle||function(e){return e.currentStyle;};var s1=r1(document.documentElement).fontSize;var t1=(s1&&s1.indexOf("px")>=0)?parseFloat(s1,10):16;return q1*t1;}return q1;}i=x(i,v);q=x(q,v);var p1=w[0];var a=i<0||i<=p1;var b=q<0||p1<=q;return a&&b;}function J(i,a,b){return H(i,a,b,G());}function K(i,a,b){var q=t(i,a,b);var e=window.matchMedia(q);return e&&e.matches;}D.media.matches=D.support.matchmedia?K:J;D.media.attachHandler=function(a,b,e){var i=e||_;h("media_"+i,a,b);};D.media.detachHandler=function(a,b,e){var i=e||_;j("media_"+i,a,b);};D.media.initRangeSet=function(a,b,e,q,v){var w;if(!a){w=D.media._predefinedRangeSets[_];}else if(a&&D.media._predefinedRangeSets[a]){w=D.media._predefinedRangeSets[a];}else{w={name:a,unit:(e||"px").toLowerCase(),points:b||[],names:q,noClasses:!!v};}if(D.media.hasRangeSet(w.name)){l.log(I,"Range set "+w.name+" has already been initialized",'DEVICE.MEDIA');return;}a=w.name;w.queries=[];w.timer=null;w.currentquery=null;w.listener=function(){return y(a);};var x,to,p1;var q1=w.points;for(var i=0,r1=q1.length;i<=r1;i++){x=(i==0)?0:q1[i-1];to=(i==q1.length)?-1:q1[i];p1=t(x,to,w.unit);w.queries.push({query:p1,from:x,to:to});}if(w.names&&w.names.length!=w.queries.length){w.names=null;}Q[w.name]=w;if(D.support.matchmedialistener){w.queries.forEach(function(s1){s1.media=window.matchMedia(s1.query);s1.media.addListener(w.listener);});}else{window.addEventListener("resize",w.listener,false);window.addEventListener("orientationchange",w.listener,false);}w.listener();};D.media.getCurrentRange=function(a,w){if(!D.media.hasRangeSet(a)){return null;}return z(a,true,isNaN(w)?null:function(b,e,i){return H(b,e,i,[w,0]);});};D.media.hasRangeSet=function(a){return a&&!!Q[a];};D.media.removeRangeSet=function(a){if(!D.media.hasRangeSet(a)){l.log(I,"RangeSet "+a+" not found, thus could not be removed.",'DEVICE.MEDIA');return;}for(var x in R){if(a===R[x]){l.log(W,"Cannot remove default rangeset - no action taken.",'DEVICE.MEDIA');return;}}var b=Q[a];if(D.support.matchmedialistener){var q=b.queries;for(var i=0;i<q.length;i++){q[i].media.removeListener(b.listener);}}else{window.removeEventListener("resize",b.listener,false);window.removeEventListener("orientationchange",b.listener,false);}A(a,"",true);delete g["media_"+a];delete Q[a];};var S={"TABLET":"tablet","PHONE":"phone","DESKTOP":"desktop","COMBI":"combi"};D.system={};function L(a,b){var e=N(b);var i=D.os.windows&&D.os.version>=8;var q=D.os.windows&&D.os.version===7;var v={};v.tablet=!!(((D.support.touch&&!q)||i||!!a)&&e);v.phone=!!(D.os.windows_phone||((D.support.touch&&!q)||!!a)&&!e);v.desktop=!!((!v.tablet&&!v.phone)||i||q||D.os.linux||D.os.macintosh);v.combi=v.desktop&&v.tablet;v.SYSTEMTYPE=S;for(var w in S){C("sap-"+S[w],!v[S[w]]);}return v;}function N(a){var b=a||navigator.userAgent;if(D.os.ios){return/ipad/i.test(b);}else if(D.os.macintosh){return navigator.maxTouchPoints>1;}else{if(D.support.touch){if(D.os.windows&&D.os.version>=8){return true;}if(D.browser.chrome&&D.os.android&&D.os.version>=4.4){return!/Mobile Safari\/[.0-9]+/.test(b);}else{var e=window.devicePixelRatio?window.devicePixelRatio:1;if(D.os.android&&D.browser.webkit&&(parseFloat(D.browser.webkitVersion)>537.10)){e=1;}var i=(Math.min(window.screen.width/e,window.screen.height/e)>=600);if(l1()&&(window.screen.height===552||window.screen.height===553)&&(/Nexus 7/i.test(b))){i=true;}return i;}}else{var q=(/(?=android)(?=.*mobile)/i.test(b));return(D.browser.msie&&b.indexOf("Touch")!==-1)||(D.os.android&&!q);}}}function P(a,b){D.system=L(a,b);if(D.system.tablet||D.system.phone){D.browser.mobile=true;}}P();D._getSystem=L;D.orientation={};D.resize={};D.orientation.attachHandler=function(a,b){h("orientation",a,b);};D.resize.attachHandler=function(a,b){h("resize",a,b);};D.orientation.detachHandler=function(a,b){j("orientation",a,b);};D.resize.detachHandler=function(a,b){j("resize",a,b);};function U(i){i.landscape=l1(true);i.portrait=!i.landscape;}function V(){U(D.orientation);k("orientation",{landscape:D.orientation.landscape});}var X=D.resize._update=function(){Y(D.resize);k("resize",{height:D.resize.height,width:D.resize.width});};function Y(i){i.width=G()[0];i.height=G()[1];}function Z(){var w=D.orientation.landscape;var i=l1();if(w!=i){V();}if(!d1){d1=window.setTimeout($,150);}}function $(){X();d1=null;}var a1=false;var b1=false;var c1;var d1;var e1;var f1=G()[1];var g1=G()[0];var h1=false;var i1;var j1=/INPUT|TEXTAREA|SELECT/;var k1=D.os.ios&&D.browser.name==="sf"&&((D.system.phone&&D.os.version>=7&&D.os.version<7.1)||(D.system.tablet&&D.os.version>=7));function l1(b){if(D.support.touch&&D.support.orientation&&D.os.android){if(h1&&b){return!D.orientation.landscape;}if(h1){return D.orientation.landscape;}}else if(D.support.matchmedia&&D.support.orientation){return!!window.matchMedia("(orientation: landscape)").matches;}var a=G();return a[0]>a[1];}function m1(e){if(e.type=="resize"){if(k1&&j1.test(document.activeElement.tagName)&&!a1){return;}var w=G()[1];var i=G()[0];var a=new Date().getTime();if(w===f1&&i===g1){return;}b1=true;if((f1!=w)&&(g1==i)){if(!i1||(a-i1>300)){h1=(w<f1);}X();}else{g1=i;}i1=a;f1=w;if(e1){window.clearTimeout(e1);e1=null;}e1=window.setTimeout(o1,1200);}else if(e.type=="orientationchange"){a1=true;}if(c1){clearTimeout(c1);c1=null;}c1=window.setTimeout(n1,50);}function n1(){if(b1&&(a1||(D.system.tablet&&D.os.ios&&D.os.version>=9))){V();X();a1=false;b1=false;if(e1){window.clearTimeout(e1);e1=null;}}c1=null;}function o1(){a1=false;b1=false;e1=null;}D._update=function(a){u=navigator.userAgent;l.log(W,"Device API values manipulated: NOT PRODUCTIVE FEATURE!!! This should be only used for test purposes. Only use if you know what you are doing.");p();s();P(a);};Y(D.resize);U(D.orientation);window.sap.ui.Device=D;if(D.support.touch&&D.support.orientation){window.addEventListener("resize",m1,false);window.addEventListener("orientationchange",m1,false);}else{window.addEventListener("resize",Z,false);}D.media.initRangeSet();D.media.initRangeSet(R["SAP_STANDARD_EXTENDED"]);if(sap.ui.define){sap.ui.define("sap/ui/Device",[],function(){return D;});}}());
