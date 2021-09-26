import { put } from 'redux-saga/effects';

import { setProfileName } from '../actions/setProfileName';
import { ref, set } from '@firebase/database';
import { auth, db } from '../../services/firebase';

export const onSetProfileNameWithSaga = function* (action) {
    try {
        yield put(setProfileName(action.name));
        yield set(ref(db, `profile/${auth.currentUser.uid}`), {
            username: action.name
        });
    } catch (err) {
        yield console.log(err.message);
    }
}