import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';

import { UserList } from './userList';
import * as pagination from '../../store/reducers/paginationReducer';
import Switcher from '../pagination/switcher';

configure({adapter: new Adapter()});

describe('<UserList />', () => {
    let wrapper;
    let doLoadUsers;
    beforeEach(() => {
        doLoadUsers = jest.fn();
        wrapper = shallow(<UserList doLoadUsers={doLoadUsers} users={{ pagination: pagination.set_content(pagination.build_state(10), []) }} />);
    });

    it('should call doLoadUsers', () => {
        expect(doLoadUsers).toHaveBeenCalledWith('admin');
    });

    it('should change user type and call doLoadUsers', () => {
        wrapper.find('button').at(1).simulate('click');
        expect(doLoadUsers).toHaveBeenCalledWith('owner');
        expect(wrapper.state()).toEqual({currentUserType: 'owner'});
    });

    it('should render "no users" message', () => {
        expect(wrapper.find('.alert.alert-info').text()).toEqual('There are no users to show');
    });

    it('should render a table with users information', ()=>{
        wrapper.setProps({ users: { pagination: pagination.set_content(pagination.build_state(10), [{id: 1, roles: []}, { id: 2 }]) }});

        expect(wrapper.find('tbody').children()).toHaveLength(2);
        const firstRow = wrapper.find('tbody').children().first().dive();

        expect(firstRow.contains(<Link to={'/users/1'}>edit</Link>)).toBeTruthy();
    });
});
