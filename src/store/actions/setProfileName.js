export const SET_PROFILE_NAME_WITH_SAGA = 'PROFILE::SET_PROFILE_NAME_WITH_SAGA';

export const setProfileNameWithSaga = (value) => {
    return {
        type: SET_PROFILE_NAME_WITH_SAGA,
        name: value
    };
};