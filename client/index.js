'use strict';

angular.module('travel-buddy', ['ui.router', 'ngMessages', 'satellizer'])
  .config(['$stateProvider', '$urlRouterProvider', '$authProvider', function($stateProvider, $urlRouterProvider, $authProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {url:'/', templateUrl:'/views/general/home.html'})
      .state('faq', {url:'/faq', templateUrl:'/views/general/faq.html'})
      .state('contact', {url:'/contact', templateUrl:'/views/general/contact.html'})

      .state('register', {url:'/register', templateUrl:'/views/users/users.html', controller:'UsersCtrl'})
      .state('login', {url:'/login', templateUrl:'/views/users/users.html', controller:'UsersCtrl'});

   $authProvider.github({clientId: '0f2f449e07affa7ca822'});
  }])
  .run(['$rootScope', 'User', function($rootScope, User){
    User.status().then(function(response){
      $rootScope.email = response.data.email;
    });
  }]);
