import types from '../actions/types';

const userInit = {
  username: '',
  email: '',
  token: '',
};

export const user = (state = userInit, action) => {
  switch (action.type) {
    case types.SUCCESS_JOIN:
      state = { ...action.payload };
      return state;
    case types.SUCCESS_LOGIN:
      state = { ...action.payload, username: action.payload.name };
      return state;
    default:
      return state;
  }
};
