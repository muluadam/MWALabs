angular.module("meanGamesApp").controller("UIGameController",UIGameController);

function UIGameController(DataFactory){
    const vm = this;
    vm.games=DataFactory.getAllGames().then(function(response){
        log("response",response.data)
        vm.games=response.data
    });
}