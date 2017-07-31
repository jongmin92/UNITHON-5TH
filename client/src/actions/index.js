import * as userAction from './userAction';
import * as areaAction from './areaAction';
import * as travelAction from './travelAction';

const ActionCreators = Object.assign({},
  userAction,
  areaAction,
  travelAction,
);

export default ActionCreators;
