'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

let CitySchema = new Schema({

    name : {
        type : String,
        required : true,
    },
    code : {
        type : Number,
        required : true,
    },

    districts : [{
        name : String,
        code : Number,
    }],
});


export default mongoose.model('City', CitySchema);
