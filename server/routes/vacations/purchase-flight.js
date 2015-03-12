'use strict';

let Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request, reply){
    Vacation.findById(request.params.vacationId, (err,vaca)=>{
      vaca.purchase(request.payload, (err, charge)=>{
        console.log('the charge', charge);
        reply();
      });
    });
  }
};
