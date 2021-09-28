import { initProfileName } from '../actions/initProfileName';
import { ref, set, onValue } from '@firebase/database';
import { auth, db } from '../../services/firebase';
import { store } from '../store';

export const onSetProfileNameWithSaga = function* (action) {
    try {
		const profileName = ref(db, `profile/${auth.currentUser.uid}`);
        yield set(profileName, {
            username: action.name
        });
    } catch (err) {
        yield console.log(err.message);
    }
};

export const onInitProfileNameWithSaga = function*(){
	try {
		const profileName = ref(db, `profile/${auth.currentUser.uid}/username`);
		yield onValue(profileName, (snapshot) => {
            const data = snapshot.val();
            store.dispatch(initProfileName(data || ''));
        });
    } catch (err) {
        yield console.log(err.message);
    }
};