'use strict';

let Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request, reply) {
    Vacation.findById(request.params.vacationId, (err, vacation)=>{
      vacation.flights((err, data)=>{
        console.log('***Data', data);
        reply(data);
      });
    });
  }
};
