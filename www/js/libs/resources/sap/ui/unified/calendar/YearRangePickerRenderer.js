/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./YearPickerRenderer",'./CalendarDate','sap/ui/core/date/UniversalDate'],function(R,Y,C,U){"use strict";var a=R.extend(Y);a.apiVersion=2;a.getAccessibilityState=function(){return{role:"grid",readonly:"true",multiselectable:false,roledescription:sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified").getText("YEAR_RANGE_PICKER")};};a.renderCells=function(r,y){var s=new C(y._getDate(),y.getPrimaryCalendarType()),f=new C(s,y.getPrimaryCalendarType()),S,F="",b="",I=y.getId(),c=y.getColumns(),d=y.getYears(),w="",A,e,i;f.setYear(f.getYear()-Math.floor(y.getRangeSize()/2));f.setYear(f.getYear()-Math.floor(d/2)*y.getRangeSize());f=y._checkFirstDate(f);S=new C(f,y.getPrimaryCalendarType());S.setYear(S.getYear()+y.getRangeSize()-1);if(c>0){w=(100/c)+"%";}else{w=(100/d)+"%";}for(i=0;i<d;i++){e=y._oFormatYyyymmdd.format(f.toUTCJSDate(),true);A={role:"gridcell"};if(c>0&&i%c==0){r.openStart("div");r.accessibilityState(null,{role:"row"});r.openEnd();}r.openStart("div",I+"-y"+e);r.class("sapUiCalItem");if(!y._checkDateEnabled(f,S)){r.class("sapUiCalItemDsbl");A["disabled"]=true;}r.attr("tabindex","-1");r.attr("data-sap-year-start",e);r.style("width",w);r.accessibilityState(null,A);r.openEnd();F=y._oYearFormat.format(U.getInstance(f.toUTCJSDate(),f.getCalendarType()),true);b=y._oYearFormat.format(U.getInstance(S.toUTCJSDate(),S.getCalendarType()),true);r.text(F+" - "+b);r.close("div");if(c>0&&((i+1)%c==0)){r.close("div");}f.setYear(S.getYear()+1);S.setYear(S.getYear()+y.getRangeSize());}};return a;},true);