'use strict';

angular.module('travel-buddy')
  .controller('VacationsListCtrl', ['$scope', '$state', 'Vacation', ($scope, $state, Vacation)=>{
     Vacation.find().then(function(response) {
       console.log('***Vacation', response);
       $scope.vacations = response.data.vacations;
       console.log('***Vacation', $scope.vacations);
     });

     $scope.show = function(vacation){
      $state.go('vacations.show', {vacationId:vacation._id});
    };

}]);
