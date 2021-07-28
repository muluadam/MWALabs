 
angular.module("meanTourism").controller("OneVisitorController",OneVisitorController);

function OneVisitorController(DataFactory){
    const vm=this;
    console.log("OneVisitorController");
    vm.data=DataFactory.getOneVisitor().then(function(response){
        vm.data=response.data;
    })
}