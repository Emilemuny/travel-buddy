'use strict';

let Vacation = require('../../models/vacation');

module.exports = {
  handler: function(request, reply){
    Vacation.findById(request.params.vacationId, (err,vaca)=>{
      vaca.purchase(request.payload, (err)=>{
       if (err){return reply();}
         console.log(request.payload);
        vaca.itinerary(request.payload);
        vaca.save(()=>{
          reply();
        });
      });
    });
  }
};
