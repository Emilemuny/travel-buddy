'use strict';

angular.module('travel-buddy')
  .factory('Trip', ['$http', function($http){

    function flights(vacation) {
      return $http.post('/trips/flights', vacation);
    }
    console.log(flights);
    return {flights:flights};

  }]);
