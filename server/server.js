import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';

import config from './app/config/config';
import api from './app/api';

const app = express();
const port = process.env.PORT || 3000;

process.env.TZ = 'Asia/Seoul';

mongoose.Promise = global.Promise;
mongoose.connect(config.url, config.options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error : '));

app.use(express.static('img'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


api(app);


app.listen(port);
console.log(`listening on port ${port}`);
