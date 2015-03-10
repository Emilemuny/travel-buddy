'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply) {
    User.github(request.payload, profile=>{
      //console.log(`the profile is ${profile}`, profile);
      User.create('github', profile, (err, user)=> {
        console.log('***user***', user);
        reply();
      });
    });
  }
};
