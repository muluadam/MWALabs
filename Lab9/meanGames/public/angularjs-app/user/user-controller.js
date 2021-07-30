angular.module("meanGames").controller("UserController",UserController);

function UserController() {
    
const log=console.log;
    const vm=this;
    vm.user={};
  
vm.register= function(){
   log("register is clicked") ;
}

}

