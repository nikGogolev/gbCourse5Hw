import * as newsSaga from '../newsSaga';

import { combine, store } from '../../store';
import initialState from '../../initialState';

import { put, call, take } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { URL_NEWS } from '../../../utils/constants';
import { getNewsFailure, getNewsRequest, getNewsSuccess } from '../../actions/getNews';

const{fetchData, onGetNewsWithSaga} = newsSaga;


// test('', () => {
//     return testSaga(onGetNewsWithSaga)
//     .next()
//     .put(getNewsRequest())
//     .next()
//     .call(fetchData, URL_NEWS);
// });
const result = {news:'123'};
it('returns good result of fetch', () => {
    return expectSaga(onGetNewsWithSaga)
    .provide([
        [call(fetchData, URL_NEWS), result]
    ])
    .put(getNewsRequest())
    .call(fetchData, URL_NEWS)
    .put(getNewsSuccess(result.news))
    .run();
});

it('returns error in fetch', () => {
    return expectSaga(onGetNewsWithSaga)
    .put(getNewsRequest())
    .call(fetchData, URL_NEWS)
    .put(getNewsFailure("Cannot read property 'then' of undefined"))
    .run();
});
