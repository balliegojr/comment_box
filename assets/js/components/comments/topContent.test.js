import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { TopContent } from './topContent';

configure({adapter: new Adapter()});

describe("<TopContent />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<TopContent />);
    });

    it("should render username and a Sign out button", () => {
        expect(wrapper.find("a").last().text()).toEqual("Sign out");
        expect(wrapper.find("b").text()).toEqual("");

        wrapper.setProps({ user: { username: "user name"}});

        expect(wrapper.find("b").text()).toEqual("user name");
    });

    it("should call the doSignOut action", () => {
        let signOutFn = jest.fn();
        wrapper.setProps({ doSignOut: signOutFn });
        
        wrapper.find("a").last().simulate("click");
        expect(signOutFn).toHaveBeenCalled();
    })
});