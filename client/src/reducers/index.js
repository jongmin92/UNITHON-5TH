import { combineReducers } from 'redux';
import * as UserReducer from './userReducer';
import * as AreaReducer from './areaReducer';
import * as TravelReducer from './travelReducer';

export default combineReducers(Object.assign({},
  UserReducer,
  AreaReducer,
  TravelReducer,
));
