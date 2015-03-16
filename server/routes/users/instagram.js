'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply){
    User.instagram(request.payload, profile=>{
      User.create('instagram', profile, (err, user)=>{
        let token = user.token();
        console.log('INSTA-Token', token);
        console.log('INSTA-User****', user);
        reply({token:token, user:user});
      });
    });
  }
};
