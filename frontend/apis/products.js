import apiCall from './apiRequest';
import endPoints from './endpoints';


export function fetchProducts() {
  return apiCall({
    endpoint: endPoints.products,
    method: 'get',
  });
}


export default {
    fetchProducts,
};