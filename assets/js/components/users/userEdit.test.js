import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserEdit } from './userEdit';

configure({adapter: new Adapter()});

describe('<UserEdit />', () => {
    let wrapper;
    let doSetEditingUser;

    beforeEach(() => {
        doSetEditingUser = jest.fn();
        wrapper = shallow(<UserEdit doSetEditingUser={doSetEditingUser} match={{ params: { id: 1}}} user={{ roles:[]}} />);
    });

    it('should call doSetEditingUser', () => {
        expect(doSetEditingUser).toHaveBeenCalledWith(1);
    });

    it('should set state when receive props', () => {
        expect(wrapper.state()).toEqual({ user_roles: [], account_status: 0, name: ''});
        wrapper.setProps({ user: { name: 'user name', account_status: 1, roles: [{ name: 'Admin'}]}});
        
        expect(wrapper.state()).toEqual({ user_roles: ["Admin"], account_status: 1, name: 'user name'});
    });

    it('should handle cancel click', () => {
        const goBack = jest.fn();
        wrapper.setProps({ history: { goBack }});

        wrapper.find('button').first().simulate('click');
        expect(goBack).toHaveBeenCalled();
    });

    it('should prepare roles and call doSaveUser', (done) => {
        expect.assertions(2);

        const goBack = jest.fn();
        const doSaveUser = jest.fn();
        doSaveUser.mockReturnValue(Promise.resolve());

        wrapper.setProps({ user: { id:2, name: '', roles: [{ name: 'Owner' }]}, doSaveUser, history: { goBack }});
        wrapper.setState({ user_roles: ['Admin']});

        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        setImmediate(() => {
            expect(goBack).toHaveBeenCalled();
            expect(doSaveUser).toHaveBeenCalledWith({ account_status: 0, id: 2, name: '', roles: [{name: 'Admin', add: true}, { name: 'Owner', remove: true}]});
            
            done();
        });
    });

    it('should prepare show error message', (done) => {
        expect.assertions(2);

        const goBack = jest.fn();
        const doSaveUser = jest.fn();
        const error = jest.fn();

        doSaveUser.mockReturnValue(Promise.reject());

        wrapper.setProps({ doSaveUser, history: { goBack }, notifiable: { error } });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        setImmediate(() => {
            expect(goBack).not.toHaveBeenCalled();
            expect(error).toHaveBeenCalled();

            done();
        });
    });

});
