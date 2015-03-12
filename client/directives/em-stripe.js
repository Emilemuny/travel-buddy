'use strict';

angular.module('travel-buddy')
  .directive('emStripe', [()=>{
    var o = {};

    o.restrict = 'A';
    o.templateUrl = '/directives/em-stripe.html';
    o.scope = {
    cost: '=',
    title: '='
    };
    o.link = function(scope, element, attrs){};
    o.controller = ['$scope', ($scope)=>{

      let handler = StripeCheckout.configure({
    key: 'pk_test_JGEKrKiQpasBibRuFHFbQ0KK',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    token: function(token) {
    //  console.log('token', token);
    
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
