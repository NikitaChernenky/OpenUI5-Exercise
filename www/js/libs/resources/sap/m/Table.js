/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","./library","./ListBase","./ListItemBase","./CheckBox","./TableRenderer","sap/base/Log","sap/ui/core/ResizeHandler","sap/ui/core/util/PasteHelper","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/m/ListBaseRenderer","sap/ui/dom/jquery/Selectors"],function(D,l,L,a,C,T,b,R,P,K,q,c){"use strict";var d=l.ListKeyboardMode;var e=l.ListGrowingDirection;var B=l.BackgroundDesign;var f=l.PopinLayout;var S=l.ScreenSizes;var g=L.extend("sap.m.Table",{metadata:{library:"sap.m",properties:{backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:B.Translucent},fixedLayout:{type:"boolean",group:"Behavior",defaultValue:true},showOverlay:{type:"boolean",group:"Appearance",defaultValue:false},alternateRowColors:{type:"boolean",group:"Appearance",defaultValue:false},popinLayout:{type:"sap.m.PopinLayout",group:"Appearance",defaultValue:f.Block},contextualWidth:{type:"string",group:"Behavior",defaultValue:"Inherit"},autoPopinMode:{type:"boolean",group:"Behavior",defaultValue:false},hiddenInPopin:{type:"sap.ui.core.Priority[]",group:"Behavior"}},aggregations:{columns:{type:"sap.m.Column",multiple:true,singularName:"column",dnd:{draggable:true,droppable:true,layout:"Horizontal"}}},events:{beforeOpenContextMenu:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ColumnListItem"},column:{type:"sap.m.Column"}}},paste:{allowPreventDefault:true,parameters:{data:{type:"string[][]"}}},popinChanged:{parameters:{hasPopin:{type:"boolean"},hiddenInPopin:{type:"sap.m.Column[]"}}}},designtime:"sap/m/designtime/Table.designtime"}});g.prototype.sNavItemClass="sapMListTblRow";g.prototype.init=function(){this._iItemNeedsColumn=0;L.prototype.init.call(this);};g.prototype.setContextualWidth=function(w){var o=this.getContextualWidth();if(w==o){return this;}if(typeof w==="number"){this._sContextualWidth=w+"px";this._sContextualWidth=this._sContextualWidth.toLowerCase();}else{var h=w.toLowerCase(),W=S[h];if(W){this._sContextualWidth=W+"px";}else{this._sContextualWidth=w;}}var i=this._validateContextualWidth(this._sContextualWidth);this._iLastContextualWidth=o;if(i){this.setProperty("contextualWidth",w,true);}else{return this;}if(this._iLastContextualWidth.toLowerCase()==="auto"){this._deregisterResizeHandler();}if(this._sContextualWidth.toLowerCase()==="auto"){this._registerResizeHandler();this._applyContextualWidth(this.$().width());}else{this._applyContextualWidth(this._sContextualWidth);}return this;};g.prototype._validateContextualWidth=function(w){if(!w){return;}if(typeof w!="string"){throw new Error('expected string for property "contextualWidth" of '+this);}if(w.toLowerCase()==="auto"||w.toLowerCase()==="inherit"){return true;}if(!/^\d+(\.\d+)?(px)$/i.test(w)){throw new Error('invalid CSS size("px", "Auto", "auto", Inherit", "inherit" required) or sap.m.ScreenSize enumeration for property "contextualWidth" of '+this);}return true;};g.prototype._applyContextualWidth=function(w){w=parseFloat(w)||0;if(w){this._applyContextualSettings({contextualWidth:w});}};g.prototype._onResize=function(p){this._applyContextualWidth(p.size.width);};g.prototype._registerResizeHandler=function(){if(!this._iResizeHandlerId){var t=this;window.requestAnimationFrame(function(){t._iResizeHandlerId=R.register(t,t._onResize.bind(t));});}};g.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){R.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null;}};g.prototype.onBeforeRendering=function(){L.prototype.onBeforeRendering.call(this);if(this.getFixedLayout()){this._bHasDynamicWidthCol=this._hasDynamicWidthColumn();}if(this.getAutoPopinMode()){this._configureAutoPopin();this._bAutoPopinMode=true;}else{this._bAutoPopinMode=false;}this._applyContextualWidth(this._sContextualWidth);this._ensureColumnsMedia();this._notifyColumns("ItemsRemoved");};g.prototype._hasDynamicWidthColumn=function(o,s){if(!this.bRenderDummyColumn||!this.getFixedLayout()){return true;}return this.getColumns().some(function(h){if(h.getVisible()){var w=o&&o.getId()===h.getId()?s:h.getWidth();return!w||w==="auto";}});};g.prototype._ensureColumnsMedia=function(){this.getColumns().forEach(function(o){if(o._bShouldAddMedia){o._addMedia();}});};g.prototype.onAfterRendering=function(){L.prototype.onAfterRendering.call(this);this.updateSelectAllCheckbox();if(this.getFixedLayout()){this._forceStyleChange();}this._renderOverlay();if(this._bPopinChanged){this._firePopinChangedEvent();this._bPopinChanged=false;}};g.prototype._renderOverlay=function(){var $=this.$(),h=$.find(".sapMTableOverlay"),s=this.getShowOverlay();if(s&&h.length===0){h=q("<div>").addClass("sapUiOverlay sapMTableOverlay").css("z-index","1");$.append(h);}else if(!s){h.remove();}};g.prototype.setShowOverlay=function(s){this.setProperty("showOverlay",s,true);this._renderOverlay();return this;};g.prototype.exit=function(){L.prototype.exit.call(this);if(this._selectAllCheckBox){this._selectAllCheckBox.destroy();this._selectAllCheckBox=null;}};g.prototype.destroyItems=function(){this._notifyColumns("ItemsRemoved");return L.prototype.destroyItems.apply(this,arguments);};g.prototype.removeAllItems=function(){this._notifyColumns("ItemsRemoved");return L.prototype.removeAllItems.apply(this,arguments);};g.prototype.removeSelections=function(){L.prototype.removeSelections.apply(this,arguments);this.updateSelectAllCheckbox();return this;};g.prototype.selectAll=function(){L.prototype.selectAll.apply(this,arguments);this.updateSelectAllCheckbox();return this;};g.prototype.getColumns=function(s){var h=this.getAggregation("columns",[]);if(s){h.sort(function(i,j){return i.getOrder()-j.getOrder();});}return h;};g.prototype.onAfterPageLoaded=function(){this.updateSelectAllCheckbox();if(this.getAlternateRowColors()){var $=this.$("tblBody").removeClass();$.addClass(this._getAlternateRowColorsClass());}L.prototype.onAfterPageLoaded.apply(this,arguments);};g.prototype.shouldRenderItems=function(){return this.getColumns().some(function(o){return o.getVisible();});};g.prototype.onItemTypeColumnChange=function(i,n){this._iItemNeedsColumn+=(n?1:-1);if(this._iItemNeedsColumn==1&&n){this._setTypeColumnVisibility(true);}else if(this._iItemNeedsColumn==0){this._setTypeColumnVisibility(false);}};g.prototype.onItemSelectedChange=function(i,s){L.prototype.onItemSelectedChange.apply(this,arguments);setTimeout(function(){this.updateSelectAllCheckbox();}.bind(this),0);};g.prototype.getTableDomRef=function(){return this.getDomRef("listUl");};g.prototype.getItemsContainerDomRef=function(){return this.getDomRef("tblBody");};g.prototype.setNavigationItems=function(i){var h=this.$("tblHeader");var F=this.$("tblFooter");var r=this.$("tblBody").children(".sapMLIB");var I=h.add(r).add(F).get();i.setItemDomRefs(I);if(i.getFocusedIndex()==-1){if(this.getGrowing()&&this.getGrowingDirection()==e.Upwards){i.setFocusedIndex(I.length-1);}else{i.setFocusedIndex(h[0]?1:0);}}};g.prototype.checkGrowingFromScratch=function(){if(this.hasPopin()){return false;}return this.getColumns().some(function(o){return o.getVisible()&&o.getMergeDuplicates();});};g.prototype.onColumnPress=function(o){this.bActiveHeaders&&this.fireEvent("columnPress",{column:o});};g.prototype.onColumnResize=function(o){if(!this.hasPopin()&&!this._mutex){var h=this.getColumns().some(function(j){return j.isPopin();});if(!h){o.setDisplay(this.getTableDomRef(),!o.isHidden());setTimeout(function(){var H=this.getHiddenInPopin()||[];var j=H.some(function(I){return!!I;});if(j){this._firePopinChangedEvent();}}.bind(this),100);return;}}this._dirty=this._getMediaContainerWidth()||window.innerWidth;if(!this._mutex){var i=this._getMediaContainerWidth()||window.innerWidth;this._mutex=true;this.rerender();setTimeout(function(){if(this._dirty!=i){this._dirty=0;this.rerender();}this._mutex=false;}.bind(this),200);}};g.prototype.setTableHeaderVisibility=function(h){if(!this.getDomRef()){return;}if(!this.shouldRenderItems()){return this.invalidate();}var $=this.$("tblHeader"),H=!$.hasClass("sapMListTblHeaderNone"),v=$.find(".sapMListTblCell:visible"),i=v.eq(0);if(v.length==1){i.width("");}else{v.each(function(){this.style.width=this.getAttribute("data-sap-width")||"";});}this._colCount=v.length+3+!!c.ModeOrder[this.getMode()];this.$("tblBody").find(".sapMGHLICell").attr("colspan",this.getColSpan());this.$("nodata-text").attr("colspan",this.getColCount());if(this.hasPopin()){this.$("tblBody").find(".sapMListTblSubRowCell").attr("colspan",this.getColSpan());}if(this.getFixedLayout()){this._forceStyleChange();}if(!h&&H){$[0].className="sapMListTblRow sapMLIBFocusable sapMListTblHeader";this._headerHidden=false;}else if(h&&!H&&!v.length){$[0].className="sapMListTblHeaderNone";this._headerHidden=true;}};g.prototype._forceStyleChange=function(){if(D.browser.msie||D.browser.edge){var t=this.getTableDomRef().style;t.listStyleType="circle";window.setTimeout(function(){t.listStyleType="none";},0);}};g.prototype._setTypeColumnVisibility=function(v){q(this.getTableDomRef()).toggleClass("sapMListTblHasNav",v);if(this.getAutoPopinMode()){this._configureAutoPopin(true);}};g.prototype._notifyColumns=function(A,p,v){this.getColumns().forEach(function(o){o["on"+A](p,v);});};g.prototype._getSelectAllCheckbox=function(){if(this.bPreventMassSelection){return;}if(!this._selectAllCheckBox){this._selectAllCheckBox=new C({id:this.getId("sa"),activeHandling:false}).addStyleClass("sapMLIBSelectM").setParent(this,null,true).attachSelect(function(){if(this._selectAllCheckBox.getSelected()){this.selectAll(true);}else{this.removeSelections(false,true);}},this).setTabIndex(-1);}this._selectAllCheckBox.getEnabled=function(){return this._selectAllCheckBox.getProperty("enabled");}.bind(this);return this._selectAllCheckBox;};g.prototype.updateSelectAllCheckbox=function(){if(this._selectAllCheckBox&&this.getMode()==="MultiSelect"){var i=this.getItems(),s=this.getSelectedItems().length,h=i.filter(function(I){return I.isSelectable();}).length;this._selectAllCheckBox.setSelected(i.length>0&&s==h);}};g.prototype.enhanceAccessibilityState=function(E,A){if(E==this._selectAllCheckBox){var o=sap.ui.getCore().getLibraryResourceBundle("sap.m");A.label=o.getText("TABLE_CHECKBOX_SELECT_ALL");}};g.prototype.getColSpan=function(){var i=this.shouldRenderDummyColumn()?3:2;return(this._colCount||1)-i;};g.prototype.getColCount=function(){return(this._colCount||0);};g.prototype.shouldRenderDummyColumn=function(){return this.bRenderDummyColumn&&this.getFixedLayout()&&!this._bHasDynamicWidthCol;};g.prototype.hasPopin=function(){return!!this._hasPopin;};g.prototype.isHeaderRowEvent=function(E){var h=this.$("tblHeader");return!!q(E.target).closest(h,this.getTableDomRef()).length;};g.prototype.isFooterRowEvent=function(E){var F=this.$("tblFooter");return!!q(E.target).closest(F,this.getTableDomRef()).length;};g.prototype.getAccessibilityType=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_TABLE");};g.prototype._setHeaderAnnouncement=function(){var o=sap.ui.getCore().getLibraryResourceBundle("sap.m"),A=o.getText("ACC_CTR_TYPE_HEADER_ROW")+" ";if(this.isAllSelectableSelected()){A+=o.getText("LIST_ALL_SELECTED");}this.getColumns(true).forEach(function(h,i){if(!h.getVisible()){return;}var H=h.getHeader();if(H&&H.getVisible()){A+=a.getAccessibilityText(H)+" ";}});this.updateInvisibleText(A);};g.prototype._setFooterAnnouncement=function(){var A=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_FOOTER_ROW")+" ";this.getColumns(true).forEach(function(o,i){if(!o.getVisible()){return;}var F=o.getFooter();if(F&&F.getVisible()){var h=o.getHeader();if(h&&h.getVisible()){A+=a.getAccessibilityText(h)+" ";}A+=a.getAccessibilityText(F)+" ";}});this.updateInvisibleText(A);};g.prototype.onsapspace=function(E){if(E.isMarked()){return;}if(E.target.id==this.getId("tblHeader")){E.preventDefault();if(this._selectAllCheckBox){this._selectAllCheckBox.setSelected(!this._selectAllCheckBox.getSelected()).fireSelect();E.setMarked();}}};g.prototype.onsaptabnext=function(E){if(E.isMarked()||this.getKeyboardMode()==d.Edit){return;}var r=q();if(E.target.id==this.getId("nodata")){r=this.$("nodata");}else if(this.isHeaderRowEvent(E)){r=this.$("tblHeader");}else if(this.isFooterRowEvent(E)){r=this.$("tblFooter");}var o=r.find(":sapTabbable").get(-1)||r[0];if(E.target===o){this.forwardTab(true);E.setMarked();}};g.prototype.onsaptabprevious=function(E){if(E.isMarked()||this.getKeyboardMode()==d.Edit){return;}var t=E.target.id;if(t==this.getId("nodata")||t==this.getId("tblHeader")||t==this.getId("tblFooter")){this.forwardTab(false);}else if(t==this.getId("trigger")){this.focusPrevious();E.preventDefault();}};g.prototype.onfocusin=function(E){var t=E.target;if(t.id===this.getId("tblHeader")){this._setHeaderAnnouncement();}else if(t.id===this.getId("tblFooter")){this._setFooterAnnouncement();}if(this._bThemeChanged){this._bThemeChanged=false;this._forceStyleChange();}L.prototype.onfocusin.call(this,E);};g.prototype.onThemeChanged=function(){L.prototype.onThemeChanged.call(this);this._bThemeChanged=true;};g.prototype._getAlternateRowColorsClass=function(){if(this.isGrouped()){return"sapMListTblAlternateRowColorsGrouped";}if(this.hasPopin()){return"sapMListTblAlternateRowColorsPopin";}return"sapMListTblAlternateRowColors";};g.prototype.onpaste=function(E){if(E.isMarked()||(/^(input|textarea)$/i.test(E.target.tagName))){return;}var h=P.getPastedDataAs2DArray(E.originalEvent);if(!h||h.length===0||h[0].length===0){return;}this.firePaste({data:h});};g.prototype.onkeydown=function(E){L.prototype.onkeydown.apply(this,arguments);if(D.browser.msie&&E.ctrlKey&&E.which===K.V){this.onpaste(E);}};g.prototype.ondragenter=function(E){var o=E.dragSession;if(!o||!o.getDropControl()||!o.getDropControl().isA("sap.m.Column")){return;}o.setIndicatorConfig({height:this.getTableDomRef().clientHeight});};g.prototype.onColumnWidthChanged=function(o,w){this._bHasDynamicWidthCol=this._hasDynamicWidthColumn(o,w);};g.prototype.onColumnRecalculateAutoPopin=function(o,r){if(this.getAutoPopinMode()){this._configureAutoPopin(r);}};g.prototype._requireAutoPopinRecalculation=function(v){var A=this.getAutoPopinMode();if(this._bAutoPopinMode!==A){this._bAutoPopinMode=A;return true;}if(v.length!==this._aVisibleColumns.length){return true;}for(var i=0;i<v.length;i++){if(v[i]!==this._aVisibleColumns[i]){return true;}}return this.shouldRenderDummyColumn();};g.prototype._configureAutoPopin=function(r){var v=this.getColumns(true).filter(function(o){return o.getVisible();});if(!v.length){return;}if(!this._aVisibleColumns||!r&&this._requireAutoPopinRecalculation(v)){this._aVisibleColumns=v;if(!r){r=true;}}if(r){var I=this.getItems();var h=[];var m=[];var j=[];for(var i=0;i<v.length;i++){var s=v[i].getImportance();if(s==="Medium"||s==="None"){m.push(v[i]);}else if(s==="High"){h.push(v[i]);}else{j.push(v[i]);}}var A=this._getInitialAccumulatedWidth(I)||6.5;A+=this.shouldRenderDummyColumn()?1:0;A=g._updateAccumulatedWidth(h,h.length>0,A);A=g._updateAccumulatedWidth(m,h.length===0&&m.length>0,A);g._updateAccumulatedWidth(j,h.length===0&&m.length===0&&j.length>0,A);}};g.prototype._getInitialAccumulatedWidth=function(i){var I=i.find(function(k){return k.getHighlight()!=="None";});var h=I?0.375:0;var m=this.getMode(),s=m==="MultiSelect"||m==="Delete"||m==="SingleSelect"||m==="SingleSelectLeft"?3:0;var o=i.find(function(k){var t=k.getType();return t==="Detail"||t==="DetailAndActive"||k.getType()==="Navigation";});var A=o?3:0;var j=i.find(function(k){return k.getNavigated();});var n=j?0.1875:0;return h+s+A+n;};g._updateAccumulatedWidth=function(h,s,A){var j=A;for(var i=0;i<h.length;i++){h[i].setDemandPopin(!(s&&i===0));var w=h[i].getWidth();var u=w.replace(/[^a-z]/ig,"");var k=parseFloat(l.BaseFontSize)||16;if(u===""||u==="auto"){j=j+h[i].getAutoPopinWidth();}else if(u==="px"){j=j+parseFloat((parseFloat(w).toFixed(2)/k).toFixed(2));}else if(u==="em"||u==="rem"){j=j+parseFloat(w);}if(h[i].getDemandPopin()){h[i].setMinScreenWidth(j+"rem");}else{h[i].setMinScreenWidth();}}return j;};g.prototype._getHiddenInPopin=function(){var v=this.getColumns().filter(function(o){return o.getVisible()&&o.getDemandPopin();});var h=v.filter(function(V){return V._media&&!V._media.matches&&!V.isPopin();});this._iHiddenPopinColumns=h.length;return h;};g.prototype._firePopinChangedEvent=function(){this.fireEvent("popinChanged",{hasPopin:this.hasPopin(),hiddenInPopin:this._getHiddenInPopin()});};g.prototype._fireUpdateFinished=function(i){L.prototype._fireUpdateFinished.apply(this,arguments);if(this._bPopinChanged==null){this._iVisibleItemsLength=this.getVisibleItems().length;return;}var v=this.getVisibleItems().length;if(!this._iVisibleItemsLength&&v>0){this._iVisibleItemsLength=v;this._firePopinChangedEvent();}else if(this._iVisibleItemsLength>0&&!v){this._iVisibleItemsLength=v;this._firePopinChangedEvent();}};return g;});
