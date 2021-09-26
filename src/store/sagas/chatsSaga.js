import { db } from '../../services/firebase';
import { ref, onValue, set, remove } from '@firebase/database';

import { initChats } from '../actions/initChats';
import { store } from '../store';

export const onInitChatsWithSaga = function* () {
    try {
        const chats = yield ref(db, `chats`);
        yield onValue(chats, (snapshot) => {
            const data = snapshot.val();
            store.dispatch(initChats(data || {}));
        });
    } catch (err) {
        console.log(err.message);
    }

}

export const onAddChatWithSaga = function* (action) {
    try {
        const newChatId = yield `chatId${+new Date()}`;
        const newChat = yield ref(db, `chats/${newChatId}`);
        yield set(newChat, {
            name: action.chatName, id: newChatId, messages: ''
        });
    } catch (err) {
        console.log(err);
    };
}

export const onRemoveChatWithSaga = function* (action) {
    try {
        const chatId = yield ref(db, `chats/${action.chatId}`);
        yield remove(chatId);
    } catch (err) {
        console.log(err);
    }
}
