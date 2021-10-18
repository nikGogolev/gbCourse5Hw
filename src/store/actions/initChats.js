export const INIT_CHATS = 'CHATS::INIT_CHATS';

export const initChats = (chats) => {
    return {
        type: INIT_CHATS,
        chats
    };
};

export const INIT_CHATS_WITH_SAGA = 'CHATS::INIT_CHATS_WITH_SAGA';

export const initChatsWithSaga = () => {
    return {
        type: INIT_CHATS_WITH_SAGA,
    };
};