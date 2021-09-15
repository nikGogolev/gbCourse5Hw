import {PROFILE_CHECKBOX} from '../actions/toggleProfileCheckbox'
import {PROFILE_NAME} from '../actions/setProfileName'

function ProfileReducer(state = false, action) {
    switch(action.type) {
        case PROFILE_CHECKBOX: return {...state, checkboxState: action.checkboxState};
		
		case PROFILE_NAME: 
			if (!/bot/i.test(action.name)) return {...state, name: action.name, wrongName: false};
			else return {...state, wrongName: true}
        
        default: return state;
    }
}

export default ProfileReducer;