'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply) {
    User.linkedin(request.payload, profile=>{
     User.create('linkedin', profile, (err, user)=> {
        console.log('HElloTwitter');
       let token = user.token();
       console.log('***TWITTER-TOKEN', token);
       reply({token:token, user:user});
     });
   });
  }
};
