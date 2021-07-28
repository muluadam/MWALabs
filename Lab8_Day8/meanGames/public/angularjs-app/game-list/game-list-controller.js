angular.module("meanGames").controller("UIGameController",UIGameController);

function UIGameController(DataFactory){
    const vm = this;
    vm.games= DataFactory.getAllGames().then(function(response){
         console.log(response.data);
         vm.games=response.data;
    });

    

}