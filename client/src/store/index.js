import { createStore, applyMiddleware, compose } from 'redux';
import mainReducer from '../reducers/index.js';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(mainReducer, composeEnhancer(applyMiddleware(thunk)));

// const store = createStore(
//   mainReducer,
//   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(thunk)
// );

export default store;
