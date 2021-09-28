export const PROFILE_CHECKBOX = 'PROFILE::CHECKBOX';

export const toggleProfileCheckbox = (value) => {
    return { 
        type: PROFILE_CHECKBOX,
        checkboxState: value
    };
};