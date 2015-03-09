'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply) {
    User.github(request.payload, (err, response, profile)=>{
      console.log(`the profile is ${profile}`, profile);
      reply();
    });
  }
};
