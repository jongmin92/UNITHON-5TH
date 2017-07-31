'use strict';

import City from './city.model';

function handleError(error){
    return res.status(500).send({
        message : "Fail",
        statusCode : 0,
    })
}

export function index(req, res, next){

    City.find({}, null, {sort : 'code'}).exec()
    .then((city) => {
        res.status(202).json(city);
    })
    .catch(handleError);
}

export function city(req, res, next){

    City.find({name : req.params.name}, null, {sort : 'code'}).exec()
    .then((city) => {
        res.status(202).json(city[0]);
    })
    .catch(handleError);
}

export function create(req, res, next){

    let newCity = new City(req.body);


    newCity.save()
    .then((city) => {
        res.status(202).json(city);
    })
    .catch(handleError);
}
