import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SigninForm } from './signinForm';

configure({ adapter: new Adapter() });

describe('<SigninForm />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SigninForm />);
    });

    it('should call doSignin', (done) => {
        wrapper.setState({ username: "username", password: "123"})
        wrapper.setProps({ doSignin: (info) => {
            expect(info).toEqual({username: "username", password: "123"});
            return Promise.resolve();
        }});

        wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});
        setImmediate(() => {
            expect.assertions(1);
            done();
        });
    });

    it('should call doSignin and show error message', (done) => {
        wrapper.setProps({
            doSignin: () => Promise.reject({ error: "error message"})
        });

        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        setImmediate(() => {
            expect(wrapper.state().error_message).toEqual('error message');
            done();
        });
    });
    
});