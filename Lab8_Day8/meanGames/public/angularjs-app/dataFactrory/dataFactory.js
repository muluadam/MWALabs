angular.module("meanGames").factory("DataFactory",dataFactory);

function dataFactory($http,$routeParams){

return {
    getAllGames:getAllGames,
    getOneGame:getOneGame
}
function getOneGame(){
    console.log("GameId=",$routeParams.gameId)
    const url="http://localhost:3006/api/games/"+$routeParams.gameId;
    console.log("URL=="+url);
    return   $http.get(url)
    .then(complete)
    .catch(failure);

}
function getAllGames(){
    console.log("getAllGames");
      return   $http.get("http://localhost:3006/api/games")
         .then(complete)
         .catch(failure);
}
function complete(response){
    console.log("res",response);
    return response;
}

function failure(error){
    console.log("error",error);
    return error;
}

}