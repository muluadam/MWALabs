angular.module("meanGamesApp").factory("UserDataFactory", UserDataFactory);
const log = console.log;
 
const API = "http://localhost:3002/api/game/"
 
function UserDataFactory($http, $routeParams) {

    return {
        login: login,
        register: register
    }
    function register() {
        log("Register")
    }
    function login() {
        log("login")
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