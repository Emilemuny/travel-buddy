'use strict';

angular.module('travel-buddy')
 .controller('HomepageMapCtrl', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi){

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map = { center:
                    { latitude: 45, longitude: -73 },
                   zoom: 10 };
    $scope.place = 'schools';
    console.log('***Place data', $scope.map);
    console.log('***Place data', $scope.place);

  });

}]);
