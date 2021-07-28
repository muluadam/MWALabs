angular.module("meanTourism", ['ngRoute']).config(config);

function config($routeProvider) {

    return $routeProvider.when("/", {
        controller: "TourSiteController",
        controllerAs: "siteCrtl",
        templateUrl: "angularjs-app/site/site-list.html"
    }).when("/site/:siteId", {
        controller: "OneSiteController",
        controllerAs: "oneSiteCrtl",
        templateUrl: "/angularjs-app/site/one-site.html"
    }).when("/visitor", {

        controller: "VisitorController",
        templateUrl: "/angularjs-app/visitor/visitor-list.html",
        controllerAs: "visitorCrtl"
    }).when("/visitor/:visitorId", {
        controller: "OneVisitorController",
        templateUrl: "/angularjs-app/visitor/visitor-one.html",
        controllerAs: "visitorOneCrtl"
    })
}