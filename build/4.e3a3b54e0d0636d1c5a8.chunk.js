webpackJsonp([4,16],{271:function(e,t,r){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?u:arguments[0],t=arguments[1];switch(t.type){case i.a:return e.setIn(["filter","stars",t.starRating,"selected"],!e.getIn(["filter","stars",t.starRating,"selected"])).set("limit",20);case i.b:return e.set("sort",t.sort).set("limit",20);case i.c:return e.set("displayedHotels",t.hotels).set("loading",!1);case i.d:return u;case i.e:return e.set("limit",e.get("limit")+20).set("loading",!0);case i.f:return e.mergeDeep(new s.Map({filter:t.filter}));case i.g:return e.setIn(["filter","minPrice","value"],t.minPrice).setIn(["filter","maxPrice","value"],t.maxPrice);default:return e}}var s=r(73),l=s&&s.__esModule?function(){return s["default"]}:function(){return s};r.d(l,"a",l);var i=r(803),u=r.i(s.fromJS)({filter:{stars:{5:{selected:!0},4:{selected:!0},3:{selected:!0},2:{selected:!0},1:{selected:!0}},minPrice:{value:0},maxPrice:{value:1e4}},sort:{property:"PRICE",order:"ASC"},displayedHotels:[],offset:0,limit:20,loading:!0});t["default"]=n},803:function(e,t,r){"use strict";r.d(t,"b",function(){return n}),r.d(t,"c",function(){return s}),r.d(t,"a",function(){return l}),r.d(t,"d",function(){return i}),r.d(t,"h",function(){return u}),r.d(t,"e",function(){return c}),r.d(t,"f",function(){return a}),r.d(t,"g",function(){return o});var n="HotelSearchResult/SORT_HOTELS",s="HotelSearchResult/DISPLAY_HOTELS",l="HotelSearchResult/TOGGLE_STAR_RATING_FILTER",i="HotelSearchResult/FETCH_HOTELS",u="HotelSearchResult/FIND_HOTELS",c="HotelSearchResult/LOAD_MORE",a="HotelSearchResult/UPDATE_FILTER",o="HotelSearchResult/FILTER_BY_PRICE"}});