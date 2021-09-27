import {INIT_PROFILE_NAME} from '../actions/initProfileName'
import {PROFILE_NAME} from '../actions/setProfileName'

function profileReducer(state = false, action) {
    switch(action.type) {
		case INIT_PROFILE_NAME:
			return {...state, name: action.name};
		
		case PROFILE_NAME: 
			if (!/bot/i.test(action.name)) return {...state, name: action.name, wrongName: false};
			else return {...state, wrongName: true}
        
        default: return state;
    }
}

export default profileReducer;