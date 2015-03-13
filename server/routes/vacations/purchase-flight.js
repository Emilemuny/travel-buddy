'use strict';

let Vacation = require('../../models/vacation');
let Txt = require('../../models/text');

module.exports = {
  handler: function(request, reply){
    Vacation.findById(request.params.vacationId, (err,vaca)=>{
      vaca.purchase(request.payload, (err)=>{
       if (err){return reply().code(400);}
         console.log(request.payload);

        vaca.itinerary(request.payload);

        Txt.send(request.auth.credentials.phone, `Congrats, you were charged $${vaca.flight.charge.amount.toFixed(2)}.`, (err,msg)=>{
          console.log('***Message', msg);
          vaca.save(()=>{
            reply(vaca);
          });
        });
      });
    });
  }
};
