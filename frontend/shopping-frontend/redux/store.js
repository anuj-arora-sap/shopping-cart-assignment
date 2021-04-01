import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
// import { setReduxStoreRef } from '../common/helpers/reduxStore';


export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk ];
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  // ======================================================
  // Store Instantiation
  // ======================================================
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );
//   setReduxStoreRef(store);
  return store;
};