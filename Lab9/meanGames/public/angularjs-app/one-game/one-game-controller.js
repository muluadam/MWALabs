angular.module("meanGames").controller("OneGameController",OneGameController);

function OneGameController(DataFactory){

    const vm = this;
  
    vm.data=DataFactory.getOneGame().then(function(response){
        console.log("Response==DATa",response.data);
        vm.data=response.data;
        vm.rating=_getStarRatings(response.data.rate)

        console.log("DAT==",response.data);
    });
    
    function _getStarRatings(stars){
        return new Array(stars);
    }
}