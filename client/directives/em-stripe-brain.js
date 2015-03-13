/* global StripeCheckout:true */

'use strict';

angular.module('travel-buddy')
.directive('emStripeBrain', [()=>{
  var o = {};

  o.restrict = 'A';
  o.templateUrl = '/directives/em-stripe-brain.html';
  o.scope = {};
  o.controller = ['$rootScope', '$scope', 'Vacation', ($rootScope, $scope, Vacation)=>{
    let data;
    let handler = StripeCheckout.configure({
        key: 'pk_test_JGEKrKiQpasBibRuFHFbQ0KK',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        token: function(token) {
          data.token = token.id;
          Vacation.purchaseFlight(data.vacation, data)
          .then(response=>{
            $rootScope.$broadcast('flight-purchased', response.data);
          });
        }
      });

    $scope.$on('purchase', (event, info)=>{
      data = info;

      handler.open({
        name: 'Travel Buddy',
        description: info.description,
        amount: info.cost
      });
    });
  }];

  return o;
}]);
