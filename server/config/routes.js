'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'post', path: '/auth/register', config: require('../routes/users/register')},
  {method: 'post', path: '/auth/login', config: require('../routes/users/login')},
  {method: 'get', path: '/status', config: require('../routes/users/status')},
  {method: 'delete', path: '/logout', config: require('../routes/users/logout')},
  {method: 'post', path: '/auth/github', config: require('../routes/users/github')},
  {method: 'post', path: '/auth/linkedin', config: require('../routes/users/linkedin')},
  {method: 'post', path: '/auth/facebook', config: require('../routes/users/facebook')},
  {method: 'post', path: '/auth/google', config: require('../routes/users/google')},

  {method: 'post', path: '/vacations', config: require('../routes/vacations/create')},
  {method: 'get', path: '/vacations', config: require('../routes/vacations/index')},
  {method: 'get', path: '/vacations/{vacationId}', config: require('../routes/vacations/show')},

  {method: 'get', path: '/vacations/{vacationId}/flights', config: require('../routes/vacations/flights')}
];
