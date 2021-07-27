angular.module("app",[]).controller("MainController",MainController);

function MainController(DataFactory){
    const vm = this;
    //vm.name="Muluadam T ad akalu";
    vm.name=DataFactory.getName();

    vm.data =DataFactory.getData().then(function(response){
        console.log(response.data.results);
        vm.data=response.data.results;
    });

}