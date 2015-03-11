'use strict';

angular.module('travel-buddy')
  .factory('Vacation', ['$http', function($http){

    function create(vacation){
      return $http.post('/vacations', vacation);
    }

    function find() {
      return $http.get('/vacations');
    }


    return {create:create, find:find};
  }]);
