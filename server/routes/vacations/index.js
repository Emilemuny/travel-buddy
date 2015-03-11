'use strict';

var Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request,reply){
    Vacation.find({userId: request.auth.credentials._id}, function(err, vacations){
      console.log('****VACATIONS', vacations);

      reply({vacations:vacations});
    });
  }
};
