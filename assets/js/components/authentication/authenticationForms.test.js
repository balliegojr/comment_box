import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AuthenticationForms from './authenticationForms';
import SigninForm from './signinForm';
import SignupForm from './signupForm';

configure({ adapter: new Adapter() });

describe('<AuthenticationForms />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<AuthenticationForms />);
    });

    it('should toggle between Signin and Signup form', () => {
        expect(wrapper.find(SigninForm)).toHaveLength(0);
        expect(wrapper.find(SignupForm)).toHaveLength(0);

        const signinBtn = wrapper.find('a').at(0);
        const signupBtn = wrapper.find('a').at(1);

        signinBtn.simulate('click');

        expect(wrapper.find(SigninForm)).toHaveLength(1);
        expect(wrapper.find(SignupForm)).toHaveLength(0);

        signupBtn.simulate('click');

        expect(wrapper.find(SigninForm)).toHaveLength(0);
        expect(wrapper.find(SignupForm)).toHaveLength(1);
    });

    
});