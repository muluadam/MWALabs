angular.module("meanGames",['ngRoute']).config(config);

// myapp.config(function($locationProvider){
//     $locationProvider.html5Mode(true);
// })


function config($routeProvider,){

    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    //   });

$routeProvider.when("/",{
     controller:"UIGameController",
     controllerAs:"uiGameCrtl",
     templateUrl:"angularjs-app/game-list/game-list.html"
}).when("/game/:gameId",{
    controller:"OneGameController",
    controllerAs:"oneGameCrtl",
    templateUrl:"angularjs-app/one-game/one-game.html"
}).when("/about",{
    controller:"AboutController",
      controllerAs:"aboutCrtl",
    templateUrl:"angularjs-app/about/about.html"
})

}