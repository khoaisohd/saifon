webpackJsonp([4,16],{271:function(e,t,r){"use strict";function s(){var e=arguments.length<=0||void 0===arguments[0]?i:arguments[0],t=arguments[1];switch(t.type){case a.a:return e.setIn(["filter","stars",t.starRating,"selected"],!e.getIn(["filter","stars",t.starRating,"selected"])).set("limit",20);case a.b:return e.set("displayedHotels",r.i(n.fromJS)([])).set("loading",!0).set("sort",t.sort).set("limit",20);case a.c:return i;case a.d:return e.set("limit",e.get("limit")+20).set("loading",!0);case a.e:return e.mergeDeep(new n.Map({filter:t.filter}));case a.f:return e.setIn(["filter","minPrice","value"],t.minPrice).setIn(["filter","maxPrice","value"],t.maxPrice).set("limit",20);case a.g:return e.set("displayedHotels",t.hotels).set("hasNoResult",t.hasNoResult).set("canLoadMore",t.canLoadMore).set("loading",!1);default:return e}}var n=r(73),l=n&&n.__esModule?function(){return n["default"]}:function(){return n};r.d(l,"a",l);var a=r(803),i=r.i(n.fromJS)({filter:{stars:{5:{selected:!0},4:{selected:!0},3:{selected:!0},2:{selected:!0},1:{selected:!0}},minPrice:{value:0,threshold:0},maxPrice:{value:1e4,threshold:1e4}},sort:{property:"PRICE",order:"ASC"},displayedHotels:[],hasNoResult:!1,canLoadMore:!0,offset:0,limit:20,loading:!0});t["default"]=s},803:function(e,t,r){"use strict";r.d(t,"b",function(){return s}),r.d(t,"g",function(){return n}),r.d(t,"a",function(){return l}),r.d(t,"c",function(){return a}),r.d(t,"h",function(){return i}),r.d(t,"d",function(){return u}),r.d(t,"e",function(){return o}),r.d(t,"f",function(){return c});var s="HotelSearchResult/SORT_HOTELS",n="HotelSearchResult/DISPLAY_RESULT",l="HotelSearchResult/TOGGLE_STAR_RATING_FILTER",a="HotelSearchResult/FETCH_HOTELS",i="HotelSearchResult/FIND_HOTELS",u="HotelSearchResult/LOAD_MORE",o="HotelSearchResult/UPDATE_FILTER",c="HotelSearchResult/FILTER_BY_PRICE"}});