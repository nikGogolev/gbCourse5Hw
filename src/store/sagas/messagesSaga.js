import { URL_WEATHER } from '../../utils/constants';

import { ref, update, remove } from '@firebase/database';
import { db } from '../../services/firebase';
import { call, delay } from '@redux-saga/core/effects';

const fetchData = (url) => fetch(url)
    .then(result => {
        if (!result.ok) throw Error(result.status + ' ' + result.statusText);
        return result.json();
    })
    .then(data => data)
    .catch(err => {
        throw err;
    });

export const onAddMessageWithSaga = function* (action) {
    try {
        const newMessageId = yield `message-${+new Date()}`;
        const message = yield ref(db, `chats/${action.chatId}/messages/${newMessageId}`);
        yield update(message, { id: newMessageId, header: action.messageTheme, text: action.messageText, author: action.messageAuthor });
        if (action.messageAuthor !== 'Bot' && action.chatName === 'Bot') {
            try {
                yield delay(2000);
                const weatherData = yield call(fetchData, URL_WEATHER);
                const newBotMessageId = yield `message-${+new Date()}`;
                const botMessage = yield ref(db, `chats/${action.chatId}/messages/${newBotMessageId}`);
                yield update(botMessage, { id: newBotMessageId, header: 'Погода', text: `Погода в Питере ${weatherData.clouds.all > 50 ? "облачная" : "безоблачная"}\nТемпература ${(weatherData.main.temp - 273).toFixed(1)} °C\nВлажность ${weatherData.main.humidity} %\nСкорость ветра ${weatherData.wind.speed} м/с`, author: 'Bot' });
            } catch (err) {
                console.log(err.message);
            }
        }
    } catch (err) {
        console.log(err)
    };
};

export const onRemoveMessageWithSaga = function* (action) {
    try {
        const message = yield ref(db, `chats/${action.chatId}/messages/${action.messageId}`);
        yield remove(message);
    } catch (err) {
        console.log(err);
    };
};