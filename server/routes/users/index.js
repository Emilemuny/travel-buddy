'use strict';

let User = require('../../models/user');

module.exports = {
  handler: function(request, reply){
     User.find({}, function(err, users){
       if(err){ reply().code(400);}
       console.log('***Users:', users);
       reply({users:users}).code(200);
     });
  }

};
