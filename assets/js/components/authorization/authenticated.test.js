import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Authenticated } from './authenticated';

configure({ adapter: new Adapter() });

describe('<Authenticated />', () => {
    it('should render children content when user is authenticated and loaded', () => {
        const wrapper = mount(
            <Authenticated user={{ isAuthenticated: true, current: {} }}>
                <span>Content</span>
            </Authenticated>);
        expect(wrapper.find('span')).toHaveLength(1);
    });

    it('should not render children content if user is not authenticated nor loaded', () => {
        let wrapper = mount(
            <Authenticated user={{ isAuthenticated: true }}>
                <span>Content</span>
            </Authenticated>);
        expect(wrapper.find('span')).toHaveLength(0);


        wrapper = mount(
            <Authenticated user={{ isAuthenticated: false, current: {} }}>
                <span>Content</span>
            </Authenticated>);
        expect(wrapper.find('span')).toHaveLength(0);


        wrapper = mount(
            <Authenticated user={{ }}>
                <span>Content</span>
            </Authenticated>);
        expect(wrapper.find('span')).toHaveLength(0);
    });
});
