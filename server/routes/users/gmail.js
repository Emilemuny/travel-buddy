'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply) {
    User.gmail(request.payload, profile=>{
      User.create('gmail', profile, (err, user)=> {
        let token = user.token();
        reply({token:token, user:user});
      });
    });
  }
};
