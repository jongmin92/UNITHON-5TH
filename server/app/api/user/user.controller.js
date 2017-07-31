import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

import User from './user.model';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function loginError(res, statusCode) {
  statusCode = statusCode || 404;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}


export function create(req, res, next){

    let newUser = new User(req.body);

    newUser.save()
    .then((user) => {
        let token = jwt.sign({_id : user._id, name : user.name}, 'hodong-secret', {
            expiresIn : 60 * 60 * 5
        });
        res.json({
            token,
            name : user.name,
            email : user.email,
        });
    })
    .catch(validationError(res));
}

export function login(req, res, next){

    let {email, password } = req.body;

    User.findOne({
        email : email.toLowerCase()
    }).exec()
        .then((user) => {
            if(!user){
                return res.status(401).json({message : "not user"});
            }
            if(user.authenticate(password)){

                let token = jwt.sign({_id : user._id, name : user.name}, 'hodong-secret', {
                    expiresIn : 60 * 60 * 5
                });
                res.json({
                    token,
                    name : user.name,
                    email : user.email,
                });
            }else{
                res.json({
                    statusCode : 0,
                    message : "Login failed",
                })
            }

        })
        .catch(loginError);
}
const storage = multer.diskStorage({

    destination : (req, file, cb) => {
        cb(null, path.resolve(__dirname , '../../../img/profile'));
    },
    filename : (req, file, cb) => {
        file.uploadedFile = {
            name : req.user.name,
            ext : file.mimetype.split('/')[1]
        };

        cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
    },
});

export const upload = multer({storage,}).single('profileImage');

export function image(req, res, next){

    let newFileName = "profile/" + req.file.filename;

    User.findById({_id : req.user._id})
    .then((user) => {
        if(!user){
            return res.status(401).json({message : "Not user", statusCode : 0});
        }

        user.image = newFileName;

        user.save()
        .then((user) => {
            res.status(202).json({
                image : user.image,
            });
        })
        .catch((error) => handleError(res));
    })
    .catch(handleError(res));
}

export function me(req, res, next){

    User.findById({_id : req.user._id})
    .then((user) => {
        if(!user){
            return res.status(401).json({message : "Not user", statusCode : 0});
        }

        res.status(202).json({
            name : user.name,
            profile : user.profile,
        });
    })
    .catch(handleError(res));
}
