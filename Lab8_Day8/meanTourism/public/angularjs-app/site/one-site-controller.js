angular.module("meanTourism").controller("OneSiteController",OneSiteController);

function OneSiteController(DataFactory){
    const vm = this;
    vm.data=DataFactory.getOneSite().then(function(response){
        vm.data=response.data;
    });
}