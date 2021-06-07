import apiCall from './apiRequest';
import endPoints from './endpoints';


export function fetchOffers() {
  return apiCall({
    endpoint: endPoints.offers,
    method: 'get',
  });
}


export default {
    fetchOffers,
};