import types from './types';
import axios from 'axios';
import log from 'loglevel';
import config from '../config/config';

export function getArea() {
  return (dispatch) => {
    axios.get(`${config.apiServer}/city`)
      .then(res => {
        log.info(res);
        dispatch({
          type: types.SUCCESS_GET_AREA,
          payload: res.data
        });
      })
      .catch(err => {
        log.error(err);
        dispatch({
          type: types.FAIL_GET_AREA,
        });
      });
  };
}

export function selectArea(mainArea, subArea) {
  return {
    type: types.SELECT_AREA,
    payload: {
      mainArea, subArea
    }
  };
}
