export const PROFILE_NAME = 'PROFILE::NAME'
export const SET_PROFILE_NAME_WITH_SAGA = 'PROFILE::SET_PROFILE_NAME_WITH_SAGA'

export const setProfileName = (value) => {
    return {
        type: PROFILE_NAME,
        name: value
    };
}

export const setProfileNameWithSaga = (value) => {
    return {
        type: SET_PROFILE_NAME_WITH_SAGA,
        name: value
    };
}