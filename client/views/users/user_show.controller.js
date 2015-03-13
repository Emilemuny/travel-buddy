'use strict';

angular.module('travel-buddy')
  .controller('UserShowCtrl', ['$scope','$state', 'User', function($scope, $state, User){
    User.show($state.params.userId).then(function(response){
      $scope.user = response.data.user;
    });

  }]);
