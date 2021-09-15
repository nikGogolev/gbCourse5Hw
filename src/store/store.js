import {createStore, combineReducers} from 'redux'

import initialState from './initialState'

import currentChat from './reducers/currentChat'
import profile from './reducers/ProfileReducer'
import chats from './reducers/ChatReducer'


const combine = combineReducers({profile, currentChat, chats});

const store = createStore(combine,initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

