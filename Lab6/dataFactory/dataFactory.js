angular.module("app").factory("DataFactory",dataFactory);

function dataFactory($http){
    return  {
        getName:getName,
        getData:getData,
        getDataFiltered:getDataFiltered
    }
  
    function getName(){
      return "Hello Muluadam ad";    
    }

    function getDataFiltered(amount, category,){
        //https://opentdb.com/api.php?amount=10&category=24&difficulty=medium&type=multiple
      //return $http.get("http://official-joke-api.appspot.com/jokes/ten")
const url="https://opentdb.com/api.php?amount="+amount+"&category="+category+"&difficulty=medium&type=multiple"
console.log(url);     
return $http.get(url)
      .then(complete)
      .catch(failed);

    }

    function getData(){

      return $http.get("https://opentdb.com/api.php?amount=20&category=24&difficulty=medium&type=multiple")
      .then(complete)
      .catch(failed);

    }
    function complete(response){
        console.log("return ing response");
        return response;
    }
    function failed(error){
        console.log("return ing response");
        return error;
    }


}