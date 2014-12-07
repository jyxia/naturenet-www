"use strict";angular.module("naturenetWebApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","naturenetWebApp.filters","angularUtils.directives.dirPagination","bootstrapLightbox"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"MainCtrl"}).when("/observations",{templateUrl:"views/observations.html",controller:"ObservationListCtrl"}).when("/activities",{templateUrl:"views/activities.html",controller:"ActivityListCtrl"}).when("/designs",{templateUrl:"views/designs.html",controller:"DesignIdeaListCtrl"}).when("/observation/:id",{templateUrl:"views/observation.html",controller:"ObservationCtrl"}).otherwise({redirectTo:"/"})}]).config(["LightboxProvider",function(a){a.templateUrl="views/observation-lightbox.html"}]),angular.module("naturenetWebApp.filters",[]).filter("interpolate",["version",function(a){return function(b){return String(b).replace(/\%VERSION\%/gm,a)}}]).filter("thumb",[function(){return function(a){return String(a).replace("upload/","upload/w_100,h_100,c_fill/")}}]).filter("large",[function(){return function(a){return String(a).replace("upload/","upload/h_600,c_fit/")}}]).filter("medium",[function(){return function(a){return String(a).replace("upload/","upload/w_292,h_200,c_fit/")}}]),function(){var a,b="angularUtils.directives.dirPagination";try{a=angular.module(b)}catch(c){a=angular.module(b,[])}a.directive("dirPaginate",["$compile","$parse","$timeout","paginationService",function(a,b,c,d){return{terminal:!0,multiElement:!0,priority:5e3,compile:function(c,e){c[0].hasAttribute("dir-paginate-start")||c[0].hasAttribute("data-dir-paginate-start")?(e.$set("ngRepeatStart",e.dirPaginate),c.eq(c.length-1).attr("ng-repeat-end",!0)):e.$set("ngRepeat",e.dirPaginate);var f=e.dirPaginate,g=f.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),h=/\|\s*itemsPerPage\s*:[^|]*/;if(null===g[2].match(h))throw"pagination directive: the 'itemsPerPage' filter must be set.";var i=g[2].replace(h,""),j=b(i),k=e.paginationId||"__default";return d.registerInstance(k),function(c,e,f){var g,h=a(e,!1,5e3);if(f.currentPage)g=b(f.currentPage);else{var i=k+"__currentPage";c[i]=1,g=b(i)}d.setCurrentPageParser(k,g,c),"undefined"!=typeof f.totalItems?(d.setAsyncModeTrue(k),c.$watch(function(){return b(f.totalItems)(c)},function(a){a>=0&&d.setCollectionLength(k,a)})):c.$watchCollection(function(){return j(c)},function(a){a&&d.setCollectionLength(k,a.length)}),h(c)}}}}]),a.directive("dirPaginationControls",["paginationService","paginationTemplate",function(a,b){function c(a,b,c,e){var f,g=[],h=Math.ceil(b/c),i=Math.ceil(e/2);f=i>=a?"start":a>h-i?"end":"middle";for(var j=h>e,k=1;h>=k&&e>=k;){var l=d(k,a,e,h),m=2===k&&("middle"===f||"end"===f),n=k===e-1&&("middle"===f||"start"===f);g.push(j&&(m||n)?"...":l),k++}return g}function d(a,b,c,d){var e=Math.ceil(c/2);return a===c?d:1===a?a:d>c?b>d-e?d-c+a:b>e?b-e+a:a:a}var e=/^\d+$/;return{restrict:"AE",templateUrl:function(a,c){return c.templateUrl||b.getPath()},scope:{maxSize:"=?",onPageChange:"&?"},link:function(b,d,f){function g(d){i(d)&&(b.pages=c(d,a.getCollectionLength(j),a.getItemsPerPage(j),l),b.pagination.current=d,b.onPageChange&&b.onPageChange({newPageNumber:d}))}function h(){var d=parseInt(a.getCurrentPage(j))||1;b.pages=c(d,a.getCollectionLength(j),a.getItemsPerPage(j),l),b.pagination.current=d,b.pagination.last=b.pages[b.pages.length-1],b.pagination.last<b.pagination.current&&b.setCurrent(b.pagination.last)}function i(a){return e.test(a)&&a>0&&a<=b.pagination.last}var j;if(j=f.paginationId||"__default",b.maxSize||(b.maxSize=9),b.directionLinks=angular.isDefined(f.directionLinks)?b.$parent.$eval(f.directionLinks):!0,b.boundaryLinks=angular.isDefined(f.boundaryLinks)?b.$parent.$eval(f.boundaryLinks):!1,!a.isRegistered(j)){var k="__default"!==j?" (id: "+j+") ":" ";throw"pagination directive: the pagination controls"+k+"cannot be used without the corresponding pagination directive."}var l=Math.max(b.maxSize,5);b.pages=[],b.pagination={last:1,current:1},b.$watch(function(){return(a.getCollectionLength(j)+1)*a.getItemsPerPage(j)},function(a){a>0&&h()}),b.$watch(function(){return a.getItemsPerPage(j)},function(a,c){a!=c&&g(b.pagination.current)}),b.$watch(function(){return a.getCurrentPage(j)},function(a,b){a!=b&&g(a)}),b.setCurrent=function(b){i(b)&&a.setCurrentPage(j,b)}}}}]),a.filter("itemsPerPage",["paginationService",function(a){return function(b,c,d){if("undefined"==typeof d&&(d="__default"),!a.isRegistered(d))throw"pagination directive: the itemsPerPage id argument (id: "+d+") does not match a registered pagination-id.";var e,f;return b instanceof Array?(c=parseInt(c)||9999999999,f=a.isAsyncMode(d)?0:(a.getCurrentPage(d)-1)*c,e=f+c,a.setItemsPerPage(d,c),b.slice(f,e)):b}}]),a.service("paginationService",function(){var a,b={};this.registerInstance=function(c){"undefined"==typeof b[c]&&(b[c]={asyncMode:!1},a=c)},this.isRegistered=function(a){return"undefined"!=typeof b[a]},this.getLastInstanceId=function(){return a},this.setCurrentPageParser=function(a,c,d){b[a].currentPageParser=c,b[a].context=d},this.setCurrentPage=function(a,c){b[a].currentPageParser.assign(b[a].context,c)},this.getCurrentPage=function(a){var c=b[a].currentPageParser;return c?c(b[a].context):1},this.setItemsPerPage=function(a,c){b[a].itemsPerPage=c},this.getItemsPerPage=function(a){return b[a].itemsPerPage},this.setCollectionLength=function(a,c){b[a].collectionLength=c},this.getCollectionLength=function(a){return b[a].collectionLength},this.setAsyncModeTrue=function(a){b[a].asyncMode=!0},this.isAsyncMode=function(a){return b[a].asyncMode}}),a.provider("paginationTemplate",function(){var a="directives/pagination/dirPagination.tpl.html";this.setPath=function(b){a=b},this.$get=function(){return{getPath:function(){return a}}}})}(),angular.module("naturenetWebApp").controller("MainCtrl",["$scope","$http",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var b=a.slides=[];a.addSlide=function(){b.push({image:"images/slide-"+c+".jpg",text:"ACES"})};for(var c=1;4>c;c++)a.addSlide(c)}]).controller("ObservationListCtrl",["$scope","$http","Lightbox",function(a,b,c){b.get("data.json").success(function(b){var d=b.data;a.notes=d.filter(function(a){return"FieldNote"==a.kind&&a.medias&&a.medias.length>0}).reverse().slice(0,200),a.notes.forEach(function(a,b){a.index=b}),a.images=a.notes.map(function(a){return{url:a.medias[0].link,caption:a}}),a.openLightboxModal=function(b){console.log("open"),c.openModal(a.images,b)}}),a.currentPage=1,a.pageSize=12}]).controller("ObservationCtrl",["$scope","$http","$routeParams",function(a,b,c){var d="http://naturenet.herokuapp.com/api/note/"+c.id;b.get(d).success(function(b){a.observation=b.data})}]).controller("ActivityListCtrl",["$scope","$http",function(a,b){var c="http://naturenet.herokuapp.com/api/context/activities";a.activities=[],b.get(c).success(function(c){c.data.filter(function(a){return"aces"==a.site.name}).forEach(function(b){a.activities.push(b)}),a.activities.forEach(function(a){var c="http://naturenet.herokuapp.com/api/context/"+a.id+"/notes";b.get(c).success(function(b){a.notes=b.data.filter(function(a){return a.medias&&a.medias.length>0}).reverse()})})})}]).controller("DesignIdeaListCtrl",["$scope","$http",function(a,b){var c="data.json";b.get(c).success(function(b){a.designIdeas=b.data.filter(function(a){return"Design"==a.context.kind}),a.designIdeas.forEach(function(a){a.likes=a.feedbacks.filter(function(a){return"like"==a.kind}).length}),a.designIdeas=a.designIdeas.reverse()})}]).controller("OtherController",["$scope",function(a){a.pageChangeHandler=function(a){console.log("going to page "+a)}}]),angular.module("naturenetWebApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);