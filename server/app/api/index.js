import express from 'express';
import path from 'path';

import User from './user';
import City from './city';
import Result from './result';

export default (app) => {

    app.use("/api/user", User);
    app.use("/api/city", City);
    app.use("/api/result", Result);
    app.route("*").get((req, res) => {
        res.status(200).send({
            message : "Server Started"
        })
    });
};
