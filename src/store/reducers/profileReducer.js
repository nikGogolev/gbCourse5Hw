import {INIT_PROFILE_NAME} from '../actions/initProfileName';
import initialState from '../initialState';
const {profile} = initialState;

function profileReducer(state = profile, action) {
    switch(action.type) {
		case INIT_PROFILE_NAME:
			return {...state, name: action.name};
        
        default: return state;
    }
};

export default profileReducer;