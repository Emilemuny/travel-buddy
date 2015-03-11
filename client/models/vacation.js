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
      return $http.get('/vacations/' + vacationId);
    }


    return {create:create, find:find, show:show};
  }]);
