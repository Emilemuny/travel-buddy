'use strict';
var Vacation = require('../../models/vacation');
let Joi = require('joi');


module.exports = {
  validate: {
    payload: {
      title: Joi.string().required(),
      departureDate: Joi.date().required(),
      arrivalDate: Joi.date().required(),
      departureAirport: Joi.string().length(3),
      arrivalAirport: Joi.string().length(3)
    }
  },

  handler: function(request, reply){
  //  console.log('user', request.auth.credentials);
    request.payload.userId = request.auth.credentials._id;
    let vacation = new Vacation(request.payload);
    vacation.save(function(){
      reply({vacation:vacation});
    });



  }
};
