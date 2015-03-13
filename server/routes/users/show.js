'use strict';

let User = require('../../models/user');

module.exports = {
  handler: function(request, reply){
    User.findOne({_id:request.params.userId}, function(err, user){
     if(err){reply().code(400);}
     reply({user:user}).code(200);
    });
  }
};
