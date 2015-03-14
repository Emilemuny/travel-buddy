'use strict';

let moment = require('moment');
let User = require('../models/user');

module.exports = {
  key: process.env.TOKEN_SECRET,
  validateFunc: function(jwt, cb) {
    //console.log('the Token is', jwt);
    let current = moment().unix();
    if(current < jwt.iat || current > jwt.exp){
      return cb();
    }
    User.findById(jwt.sub, (err, user)=>{
      if(err || !user){
        return cb();
      }
      cb(null, true, user);
    });
  }
};
