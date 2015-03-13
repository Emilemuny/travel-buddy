'use strict';

angular.module('travel-buddy')
  .factory('User', ['$http', function($http) {
    function find() {
      return $http.get('/users');
    }

    function show(userId){
      return $http.get('/users/' + userId);
    }

    return {find:find, show:show};


  }]);
