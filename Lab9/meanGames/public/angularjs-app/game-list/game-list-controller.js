angular.module("meanGames").controller("UIGameController",UIGameController);

function UIGameController(DataFactory){
    const vm = this;
    const log=console.log;
    vm.games= DataFactory.getAllGames().then(function(response){
         console.log(response.data);
         vm.games=response.data;
    });

 
    vm.oneGame=DataFactory.getOneGame().then(function(response){
        console.log("Response==DATa",response.data);
        vm.oneGame=response.data;
        vm.rating=_getStarRatings(response.data.rate)
        console.log("DAT==",response.data);
    });
   
    function _getStarRatings(stars){
        return new Array(stars);
    }


    vm.addGame=function(){
        log("button clicked");
    }
vm.deleteOneGame=function(){
   // log("Deleting Game wit Id,",vm.oneGame._id);
  vm.deletedGame1= DataFactory.deleteOneGame().then(function(response){
  
        if(response.success==200){
         
        }        
    });
    $location.path("/")
    
}
vm.saveForm=function(){
    log("save editt ");


    log("game:",vm.oneGame)
      vm.games= DataFactory.editOneGame(vm.onegame).then(function(response){
        //   log("EditOne game")  
        //   log("Edit Useresponse=",response.data)
         // alert(response.data.title+" is edite ");
     });


}

    vm.gameform={}
    vm.formData={};
    vm.submitForm = function(form) {

        vm.gameform=form.gameform;

        vm.formData={
            title:form.title,
            price:form.price,
            year:form.year,
            rate:form.rate,
            minPlayers:form.minPlayers,
            maxPlayers:form.maxPlayers,
            designer:form.designer
        }
 
   vm.games= DataFactory.addOneGame(vm.formData).then(function(response){
         console.log(response.data);
         vm.games=response.data;
         log("Aded User Response=",response.data)
         alert(response.data.title+" is registered ");
    });
    
      };

      vm.editedGame=DataFactory.deleteOneGame().then(function(response){

      });

      vm.data=DataFactory.getOneGame().then(function(response){
        console.log("Response==DATa",response.data);
        vm.data=response.data;
        vm.rating=_getStarRatings(response.data.rate)
        console.log("DAT==",response.data);
    });
    
}