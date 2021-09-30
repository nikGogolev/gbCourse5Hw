export const GET_NEWS_REQUEST = 'NEWS::GET_NEWS_REQUEST';
export const GET_NEWS_SUCCESS = 'NEWS::GET_NEWS_SUCCESS';
export const GET_NEWS_FAILURE = 'NEWS::GET_NEWS_FAILURE';
export const GET_NEWS_WITH_SAGA = 'NEWS::GET_NEWS_WITH_SAGA';

export const getNewsRequest = () => {
    return { 
        type: GET_NEWS_REQUEST,
    };
};

export const getNewsSuccess = (news) => {
    return { 
        type: GET_NEWS_SUCCESS,
		news
    };
};


export const getNewsFailure = (errorMessage) => {
    return { 
        type: GET_NEWS_FAILURE,
		errorMessage
    };
};


export const getNewsWithSaga = () => {
    return { 
        type: GET_NEWS_WITH_SAGA,
    };
};