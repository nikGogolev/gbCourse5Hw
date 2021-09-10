import PROFILE_CHECKBOX from '../actions/profileCheckbox'

function profileCheckbox(state = false, action) {
    switch(action.type) {
        case PROFILE_CHECKBOX: return action.profileCheckbox;
        
        default: return state;
    }
}

export default profileCheckbox;