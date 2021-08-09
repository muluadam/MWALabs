angular.module("meanGamesApp").controller("UserController", UserController);
function UserController(UserDataFactory, $window) {
  const vm = this;
  vm.cred = {};
  vm.token = "";
  // vm.loggedUser = "";
  vm.user = {}

  vm.loggedUser = $window.sessionStorage.loggedUser;


  vm.logout = function () {
    $window.sessionStorage.token = "";
    vm.token = ""
    vm.loggedUser = ""
    vm.token = response.data.token;
  }
  vm.login = function () {
    console.log(vm.cred);
    UserDataFactory.login(vm.cred).then((response) => {
      //console.log(response);
      // console.log("successfull login");
      $window.sessionStorage.token = response.data.token;
      $window.sessionStorage.loggedUser = response.data.user.name;

      if (response.data.status = 200) {
        vm.token = response.data.token;
        vm.loggedUser = $window.sessionStorage.loggedUser;

        $path.redirectTo("/")
      } else {

      }

      // console.log("token=",vm.token)

    })
  }
}

