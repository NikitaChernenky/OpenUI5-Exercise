/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Layer","sap/ui/fl/Change","sap/ui/fl/Utils","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/write/_internal/Storage"],function(L,C,U,F,S){"use strict";function g(o){switch(o.fileType){case"change":case"variant":return"changes";case"comp_variant_change":return"compVariantChanges";default:}}function a(p,o){var i=p.changeToBeAddedOrDeleted.getDefinition();var s=g(i);o[s].push(i);var I=i.fileName;var m=F.getCompEntitiesByIdMap(p.reference);m[I]=i;}function d(p,o){var i=p.changeToBeAddedOrDeleted.getDefinition();var s=g(i);var l=-1;o[s].some(function(E,I){if(E.fileName===i.fileName){l=I;return true;}});if(l>-1){o[s].splice(l,1);}var m=F.getCompEntitiesByIdMap(p.reference);delete m[i.fileName];}function c(p,o,s){var m=F.getCompVariantsMap(p.reference)._getOrCreate(p.persistencyKey);if(!m[s]){var i={fileName:U.createDefaultFileName(s),fileType:"change",changeType:s,layer:L.USER,reference:p.reference,selector:{persistencyKey:p.persistencyKey},support:{generator:p.generator||"CompVariantState."+s,sapui5Version:sap.ui.version}};if(p.compositeCommand){i.support.generator.compositeCommand=p.compositeCommand;}var l=new C(i);m[s]=l;F.getCompEntitiesByIdMap(p.reference)[l.getId()]=l;}m[s].setContent(o);return m[s];}function r(o,l){for(var i=0;i<o.length;i++){if((o[i].fileName||o[i].getFileName())===l.fileName){o.splice(i,1);break;}}}function b(m,o){if(o.isVariant()){return m.variants;}switch(o.getChangeType()){case"defaultVariant":return m.defaultVariants;case"standardVariant":return m.standardVariants;default:return m.changes;}}function w(o,s){return S.write({flexObjects:[o.getDefinition()],layer:o.getLayer(),transport:o.getRequest(),isLegacyVariant:o.isVariant()}).then(function(i){if(i&&i.response&&i.response[0]){o.setResponse(i.response[0]);}else{o.setState(C.states.PERSISTED);}return s;}).then(function(s){b(s.changes.comp,o).push(o.getDefinition());return o.getDefinition();});}function u(o,l){for(var i=0;i<o.length;i++){if(o[i].fileName===l.fileName){o.splice(i,1,l);break;}}}function e(o,s){return S.update({flexObject:o.getDefinition(),layer:o.getLayer(),transport:o.getRequest()}).then(function(i){if(i&&i.response){o.setResponse(i.response);}else{o.setState(C.states.PERSISTED);}return s;}).then(function(s){var O=b(s.changes.comp,o);u(O,o.getDefinition());return o.getDefinition();});}function f(o,m,i,s){return S.remove({flexObject:o.getDefinition(),layer:o.getLayer(),transport:o.getRequest()}).then(function(){delete m[o.getId()];if(o.getChangeType()==="standardVariant"){i.standardVariant=undefined;}else if(o.getChangeType()==="defaultVariant"){i.defaultVariant=undefined;}else{r(b(i,o),o.getDefinition());}return s;}).then(function(s){r(b(s.changes.comp,o),o.getDefinition());return o.getDefinition();});}function n(o){return o&&(o.getPendingAction()==="NEW"||o.getPendingAction()==="UPDATE"||o.getPendingAction()==="DELETE");}function h(m){return m.variants.concat(m.changes).concat(m.defaultVariant).concat(m.standardVariant);}function j(o){var i={};if(typeof(o.texts)==="object"){Object.keys(o.texts).forEach(function(l){i[l]={value:o.texts[l],type:"XFLD"};});}return i;}var k={};k.setDefault=function(p){var o={defaultVariantName:p.defaultVariantId};return c(p,o,"defaultVariant");};k.setExecuteOnSelect=function(p){var o={executeOnSelect:p.executeOnSelect};return c(p,o,"standardVariant");};k.add=function(p){if(!p){return undefined;}var o=p.changeSpecificData;var i={changeType:o.type,service:o.ODataService,content:o.content,reference:p.reference,isVariant:o.isVariant,packageName:o.packageName,isUserDependent:o.isUserDependent,selector:{persistencyKey:p.persistencyKey},texts:j(o)};var l=C.createInitialFileContent(i);var m=new C(l);var q=F.getCompVariantsMap(p.reference);var M=q._getOrCreate(p.persistencyKey);b(M,m).push(m);var I=m.getId();var s=F.getCompEntitiesByIdMap(p.reference);s[I]=m;return I;};k.updateState=function(p){var o=F.getFlexObjectsFromStorageResponse(p.reference);if(p.changeToBeAddedOrDeleted){switch(p.changeToBeAddedOrDeleted.getPendingAction()){case"NEW":a(p,o);break;case"DELETE":d(p,o);break;default:break;}}};k.persist=function(p){var R=p.reference;var P=p.persistencyKey;var m=F.getCompVariantsMap(R);var i=m._getOrCreate(P);var l=F.getCompEntitiesByIdMap(R);var s=F.getStorageResponse(R);var o=h(i).filter(n).map(function(q){switch(q.getPendingAction()){case"NEW":return w(q,s);case"UPDATE":return e(q,s);case"DELETE":return f(q,l,i,s);default:break;}});return Promise.all(o);};return k;});
