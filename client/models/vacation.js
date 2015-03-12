'use strict';

angular.module('travel-buddy')
  .factory('Vacation', ['$http', function($http){

    function create(vacation){
      return $http.post('/vacations', vacation);
    }

    function find() {
      return $http.get('/vacations');
    }

    function show(vacationId) {
      return $http.get(`/vacations/'${vacationId}`);
    }

    function getFlights(vacationId){
      return $http.get(`/vacations/${vacationId}/flights`);
    }

    function purchaseFlight(vacationId, info){
      return $http.post(`/vacations/${vacationId}/flights/purchase`, info)
    }


    return {create:create, find:find, show:show, getFlights:getFlights};
  }]);
