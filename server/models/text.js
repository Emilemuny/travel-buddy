'use strict';

let twilio = require('twilio')(process.env.TWILIO_PUBLIC, process.env.TWILIO_SECRET);


class Text {
  static send(to, body, cb){
    twilio.messages.create({
    body: body,
    to: to,
    from: '+17815705173'
  }, cb);

  }
}

module.exports = Text;
