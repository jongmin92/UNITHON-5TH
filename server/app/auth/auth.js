import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

import User from '../api/user/user.model';

let validateJwt = expressJwt({
    secret : 'hodong-secret'
});

export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

export function signToken(id, name) {
  return jwt.sign({ _id: id, name : name}, 'hodong-secret', {
    expiresIn: 60 * 60 * 5
  });
}
