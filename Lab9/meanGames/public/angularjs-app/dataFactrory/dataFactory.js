angular.module("meanGames").factory("DataFactory",dataFactory);
const log=console.log;
function dataFactory($http,$routeParams){

return {
    getAllGames:getAllGames,
    getOneGame:getOneGame,
    addOneGame:addOneGame,
    deleteOneGame:deleteOneGame,
    editOneGame:editOneGame
}
function getOneGame(){
    console.log("GameId=",$routeParams.gameId)
    const url="http://localhost:3006/api/games/"+$routeParams.gameId;
    console.log("URL=="+url);
    return   $http.get(url)
    .then(complete)
    .catch(failure);

}
function deleteOneGame(){
    console.log("GameId=",$routeParams.gameId)
    const url="http://localhost:3006/api/games/"+$routeParams.gameId;
    console.log("URL=="+url);
    return   $http.delete(url)
    .then(complete)
    .catch(failure);
}
function addOneGame(game){
    log("AddoneGame");
    log(game);
    const url="http://localhost:3006/api/games/";
    console.log("URL=="+url);
    return   $http.post(url,game)
    .then(complete)
    .catch(failure);
}

function editOneGame(game){
    log("Edit One Game");
    log("Found Game=="+game)

    log("ID==", $routeParams.gameId)
    const url="http://localhost:3006/api/games/"+$routeParams.gameId;
    log(url);
   
      return $http.put(url,game).then(complete).catch(failure);
    
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