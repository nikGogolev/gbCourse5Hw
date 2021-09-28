import { render } from "@testing-library/react";
import ChatList from "..";

describe ('ChatList snapsot test', () => {
    it ('matches snapsot with ChatList', () => {
        const component = render(<ChatList chats={{}}/>);
        expect(component).toMatchSnapshot();
    });
});