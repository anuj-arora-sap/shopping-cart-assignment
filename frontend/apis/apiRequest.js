import superagent from 'superagent';
import getConfig from 'next/config';
import { getReduxStoreRef } from '../helpers/reduxStore';
// import { API_ERROR_INVALID_TOKEN } from '../redux/middlewares/constants';
import version from './apiVersion';

const { publicRuntimeConfig } = getConfig();

export default function apiRequest({
  method = 'get',
  url,
  endpoint,
  payload,
  query,
  token,
  responseType,
  apiVersion = version.v1,
  type = 'application/json',
}) {
  const { api } = publicRuntimeConfig;
  const _url = url || `${api.baseUrl}${apiVersion}/${endpoint}`;
  const reduxStoreRef = getReduxStoreRef();
  const { login: { info } } = reduxStoreRef.getState();
  const _token = token || (info && info.token);

  const _apiRequest = superagent(method, _url);

  if (_token) {
    _apiRequest.set('Authorization', `${_token}`);
  }

  return (
    new Promise((resolve, reject) => {
      _apiRequest
        .set('Content-Type', type)
        .send(payload)
        .query(query)
        .then(resolve)
        .catch((error) => {
          const errorBody = (error.response && error.response.body) || {};
            reject(errorBody);
        });
    })
  );
}