'use strict';

angular.module('travel-buddy')
  .controller('UsersListCtrl', ['$scope', 'User', function($scope, User) {
    User.find().then(function(response){
      $scope.users = response.data.users;
    });

  }]);
