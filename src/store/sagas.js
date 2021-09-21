import { put, takeEvery, takeLatest, delay, call } from 'redux-saga/effects';

import {ADD_MESSAGE_WITH_SAGA} from './actions/addMessage';
import {addMessage} from './actions/addMessage';
import {URL_WEATHER} from '../utils/constants';

import {GET_NEWS_WITH_SAGA} from './actions/getNews';
import {getNewsRequest, getNewsSuccess, getNewsFailure} from './actions/getNews';
import {URL_NEWS} from '../utils/constants';

const fetchData = (url)=>fetch(url)
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
			const weatherData = yield call(fetchData, URL_WEATHER);
			yield put(addMessage(action.chatId, 'Погода', `Погода в Питере ${weatherData.clouds.all > 50 ? "облачная" : "безоблачная"}\nТемпература ${(weatherData.main.temp-273).toFixed(1)} °C\nВлажность ${weatherData.main.humidity} %\nСкорость ветра ${weatherData.wind.speed} м/с`, 'Bot'));
		} catch(err){
			yield put(addMessage(action.chatId, 'Ошибка', err.message, 'Bot'));
		}
	} 
}

function* onGetNewsWithSaga(action){
	try{
		yield put(getNewsRequest());
		const news = yield call(fetchData, URL_NEWS);
		yield put(getNewsSuccess(news.news));
	} catch(err){
		yield put(getNewsFailure(err.message));
	}
}

function* mySaga() {
  yield takeEvery(ADD_MESSAGE_WITH_SAGA, onAddMessageWithSaga);
  yield takeLatest(GET_NEWS_WITH_SAGA, onGetNewsWithSaga);
}

export default mySaga;