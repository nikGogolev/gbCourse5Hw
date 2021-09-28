import * as newsSaga from '../newsSaga';

import { combine, store } from '../../store';
import initialState from '../../initialState';

import { put, call, take } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

const{fetchData, onGetNewsWithSaga} = newsSaga;



describe('', () => {
    it('', async () => {
        fetchMock.mockOnce(JSON.stringify({news:'123'}));
        const gen = onGetNewsWithSaga();

        const result = await gen.next();
        expect(result.value.payload.action).toEqual({ type: 'NEWS::GET_NEWS_REQUEST' });
        
        const result1 = await gen.next().value.payload;
        //const data = await result1.fn(result1.args[0]);
        console.log(result1);
        expect(result.value.payload.action).toEqual({ type: 'NEWS::GET_NEWS_REQUEST' });
        
        const result2 = await gen.next();
        console.log(result2.value);
        expect(result.value.payload.action).toEqual({ type: 'NEWS::GET_NEWS_REQUEST' });
    });
});