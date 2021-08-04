angular.module("meanGamesApp").controller("UserController",UserController);

function UserController(DataFactory){
 const vm=this;

 vm.games=DataFactory.getAllGames().then(function(response){
    log("response",response.data)
    vm.games=response.data
});

vm.newUser=DataFactory.register().then(function(response){
    log("response",response.data)
    vm.newUser=response.data;
    
})
  vm.user={}
vm.register= function(){
    if(vm.user.password!==vm.user.retypePassword){
        vm.err="Passwords must match"
    }else{
        $http.post("/api/user/register",vm.user).then(function(result){
            log("response");
        }).catch(function(err){
            log("err",err)
            vm.err=err;
        })
    }
}
}
 