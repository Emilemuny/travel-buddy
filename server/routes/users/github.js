'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply) {
    User.github(request.payload, profile=>{
      User.create('github', profile, (err, user)=> {
        console.log('***user***', user);
        let token = user.token();

        console.log('***TokenGITHUBSERVER', token);
        reply({token:token, user:user});
      });
    });
  }
};
