'use strict';

angular.module('travel-buddy')
  .controller('NavCtrl', ['$rootScope', '$scope', 'User', function($rootScope, $scope, User){
    $scope.logout = function(){
      User.logout().then(function(){
        delete $rootScope.email;
      });
    };
  }]);
