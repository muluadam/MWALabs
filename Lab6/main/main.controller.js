angular.module("app",[]).controller("MainController",MainController);

function MainController( DataFactory){
    const vm = this;
    //vm.name="Muluadam T ad akalu";
    // console.log("RoutePARMS=",$routeParams)
    // const amount=$routeParams.amount;
    // const category=$routeParams.category;
    // console.log("cat=",category);
    // console.log("Amount",amount)

    vm.name=DataFactory.getName();

    vm.data =DataFactory.getData().then(function(response){
        console.log(response.data.results);
        vm.data=response.data.results;


    });

    // vm.data2=DataFactory.getDataFiltered(amount,category).then(function(response){
    //     console.log(response.data.results);
    //     vm.data2=response.data.results;

    // });


}