import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import ChatListContainer from "..";
import configureStore from 'redux-mock-store';
import AddChatForm from '..';
import ChatList from '../../ChatList';



describe('AddChatForm tests', () => {
    it('click add button', () => {
        const handleClick = jest.fn();
        const component = render(<AddChatForm handleAddChat={handleClick} classes={{ addChatForm: '' }} />);
        const button = component.getByRole('addChatBtn');
        fireEvent(button, new MouseEvent('click', { bubbles: true }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});