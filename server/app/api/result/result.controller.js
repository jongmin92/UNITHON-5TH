'use strict';

import Result from './result.model';

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}



export function index(req, res, next){

    Result.find({email : req.user.email}, null, {sort : '-date'}).exec()
    .then((result) => {
        res.status(202).json(result);
    })
    .catch(handleError(res));
}

export function create(req, res, next){

    let newResult = new Result(req.body);
    newResult.email = req.user.email;
    newResult.save()
    .then((result) => {
        res.status(202).json(result);
    })
    .catch(handleError(res));
}

export function insertMany(req, res, next){

    let newResult = req.body.locationList;
    console.log(newResult);
    newResult.forEach((item, index) => {
        newResult[index].email = req.user.email
    })

    Result.insertMany(newResult, (err, docs) => {

        if(err){
            handleError(res);
        }
        res.status(202).json(docs);
    });
}

export function update(req, res, next){

    Result.findById(req.params.id)
    .then((result) => {

        if(result.email == req.user.email){

            Object.assign(result, req.body).save()
            .then((result) => res.status(202).json(result))
            .catch(handleError);
        }else{
            res.status(409).json({
                message : "Not own user",
                statusCode : 0,
            })
        }
    })
    .catch(handleError(res))
}

export function destroy(req, res, next){

    let id = req.params.id;
    let email = req.user.email;

    Result.remove({
        _id : id,
        email,
    })
    .then((result) => res.status(202).json(result))
    .catch(handleError(res))
}
