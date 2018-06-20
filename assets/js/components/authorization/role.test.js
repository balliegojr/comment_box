import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Role } from './role';

configure({ adapter: new Adapter() });

describe('<Role />', () => {
    it('should render children when roles match', () => {
        const wrapper = mount(
            <Role roles={['admin']} user={{ current: { roles: [{ name: 'admin'}]} }}>
                <span>Content</span>
            </Role>);
        expect(wrapper.find('span')).toHaveLength(1);
    });

    it('should not render children when roles doesnt match', () => {
        const wrapper = mount(
            <Role roles={['owner']} user={{ current: { roles: [{ name: 'admin' }] } }}>
                <span>Content</span>
            </Role>);
        expect(wrapper.find('span')).toHaveLength(0);
    });

    it('should render children when roles and user roles are empty', () => {
        let wrapper = mount(
            <Role roles={[]} user={{ current: { roles: [] } }}>
                <span>Content</span>
            </Role>);
        expect(wrapper.find('span')).toHaveLength(1);

        wrapper = mount(
            <Role roles={[]} user={{ current: { roles: [{}] } }}>
                <span>Content</span>
            </Role>);
        expect(wrapper.find('span')).toHaveLength(0);

        wrapper = mount(
            <Role roles={['']} user={{ current: { roles: [] } }}>
                <span>Content</span>
            </Role>);
        expect(wrapper.find('span')).toHaveLength(0);
    });
});
