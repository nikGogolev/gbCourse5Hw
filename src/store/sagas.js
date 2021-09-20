import { put, takeEvery, delay, call } from 'redux-saga/effects';

import {ADD_MESSAGE_WITH_SAGA} from './actions/addMessage';
import {addMessage} from './actions/addMessage';

const url = 'https://api.openweathermap.org/data/2.5/weather?id=498817&appid=f0694cc740867c7440b3be0552c0bf8f';

const fetchWeather = (url)=>fetch(url)
					.then(result => {
						if(!result.ok) throw Error(result.status + ' ' + result.statusText);
						return result.json();
					})
					.then(data => data)
					.catch(err => {
						throw err;
					});

function* onAddMessageWithSaga(action) {
	yield put(addMessage(action.chatId, action.messageTheme, action.messageText, action.messageAuthor));
	if (action.messageAuthor !== 'Bot') {
		try{
			yield delay(2000);
			const weatherData = yield call(fetchWeather, url);
			yield put(addMessage(action.chatId, 'Погода', `Погода в Питере ${weatherData.clouds.all > 50 ? "облачная" : "безоблачная"}\nТемпература ${(weatherData.main.temp-273).toFixed(1)} °C\nВлажность ${weatherData.main.humidity} %\nСкорость ветра ${weatherData.wind.speed} м/с`, 'Bot'));
		} catch(err){
			yield put(addMessage(action.chatId, 'Ошибка', err.message, 'Bot'));
		}
	} 
}

function* mySaga() {
  yield takeEvery(ADD_MESSAGE_WITH_SAGA, onAddMessageWithSaga);
}

export default mySaga;