/* jshint camelcase:false */

'use strict';

let mongoose = require('mongoose');
let Request = require('request');
let qs = require('querystring');
let jwt = require('jwt-simple');
let moment = require('moment');
let UserL;

let userSchema = mongoose.Schema({
    displayName: String,
    photoUrl: String,
    github: String,
    createdAt: {type: Date, default: Date.now, required: true}
});

userSchema.statics.linkedin = function(payload, cb) {
  let accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
  let userApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirect_uri: payload.redirectUri,
    client_secret: process.env.LINKEDIN_SECRET,
    grant_type: 'authorization_code'

  };
  Request.post(accessTokenUrl, {form: params, json:true}, (err, response, accessToken)=>{
    params = {
      oauth2_access_token: accessToken.access_token,
      format: 'json'
    }

    Request.get({url:userApiUrl, qs:params, json:true}, (err, response, profile)=>{
      console.log('*****Profileinfo:', profile);
      cb({linkedin:profile.id, displayName: `${profile.firstName} ${profile.lastName}`, photoUrl: profile.pictureUrl});
    });
  });
};

userSchema.statics.create = function(provider, profile, cb) {
  let query = {};
  query[provider] = profile[provider];
  UserL.findOne(query, (err, user)=>{
    if(user) {return cb(err, user);}

    let u = new UserL(profile);
    u.save(cb);
  });
};

userSchema.methods.token = function() {
  let payload = {
    sub: this._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  return jwt.encode(payload, process.env.LINKEDINTOKEN_SECRET);
};


UserL = mongoose.model('UserL', userSchema);
module.exports = UserL;
