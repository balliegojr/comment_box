import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Link, NavLink } from 'react-router-dom';

import { AdminHeader } from './header';
import { Role } from '../authorization';

configure({adapter: new Adapter()});

describe('<AdminHeader />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<AdminHeader user={{}} />);
    });

    it('should render userMenu only when user is authenticated', () => {
        expect(wrapper.find('.dropdown')).toHaveLength(0);
        wrapper.setProps({ user: { isAuthenticated: true, current: {}}});
        expect(wrapper.find('.dropdown')).toHaveLength(1);

        expect(wrapper.contains(<NavLink to="/account" activeClassName="active"> Account </NavLink>)).toBeTruthy();
    });

    it('should call doSignOut in userMenu', () => {
        const doSignOut = jest.fn();
        wrapper.setProps({ user: { isAuthenticated: true, current: {} }, doSignOut});
        
        const signoutLink = wrapper.find('.dropdown-menu a');
        expect(signoutLink.text()).toEqual('Log out');
        signoutLink.simulate('click');

        expect(doSignOut).toHaveBeenCalled();
    });

    it('should render <Role /> sectors ', () => {
        const adminSection = wrapper.find(Role).filterWhere(r => r.props().roles.indexOf("Admin") > -1);
        const ownerSection = wrapper.find(Role).filterWhere(r => r.props().roles.indexOf("Owner") > -1);
        const moderatorSection = wrapper.find(Role).filterWhere(r => r.props().roles.indexOf("Moderator") > -1);
        
        
        expect(adminSection.children()).toHaveLength(1);
        expect(adminSection.contains(<NavLink to="/users" activeClassName="active"> Users </NavLink>)).toBeTruthy();
       
        expect(ownerSection.children()).toHaveLength(1);
        expect(ownerSection.contains(<NavLink to="/domains" activeClassName="active"> Domains </NavLink>)).toBeTruthy();
        
        expect(moderatorSection.children()).toHaveLength(1);
        expect(moderatorSection.contains(<NavLink to="/domains" activeClassName="active"> Domains </NavLink>)).toBeTruthy();
    });
 });