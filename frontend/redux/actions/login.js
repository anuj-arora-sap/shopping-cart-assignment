import Router from 'next/router';
import {
  loginUser as loginUserApi,
//   refreshToken as refereshTokenApi,
} from '../../apis/login';
import { notify, resetNotifications } from './notification';

import {
  LOGIN_USER_START, ERROR_USER_LOGIN,
  LOGIN_USER_END, REFRESH_TOKEN_END,
  ERROR_REFRESH_TOKEN,
} from '../constants/login';

export function loginUserStart() {
  return ({ type: LOGIN_USER_START });
}

export function loginUserEnd(payload = {}) {
  return ({ type: LOGIN_USER_END, payload });
}

export function raiseErrorLoginUser() {
  return ({ type: ERROR_USER_LOGIN });
}

export function refreshTokenEnd(payload = {}) {
  return ({ type: REFRESH_TOKEN_END, payload });
}

export function raiseErrorRefreshToken() {
  return ({ type: ERROR_REFRESH_TOKEN });
}

export function loginUser(payload = {}) {
  return (dispatch) => {
    dispatch(loginUserStart());
    loginUserApi({ payload })
      .then((res = {}) => {
        dispatch(loginUserEnd(res.body.data));
        dispatch(resetNotifications());
        Router.push('/home');
      })
      .catch((error = {}) => {
        dispatch(notify(error));
        dispatch(raiseErrorLoginUser());
      });
  };
}

export function refreshToken() {
  return (dispatch, getState) => {
    const { login: { info = {} } } = getState();
    if (info.refresh_token) {
      refereshTokenApi({ refreshToken: info.refresh_token })
        .then((res = {}) => {
          dispatch(refreshTokenEnd(res.body.data));
        })
        .catch(() => {
          dispatch(raiseErrorRefreshToken());
        });
    }
  };
}