'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply) {
    User.facebook(request.payload, profile=>{
      User.create('facebook', profile, (err, user)=>{
        if(err){reply().code(400);}
        console.log('####FACEBOOK####');
        let token = user.token();
        console.log('***TokenFACEBOOKserver', token);
        reply({token:token, user:user});

      });
    });
  }
};
