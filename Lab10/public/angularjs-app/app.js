angular.module("meanGamesApp", ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        controller: "UIGameController",
        controllerAs: "uiGameCrtl",
        templateUrl: "angularjs-app/game-list/game-list.html"
    }).when("/register", {
        controller: "UserController",
        controllerAs: "userCrtl",
        templateUrl: "angularjs-app/user/register.html"
    }).when("/login",{
        controller: "UserController",
        controllerAs: "userCrtl",
        templateUrl: "angularjs-app/user/login.html"
    }).when("/allusers",{
        controller: "UserController",
        controllerAs: "userCrtl",
        templateUrl: "angularjs-app/user/user-list.html"
    }).otherwise({
        redirectTo:"/"
    })

}