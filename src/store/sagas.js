import { takeEvery, takeLatest } from 'redux-saga/effects';

import { ADD_MESSAGE_WITH_SAGA } from './actions/addMessage';
import { onAddMessageWithSaga, onRemoveMessageWithSaga } from './sagas/messagesSaga';
import { SET_PROFILE_NAME_WITH_SAGA } from './actions/setProfileName';
import { onSetProfileNameWithSaga } from './sagas/profileSaga';
import { INIT_PROFILE_NAME_WITH_SAGA } from './actions/initProfileName';
import { onInitProfileNameWithSaga } from './sagas/profileSaga';
import { GET_NEWS_WITH_SAGA } from './actions/getNews';
import { onGetNewsWithSaga } from './sagas/newsSaga';
import { INIT_CHATS_WITH_SAGA } from './actions/initChats';
import { ADD_CHAT_WITH_SAGA } from './actions/addChat';
import { onInitChatsWithSaga, onAddChatWithSaga, onRemoveChatWithSaga } from './sagas/chatsSaga';
import { REMOVE_CHAT_WITH_SAGA } from './actions/removeChat';
import { REMOVE_MESSAGE_WITH_SAGA } from './actions/removeMessage';

function* mySaga() {
	yield takeEvery(ADD_MESSAGE_WITH_SAGA, onAddMessageWithSaga);
	yield takeEvery(REMOVE_MESSAGE_WITH_SAGA, onRemoveMessageWithSaga);
	
	yield takeLatest(GET_NEWS_WITH_SAGA, onGetNewsWithSaga);
	
	yield takeLatest(SET_PROFILE_NAME_WITH_SAGA, onSetProfileNameWithSaga);
	yield takeLatest(INIT_PROFILE_NAME_WITH_SAGA, onInitProfileNameWithSaga);
	
	yield takeLatest(INIT_CHATS_WITH_SAGA, onInitChatsWithSaga);
	yield takeLatest(ADD_CHAT_WITH_SAGA, onAddChatWithSaga);
	yield takeLatest(REMOVE_CHAT_WITH_SAGA, onRemoveChatWithSaga);

};

export default mySaga;