'use strict';

angular.module('travel-buddy')
  .controller('VacationsListCtrl', ['$scope', 'Vacation', ($scope, Vacation)=>{
     Vacation.find().then(function(response) {
       console.log('***Vacation', response);
       $scope.vacations = response.data.vacations;
       console.log('***Vacation', $scope.vacations);
     });

}]);
