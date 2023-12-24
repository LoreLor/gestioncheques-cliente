import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import  combineReducers  from '../reducers';
import { thunk } from 'redux-thunk';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(
    combineReducers,
    composedEnhancer
);

export default store;