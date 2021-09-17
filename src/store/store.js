import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import initialState from './initialState'

import profile from './reducers/profileReducer'
import chats from './reducers/chatReducer'
import mySaga from './sagas.js'

const combine = combineReducers({profile, chats});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combine);

export const store = createStore(
	persistedReducer,
	initialState,
	composeEnhancers(applyMiddleware(sagaMiddleware)));
	
sagaMiddleware.run(mySaga);

export const persistor = persistStore(store);

