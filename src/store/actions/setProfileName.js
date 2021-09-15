export const PROFILE_NAME = 'PROFILE::NAME'

export const setProfileName = (value) => {
    return { 
        type: 'PROFILE::NAME',
        name: value
    };
}