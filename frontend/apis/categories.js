import apiCall from './apiRequest';
import endPoints from './endpoints';


export function fetchCategories() {
  return apiCall({
    endpoint: endPoints.categories,
    method: 'get',
  });
}


export default {
    fetchCategories,
};