import { put } from 'redux-saga/effects';

import { setProfileName } from '../actions/setProfileName';
import { initProfileName } from '../actions/initProfileName';
import { ref, set, get } from '@firebase/database';
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

export const onInitProfileNameWithSaga = function*(){
	try {
        const data = yield get(ref(db, `profile/${auth.currentUser.uid}/username`), (snapshot) => {
			return snapshot.val();
		});
		const name = yield data.val();
		yield put(initProfileName(name));
    } catch (err) {
        yield console.log(err.message);
    }
}