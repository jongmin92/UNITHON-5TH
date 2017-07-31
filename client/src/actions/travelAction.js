import types from './types';
import axios from 'axios';
import log from 'loglevel';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

export function saveTravelOption(foodCount, houseCount, sightsCount) {
  return {
    type: types.SAVE_TRAVLE_OPTION,
    payload: {
      foodCount, houseCount, sightsCount
    }
  };
}

export function selectLocation(locationItem) {
  return {
    type: types.SELECT_LOCATION,
    payload: {
      locationItem
    }
  }
}

export function clearSelecteLocationList() {
  return {
    type: types.CLEAR_LOCATION,
    payload: {}
  }
}

export function postLocationList(locationList) {
  return (dispatch, getState) => {

    const token = getState().user.token;

    axios.post(`${config.apiServer}/result/many?access_token=${token}`, {
      locationList
    }).then(res => {
      log.info(res);
      dispatch({
        type: types.SUCCESS_POST_LOCATION,
        payload: res.data
      });
      Actions.Area({ type: 'reset' });
    })
      .catch(err => {
        Alert.alert('저장에 실패했습니다.');
        log.warn(err);
        //log.error(err);
      });
  };
}
