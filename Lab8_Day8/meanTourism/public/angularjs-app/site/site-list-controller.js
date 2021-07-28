angular.module("meanTourism").controller("TourSiteController",TourSiteController);

function TourSiteController(DataFactory){
    const vm=this;
    vm.data=DataFactory.getAllSites().then(function(response){
        vm.data=response.data;
    })
    vm.name="ToursitController Name";
}