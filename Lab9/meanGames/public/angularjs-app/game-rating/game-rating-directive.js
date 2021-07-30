angular.module("meanGames").directive("gameRating",gameRating);
    function GameRating(){
        return {
            restrict: "E",
            templateUrl:"agularjs-app/game-rating/rating.html",
            bindToController:true,
            controller:"OneGameController",
            controllerAs:"vm",
            scope:{
                stars:"@"
            }
        }
    }
