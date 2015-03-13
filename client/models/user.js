'use strict';

angular.module('travel-buddy')
  .factory('User', ['$http', function($http) {
    function find() {
      return $http.get('/users');
    }

    function show(userId){
      return $http.get('/users/' + userId);
    }

    function update(userId, user){
    return $http.put(`/users/${userId}`, user);
  }

    return {find:find, show:show, update:update};


  }]);
