angular.module("meanGamesApp").factory("UserDataFactory", UserDataFactory);
 
const API = "http://localhost:3002/api/game/"
 
function UserDataFactory($http) {

    return {
        login: login,
        register: register
    }
    function register() {
        console.log("Register")
    }
    function login(cred) {
        return $http.post('/api/user/login', cred).then(complete).catch(failure);
    }
    function complete(response) {
        console.log("res", response);
        return response;
    }

    function failure(error) {
        console.log("error", error);
        return error;
    }
}