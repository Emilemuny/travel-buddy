/* jshint camelcase:false */
'use strict';

let User = require('../../models/user');

module.exports = {
  auth: false,
  handler: function(request, reply){
    if(!request.query.oauth_token || !request.query.oauth_verifier){
      User.preTwitter(url=>reply.redirect(url));
    }else{
      User.twitter(request.query, profile=>{
        User.create('twitter', profile, (err, user)=>{
          console.log('**TwitterfromSERVER');
          let token = user.token();
          console.log('***TwitterToken', token);
          reply({token:token, user:user});
        });
      });
    }
  }
};
