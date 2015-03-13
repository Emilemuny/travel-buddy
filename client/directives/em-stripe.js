'use strict';

angular.module('travel-buddy')
.directive('emStripe', [()=>{
  var o = {};

  o.restrict = 'A';
  o.templateUrl = '/directives/em-stripe.html';
  o.scope = {
    vacation: '=',
    cost: '=',
    description: '=',
    itinerary: '='
  };
  o.controller = ['$rootScope', '$scope', ($rootScope, $scope)=>{
    $scope.purchase = function(){
      var info = {
        vacation:$scope.vacation,
        cost:$scope.cost * 100,
        description:$scope.description,
        itinerary:$scope.itinerary
      };

      $rootScope.$broadcast('purchase', info);
    };
  }];

  return o;
}]);
