'use strict';

angular.module('travel-buddy')
  .controller('VacationsShowCtrl', ['$scope', '$state', 'Vacation', function($scope, $state, Vacation) {

    Vacation.show($state.params.vacationId).then(function(response) {
      $scope.vacation = response.data.vacation;
      console.log('***Vac^^^^&^ation', $scope.vacation);
    });

  }]);
