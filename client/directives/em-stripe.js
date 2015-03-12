/* global StripeCheckout:true */

'use strict';

angular.module('travel-buddy')
  .directive('emStripe', [()=>{
    var o = {};

    o.restrict = 'A';
    o.templateUrl = '/directives/em-stripe.html';
    o.scope = {
      vacationId: '=',
      cost: '=',
      title: '=',
      itinerary: '='
    };
    o.controller = ['$scope', 'Vacation', ($scope, Vacation)=>{
      let handler = StripeCheckout.configure({
          key: 'pk_test_JGEKrKiQpasBibRuFHFbQ0KK',
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          token: function(token) {
    //  console.log('token', token);
           let info = {};
           info.token = token.id;
           info.cost = $scope.cost * 100;
           info.description = $scope.title;
           info.itinerary = $scope.itinerary;


           Vacation.purchaseFlight($scope.vacationId, info);
    }
  });
  $scope.purchase = function() {
    handler.open({
      name: 'Travel Buddy',
      description: $scope.title,
      amount: $scope.cost * 100
    });
  };

    }];

  return o;
  }]);
