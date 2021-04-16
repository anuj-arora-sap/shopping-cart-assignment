import { combineReducers } from 'redux';
import login from './login';
import notification from './notification';
import cart from './cart';

const combinedReducers = combineReducers({
  login,
  notification,
  cart,
});


const rootReducer = (appState, action) => {
//   let _appState = appState;
  // As one reducer can not update the key values for other reducer keys here we are handling
  // the logout before actual reducers get fired and setting the whole redux store to undefined.
//   _appState = clearReduxOnLogout(_appState, action);
  return combinedReducers(appState, action);
};

export default rootReducer;
