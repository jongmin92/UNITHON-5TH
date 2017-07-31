import types from './types';
import axios from 'axios';
import log from 'loglevel';
import config from '../config/config';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

export function tryJoin(email, username, password) {
  return (dispatch) => {
    axios.post(`${config.apiServer}/user`, {
      email, name: username, password
    }).then(res => {
      log.info(res);
      dispatch({
        type: types.SUCCESS_JOIN,
        payload: res.data
      });
      Actions.Area();
    })
      .catch(err => {
        Alert.alert('이미 가입된 이메일입니다.');
        log.warn(err);
        //log.error(err);
      });
  };
}

export function tryLogin(email, password) {
  return (dispatch) => {
    axios.post(`${config.apiServer}/user/login`, {
      email, password
    }).then(res => {
      log.info(res);
      dispatch({
        type: types.SUCCESS_LOGIN,
        payload: res.data
      });
      Actions.Area();
    })
      .catch(err => {
        //Alert.alert('이미 가입된 이메일입니다.');
        log.warn(err);
        //log.error(err);
      });
  };
}
