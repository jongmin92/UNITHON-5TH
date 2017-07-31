import types from '../actions/types';

export const areaList = (state = [], action) => {
  switch (action.type) {
    case types.SUCCESS_GET_AREA:
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const selectAreaInit = {
  mainArea: {},
  subArea: {}
};

export const selectAreaInfo = (state = selectAreaInit, action) => {
  switch (action.type) {
    case types.SELECT_AREA:
      state = { ...action.payload };
      return state;
    default:
      return state;
  }
};
