import apiCall from './apiRequest';
import endPoints from './endpoints';


export function loginUser({payload}) {
  return apiCall({
    endpoint: endPoints.login,
    payload,
    method: 'post',
  });
}


export default {
  loginUser,
};