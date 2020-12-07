/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','jquery.sap.strings'],function(q){"use strict";(function($,w){var s="_skip",r=/\|id-[0-9]+-[0-9]+/,a=new RegExp(s+"[0-9]*$"),b=[],h=[],S={},c=0,d,I="|",H=[],e=false,f,g=false;$.sap.history=function(z){if(!q.isPlainObject(z)){return;}if(!g){var W=$(w),A=(w.location.href.split("#")[1]||"");W.bind('hashchange',k);if($.isArray(z.routes)){var i,B;for(i=0;i<z.routes.length;i++){B=z.routes[i];if(B.path&&B.handler){$.sap.history.addRoute(B.path,B.handler);}}}if(q.isFunction(z.defaultHandler)){f=z.defaultHandler;}h.push(A);if(A.length>1){W.trigger("hashchange",[true]);}else{d=A;}g=true;}};$.sap.history.addHistory=function(i,z,B,V){var A,C;if(B===undefined){B=true;}if(!V){C=p(i,z);A=n(C);if(A){C+=(I+A);}C+=(I+(B?"1":"0"));}else{C=m(d);}H.push(C);S[C]=true;w.location.hash=C;return C;};$.sap.history.addVirtualHistory=function(){$.sap.history.addHistory("",undefined,false,true);};$.sap.history.addRoute=function(i,z,T){if(T){z=q.proxy(z,T);}var R={};R.sIdentifier=i;R['action']=z;b.push(R);return this;};$.sap.history.setDefaultHandler=function(i){f=i;};$.sap.history.getDefaultHandler=function(){return f;};$.sap.history.backToHash=function(i){i=i||"";var z;if(h.length===1){if($.isFunction(f)){f();}}else{z=j(d,i);if(z<0){w.history.go(z);}else{q.sap.log.error("jQuery.sap.history.backToHash: "+i+"is not in the history stack or it's after the current hash");}}};$.sap.history.backThroughPath=function(P){P=P||"";P=w.encodeURIComponent(P);var i;if(h.length===1){if($.isFunction(f)){f();}}else{i=j(d,P,true);if(i<0){w.history.go(i);}else{q.sap.log.error("jQuery.sap.history.backThroughPath: there's no history state which has the "+P+" identifier in the history stack before the current hash");}}};$.sap.history.back=function(i){if(h.length===1){if($.isFunction(f)){f($.sap.history.NavType.Back);}}else{if(!i){i=1;}w.history.go(-1*i);}};$.sap.history.NavType={};$.sap.history.NavType.Back="_back";$.sap.history.NavType.Forward="_forward";$.sap.history.NavType.Bookmark="_bookmark";$.sap.history.NavType.Unknown="_unknown";function j(C,T,P){var z=$.inArray(C,h),A,i,B;if(z>0){if(P){for(i=z-1;i>=0;i--){B=h[i];if(B.indexOf(T)===0&&!t(B)){return i-z;}}}else{A=$.inArray(T,h);if((A===-1)&&T.length===0){return-1*z;}if((A>-1)&&(A<z)){return A-z;}}}return 0;}function k(E,M){var i=(w.location.href.split("#")[1]||"");i=l(i);if(M||!S[i]){H.push(i);}if(!e){e=true;if(H.length>0){var z=H.shift();if(S[z]){o(z);delete S[z];}else{v(z);}d=z;}e=false;}}function l(i,R){var z=i,A=i?i.indexOf("#"):-1;if(A===0){z=z.slice(A+1);}if(R){z=z.replace(r,"");}return z;}function m(i){var P=i?i:"";if(t(P)){var z=P.lastIndexOf(s);P=P.slice(0,z);}return P+s+c++;}function p(i,z){var E=w.encodeURIComponent(i);var A=w.encodeURIComponent(w.JSON.stringify(z));return E+I+A;}function n(z){var A=$.inArray(d,h),i,B;if(A>-1){for(i=0;i<A+1;i++){B=h[i];if(B.slice(0,B.length-2)===z){return q.sap.uid();}}}return"";}function o(i){var z=$.inArray(d,h);if(!(z===-1||z===h.length-1)){h.splice(z+1,h.length-1-z);}h.push(i);}function t(i){return a.test(i);}function u(C,F){var z=$.inArray(C,h),i;if(z!==-1){if(F){for(i=z;i<h.length;i++){if(!t(h[i])){return i-z;}}}else{for(i=z;i>=0;i--){if(!t(h[i])){return i-z;}}return-1*(z+1);}}}function v(i){var R,z,P,N,A;if(d===undefined){P=y(i);if(!P||!P.bBookmarkable){if(q.isFunction(f)){f($.sap.history.NavType.Bookmark);}return;}}if(i.length===0){if(q.isFunction(f)){f($.sap.history.NavType.Back);}}else{N=q.inArray(i,h);if(N===0){P=y(i);if(!P||!P.bBookmarkable){if(q.isFunction(f)){f($.sap.history.NavType.Back);}return;}}if(t(i)){if(t(d)){z=u(i,false);w.history.go(z);}else{var B=new RegExp(q.sap.escapeRegExp(d+s)+"[0-9]*$");if(B.test(i)){z=u(i,true);if(z){w.history.go(z);}else{w.history.back();}}else{z=u(i,false);w.history.go(z);}}}else{if(N===-1){A=$.sap.history.NavType.Unknown;h.push(i);}else{if(q.inArray(d,h,N+1)===-1){A=$.sap.history.NavType.Forward;}else{A=$.sap.history.NavType.Back;}}P=y(i);if(P){R=x(P.sIdentifier);if(R){R.action.apply(null,[P.oStateData,A]);}}else{q.sap.log.error("hash format error! The current Hash: "+i);}}}}function x(z){var i;for(i=0;i<b.length;i++){if(b[i].sIdentifier===z){return b[i];}}}function y(z){if(t(z)){var i=z.lastIndexOf(s);z=z.slice(0,i);}var P=z.split(I),R={};if(P.length===4||P.length===3){R.sIdentifier=w.decodeURIComponent(P[0]);R.oStateData=w.JSON.parse(w.decodeURIComponent(P[1]));if(P.length===4){R.uid=P[2];}R.bBookmarkable=P[P.length-1]==="0"?false:true;return R;}else{return null;}}})(q,this);return q;});
