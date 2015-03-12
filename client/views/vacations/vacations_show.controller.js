'use strict';

angular.module('travel-buddy')
  .controller('VacationsShowCtrl', ['$scope', '$state', 'Vacation', function($scope, $state, Vacation) {

    Vacation.show($state.params.vacationId).then(response=>{
      $scope.vacation = response.data.vacation;
    });

    $scope.getFlights = function(vacation){
      Vacation.getFlights(vacation._id)
      .then(response=>{
        $scope.itineraries = response.data.PricedItineraries;
      });
    };

  }]);
