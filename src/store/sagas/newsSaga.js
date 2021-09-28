import { put, call } from 'redux-saga/effects';

import { getNewsRequest, getNewsSuccess, getNewsFailure } from '../actions/getNews';
import { URL_NEWS } from '../../utils/constants';

export const fetchData = (url) => fetch(url)
    .then(result => {
        if (!result.ok) throw Error(result.status + ' ' + result.statusText);
        return result.json();
    })
    .then(data => data)
    .catch(err => {
        throw err;
    });

export const onGetNewsWithSaga = function* (action) {
    try {
        yield put(getNewsRequest());
        const news = yield call(fetchData, URL_NEWS);
        yield put(getNewsSuccess(news.news));
    } catch (err) {
        yield put(getNewsFailure(err.message));
    }
};