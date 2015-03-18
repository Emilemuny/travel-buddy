'use strict';

angular.module('travel-buddy', ['ui.router', 'ngMessages', 'satellizer', 'uiGmapgoogle-maps', 'ngGeolocation'])
.config(['$stateProvider', '$urlRouterProvider', '$authProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $urlRouterProvider, $authProvider, uiGmapGoogleMapApiProvider){

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyBMBTI7HoN5xy3HJdQMCQpAgKYe1SwsF7o',
    v: '3.17',
    libraries: 'places'
  });

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url:'/', templateUrl:'/views/general/home.html', controller: 'HomepageMapCtrl'})
  .state('faq', {url:'/faq', templateUrl:'/views/general/faq.html'})
  .state('contact', {url:'/contact', templateUrl:'/views/general/contact.html'})

  .state('vacations', {url:'/vacations', templateUrl:'/views/vacations/vacations.html', abstract: true})
  .state('vacations.list', {url:'', templateUrl:'/views/vacations/vacations_list.html', controller:'VacationsListCtrl'})
  .state('vacations.new', {url:'/new', templateUrl:'/views/vacations/vacations_new.html', controller:'VacationsNewCtrl'})
  .state('vacations.show', {url:'/{vacationId}', templateUrl:'/views/vacations/vacations_show.html', controller:'VacationsShowCtrl'})

  .state('register', {url:'/register', templateUrl:'/views/users/users_auth.html', controller:'UsersCtrl'})
  .state('login', {url:'/login', templateUrl:'/views/users/users_auth.html', controller:'UsersCtrl'})


  .state('users', {url:'/users', templateUrl:'views/users/users.html', abstract: true})
  .state('users.list', {url: '', templateUrl:'/views/users/users_list.html', controller: 'UsersListCtrl'})
  .state('users.show', {url: '/{userId}', templateUrl:'/views/users/user_show.html', controller: 'UserShowCtrl'})
  .state('profile', {url:'/profile', templateUrl:'/views/users/profile.html', controller:'UsersProfileCtrl'});

  $authProvider.github({clientId: '0f2f449e07affa7ca822'});
  $authProvider.linkedin({clientId: '75v5gn8w2iarx8'});
  $authProvider.facebook({clientId: '1418892481739742'});
  $authProvider.google({clientId: '762244371848-ttjag02m7npn6331djjp991t19dcgk81@developer.gserviceaccount.com'});
  $authProvider.twitter({url: '/auth/twitter'});
  $authProvider.oauth2({
      name: 'instagram',
      url: 'http://localhost:3333/auth/instagram',
      redirectUri: 'http://localhost:3333',
      clientId: '84bfc810b1da4d31b678b2b528802a8d',
      requiredUrlParams: ['scope'],
      scope: ['basic'],
      scopeDelimiter: '+',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });

}])
.run(['$rootScope', '$window', '$auth', function($rootScope, $window, $auth){
  if($auth.isAuthenticated()){
    $rootScope.user = JSON.parse($window.localStorage.user);
  }
}]);
