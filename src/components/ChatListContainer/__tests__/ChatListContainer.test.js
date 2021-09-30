import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import ChatListContainer from "..";
import configureStore from 'redux-mock-store';
import AddChatForm from '../../AddChatForm';
import ChatList from '../../ChatList';

const mockStore = configureStore([]);
const store = mockStore({});

// jest.mock('../../AddChatForm', () => {
//     return {
//         __esModule: true,
//         A: true,
//         default: () => { return <div data-testid="AddChatForm">sdfg</div> }
//     }
// });

jest.mock('../../ChatList', () => {
    return {
        __esModule: true,
        A: true,
        default: () => { return <div data-testid="ChatList">sdfg</div> }
    }
});

const mockDispatch = jest.fn();

describe('ChatListContainer tests', () => {
    it('called actions', () => {
        const component = render(
            <Provider store={store}>
                <ChatListContainer />
            </Provider>);
        const actions = store.getActions();
        expect(actions).toEqual([{ "type": "CHATS::INIT_CHATS_WITH_SAGA" }]);
    });
});