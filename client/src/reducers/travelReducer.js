import types from '../actions/types';

const travelOptionInit = {
  foodCount: 1,
  houseCount: 1,
  sightsCount: 1,
};

export const travelOption = (state = travelOptionInit, action) => {
  switch (action.type) {
    case types.SAVE_TRAVLE_OPTION:
      state = { ...action.payload };
      return state;
    default:
      return state;
  }
};

const selectLocationListInit = [];
export const selectLocationList = (state = selectLocationListInit, action) => {
  switch (action.type) {
    case types.SELECT_LOCATION:
      const newLocationItem = action.payload.locationItem;
      state = [...state, newLocationItem];
      return state;
    case types.CLEAR_LOCATION:
    case types.SUCCESS_POST_LOCATION:
      state = selectLocationListInit;
      return state;
    default:
      return state;
  }
};
