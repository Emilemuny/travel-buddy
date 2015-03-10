'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply) {
    User.linkedin(request.payload, profile=>{
     User.create('linkedin', profile, (err, user)=> {
       console.log('***user***', user);
       console.log('***user***', profile);
       let token = user.token();
       reply({token:token, user:user, profile:profile});
     });
   });
  }
};
