import {createStore, combineReducers} from 'redux'

import initialState from './initialState'

import currentChat from './reducers/currentChat'
import profileCheckbox from './reducers/profileCheckbox'


const combine = combineReducers({profileCheckbox, currentChat});

const store = createStore(combine,initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

