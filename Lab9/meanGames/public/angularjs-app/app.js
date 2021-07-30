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
    controller:"UIGameController",
    controllerAs:"uiGameCrtl",
    templateUrl:"angularjs-app/game-list/one-game.html"
}).when("/game/edit/:gameId",{
    controller:"UIGameController",
    controllerAs:"uiGameCrtl",
    templateUrl:"angularjs-app/game-list/edit-game.html"
}).when("/game/delete/:gameId",{
    controller:"UIGameController",
    controllerAs:"uiGameCrtl",
    templateUrl:"angularjs-app/game-list/delete-game.html",
    
    redirectTo="/"
})

.when("/about",{
    controller:"AboutController",
      controllerAs:"aboutCrtl",
    templateUrl:"angularjs-app/about/about.html"
})
.when("/register",{
    controller:"UserController",
      controllerAs:"vm",
    templateUrl:"angularjs-app/user/register.html"
}).otherwise(redirectTo="/")

}