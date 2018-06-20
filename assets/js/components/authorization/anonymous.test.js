import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Anonymous } from './anonymous';

configure({adapter: new Adapter()});

describe('<Anonymous />', () => {
    it('should render children content when user is not authenticated', () => {
        const wrapper = mount(
            <Anonymous user={{ isAuthenticated: false }}>
                <span>Content</span>
            </Anonymous>);
        expect(wrapper.find('span')).toHaveLength(1);
    });

    it('should not render children content when user is authenticated', () => {
        const wrapper = mount(
            <Anonymous user={{ isAuthenticated: true }}>
                <span>Content</span>
            </Anonymous>);
        expect(wrapper.find('span')).toHaveLength(0);
    });
});
