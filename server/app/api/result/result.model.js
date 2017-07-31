'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import moment from 'moment';

let ResultSchema = new Schema({

    email : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    contenttypeid : {
        type : String,
        required : true,
    },
    mapx : {
        type : Number,
        required : true,
    },
    mapy : {
        type : Number,
        required : true,
    },
    addr1 : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : function(){return moment().add(9, 'hour');},
    },
    firstimage : {
        type : String,
        required : true,
    },
    firstimage2 : {
        type : String,
        required : true,
    },
});


export default mongoose.model('Result', ResultSchema);
