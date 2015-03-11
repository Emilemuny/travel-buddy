/* jshint camelcase:false */

'use strict';

let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Request = require('request');
let qs = require('querystring');
let jwt = require('jwt-simple');
let moment = require('moment');
let User;

let userSchema = mongoose.Schema({
    email: {type: String, unique: true, lowercase: true},
    password: {type: String, select: false},
    displayName: String,
    photoUrl: String,
    github: String,
    google: String,
    linkedin: String,
    facebook: String,
    createdAt: {type: Date, default: Date.now, required: true}

});

userSchema.statics.github = function(payload, cb) {
  let accessTokenUrl = 'https://github.com/login/oauth/access_token';
  let userApiUrl = 'https://api.github.com/user';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    redirect_uri: payload.redirectUri,
    client_secret: process.env.GITHUB_SECRET

  };
  Request.get({url: accessTokenUrl, qs:params}, (err, response, accessToken)=>{
    let headers = {'User-Agent':'Satellizer'};
    accessToken = qs.parse(accessToken);
    //console.log('the access token is ${accessToken}');
    Request.get({url:userApiUrl, qs:accessToken, headers:headers, json:true}, (err, response, profile)=>{
      cb({github:profile.id, displayName: profile.name, photoUrl: profile.avatar_url});
    });
  });
};

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
  Request.post(accessTokenUrl, {form: params, json:true}, (err, response, body)=>{
   let params = {
      oauth2_access_token: body.access_token,
      format: 'json'
    };

    Request.get({url:userApiUrl, qs:params, json:true}, (err, response, profile)=>{
      cb({linkedin:profile.id, displayName: `${profile.firstName} ${profile.lastName}`, photoUrl: profile.pictureUrl});
    });
  });
};

userSchema.statics.google = function(payload, cb){
  let accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  let peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    client_secret: process.env.GOOGLE_SECRET,
    grant_type: 'authorization_code'
  };
  Request.post(accessTokenUrl, {json: true, form: params }, (err, response, token)=>{
     let accessToken = token.access_token;
     let headers = { Authorization: 'Bearer ' + accessToken };

     Request.get({url:peopleApiUrl, headers:headers, json: true }, (err, response, profile) => {
       console.log('****PROFILE-google', profile);
       cb({google:profile.sub, displayName:profile.name, photoUrl: profile.picture});
     });
  });
};

userSchema.statics.facebook = function(payload, cb) {
  let accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
  let graphApiUrl = 'https://graph.facebook.com/me';
  let params = {
    code: payload.code,
    client_id: payload.clientId,
    client_secret: process.env.FACEBOOK_SECRET,
    redirect_uri: payload.redirectUri
  };
  Request.get({url:accessTokenUrl, qs: params, json: true}, (err, response, accessToken) => {
  //  let headers = {'User-Agent': 'Satellizer'};
    accessToken = qs.parse(accessToken);

    Request.get({url:graphApiUrl, qs:accessToken, json:true}, (err, response, profile) => {
     console.log('***AccessToken**', accessToken);
      console.log('**Profile***', profile);
      let photoUrl = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
      cb({facebook:profile.id, displayName: profile.name, photoUrl: photoUrl});
    });

  });

};

userSchema.statics.create = function(provider, profile, cb) {
  let query = {};
  query[provider] = profile[provider];
  console.log('****Query', query);
  User.findOne(query, (err, user)=>{
    if(user) {return cb(err, user);}

    let u = new User(profile);
    u.save(cb);
  });
};

userSchema.methods.token = function() {
  let payload = {
    sub: this._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  return jwt.encode(payload, process.env.TOKEN_SECRET);
};

userSchema.statics.register = function(o, cb){
    let user = new User(o);
    user.password = bcrypt.hashSync(o.password, 8);
    user.save(cb);
};

userSchema.statics.authenticate = function(o, cb){
  User.findOne({email:o.email}, function(err, user){
    if (!user) {return cb(true);}

    let isGood = bcrypt.compareSync(o.password, user.password);
    if (!isGood) {return cb(true);}

    cb(null, user);
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
