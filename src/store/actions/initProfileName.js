export const INIT_PROFILE_NAME = 'PROFILE::INIT_PROFILE_NAME';
export const INIT_PROFILE_NAME_WITH_SAGA = 'PROFILE::INIT_PROFILE_NAME_WITH_SAGA';

export const initProfileName = (value) => {
    return {
        type: INIT_PROFILE_NAME,
        name: value
    };
};

export const initProfileNameWithSaga = () => {
    return {
        type: INIT_PROFILE_NAME_WITH_SAGA,
    };
};