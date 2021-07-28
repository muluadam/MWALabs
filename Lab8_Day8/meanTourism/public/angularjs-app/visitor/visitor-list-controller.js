angular.module("meanTourism").controller("VisitorController",VisitorController);

function VisitorController(DataFactory){
    const vm = this;
    vm.controllerName="visitorController";
    console.log(vm.controllerName);
    // vm.data=DataFactory.getAllVisotors().then(function(response){
    //     vm.data=response;
    // });
    vm.data=DataFactory.getAllVisotors().then(function(response){
        vm.data=response.data;
    })
}