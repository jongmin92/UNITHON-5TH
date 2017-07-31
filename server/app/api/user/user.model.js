'use strict';

import crypto from 'crypto';
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

//schema 정보
let UserSchema = new Schema({

    name : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        lowercase : true,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    salt : String,
    profile : {
        type : String,
        default : 'profile/profile.jpg',
    }
});

//validation data

UserSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, 'Email cannot be blank');


UserSchema
  .path('password')
  .validate(function(password) {
    return password.length;
  }, 'Password cannot be blank');

UserSchema
  .path('email')
  .validate(function(value, respond) {
    let self = this;
    return this.constructor.findOne({ email: value }).exec()
      .then(function(user) {
        if (user) {
          if (self.id === user.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified email address is already in use.');

let validatePresenceOf = function(value) {
  return value && value.length;
};

//save 전

UserSchema
  .pre('save', function(next) {
    // Handle new/update passwords
    if (!this.isModified('password')) {
      return next();
    }

    if (!validatePresenceOf(this.password)) {
      return next(new Error('Invalid password'));
    }

    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if (saltErr) {
        return next(saltErr);
      }
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
        if (encryptErr) {
          return next(encryptErr);
        }
        this.password = hashedPassword;
        next();
      });
    });
  });


//create methods

UserSchema.methods = {
  /**
   * Authenticate - password 체크
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */

  authenticate(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, (err, pwdGen) => {
      if (err) {
        return callback(err);
      }

      if (this.password === pwdGen) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  },

  /**
   * Make salt - db에 저장
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(byteSize, callback) {
    let defaultByteSize = 16;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    if (!callback) {
      return crypto.randomBytes(byteSize).toString('base64');
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if (err) {
        callback(err);
      } else {
        callback(null, salt.toString('base64'));
      }
    });
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    if (!password || !this.salt) {
      if (!callback) {
        return null;
      } else {
        return callback('Missing password or salt');
      }
    }

    let defaultIterations = 10000;
    let defaultKeyLength = 64;
    let salt = new Buffer(this.salt, 'base64');

    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha512')
                   .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', (err, key) => {
      if (err) {
        callback(err);
      } else {
        callback(null, key.toString('base64'));
      }
    });
  }
};

export default mongoose.model('User', UserSchema);
