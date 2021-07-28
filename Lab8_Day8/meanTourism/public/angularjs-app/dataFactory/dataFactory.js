angular.module("meanTourism").factory("DataFactory", DataFactory);
function DataFactory($http,$routeParams) {

    return {
        getAllSites: allSites,
        getAllVisotors: allVisitors,
        getOneSite: getOneSite,
        getOneVisitor:getOneVisitor
    };
    function getOneSite() {
        const siteId = $routeParams.siteId;
        const url = "/api/sites/" + siteId;
console.log(url);
        return $http.get(url).then(complete).catch(failure);

    }
    function getOneVisitor() {
        const siteId = $routeParams.visitorId;
        const url = "/api/visitors/" + siteId;

        return $http.get(url).then(complete).catch(failure);

    }
    function allSites() {
        const url = "/api/sites";

        return $http.get(url).then(complete).catch(failure);
    }

    function allVisitors() {

        const url1 = "/api/visitors";

        return $http.get(url1).then(complete).catch(failure);
    }


    function complete(response) {
        return response;
    }
    function failure(error) {
        return error;
    }
}