webpackJsonp([10],{285:function(e,t,r){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?o:arguments[0],t=arguments[1];switch(t.type){case l.a:return i.a.setDisplayedHotels(r.i(s.fromJS)([])),e.setIn(["filter","stars",t.starRating,"selected"],!e.getIn(["filter","stars",t.starRating,"selected"]));case l.b:return i.a.setDisplayedHotels(r.i(s.fromJS)([])),e.set("loading",!0).set("sort",t.sort);case l.c:return i.a.setDisplayedHotels(r.i(s.fromJS)([])),o;case l.d:return e.mergeDeep(new s.Map({filter:t.filter}));case l.e:return i.a.setDisplayedHotels(r.i(s.fromJS)([])),e.setIn(["filter","minPrice","value"],t.minPrice).setIn(["filter","maxPrice","value"],t.maxPrice);case l.f:return i.a.setDisplayedHotels(t.hotels),e.set("hasNoResult",t.hotels.isEmpty()).set("loading",!1);default:return e}}var s=r(77),a=s&&s.__esModule?function(){return s["default"]}:function(){return s};r.d(a,"a",a);var l=r(665),i=r(672),o=r.i(s.fromJS)({filter:{stars:{5:{selected:!0},4:{selected:!0},3:{selected:!0},2:{selected:!0},1:{selected:!0}},minPrice:{value:0,threshold:0},maxPrice:{value:1e4,threshold:1e4}},sort:{property:"PRICE",order:"ASC"},hasNoResult:!1,loading:!0});t["default"]=n},665:function(e,t,r){"use strict";r.d(t,"b",function(){return n}),r.d(t,"f",function(){return s}),r.d(t,"a",function(){return a}),r.d(t,"c",function(){return l}),r.d(t,"g",function(){return i}),r.d(t,"d",function(){return o}),r.d(t,"e",function(){return u});var n="HotelSearchResult/SORT_HOTELS",s="HotelSearchResult/DISPLAY_RESULT",a="HotelSearchResult/TOGGLE_STAR_RATING_FILTER",l="HotelSearchResult/FETCH_HOTELS",i="HotelSearchResult/FIND_HOTELS",o="HotelSearchResult/UPDATE_FILTER",u="HotelSearchResult/FILTER_BY_PRICE"},672:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=r(77),a=s&&s.__esModule?function(){return s["default"]}:function(){return s};r.d(a,"a",a);var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(){n(this,e),this.dispalyedHotels=r.i(s.fromJS)([])}return l(e,[{key:"setDisplayedHotels",value:function(e){this.dispalyedHotels=e}},{key:"getDisplayedHotels",value:function(){return this.dispalyedHotels}}]),e}();t.a=new i}});