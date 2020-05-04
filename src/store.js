import { compose, applyMiddleware } from "redux";
import ReactDOM from 'react-dom';
import logger from "redux-logger";
import thunk from "redux-thunk";

import { createStore } from 'redux';
import  rootReducer from './reducers';



const composeEnhancers =  compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

