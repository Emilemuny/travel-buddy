'use strict';

angular.module('travel-buddy')
  .controller('VacationsNewCtrl', ['$scope', 'Vacation', ($scope, Vacation)=>{
   $scope.submit = function(vacation){
    // alert(vacation);
     Vacation.create(vacation)
     .then(response=>{
       console.log('the response is', response);
       
     });
   };
  }]);
