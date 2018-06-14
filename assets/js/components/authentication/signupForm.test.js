import React from 'react';
import { configure, shallow, mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SignUpForm } from './signupForm';

configure({ adapter: new Adapter() });

describe('<SignUpForm />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<SignUpForm />);
    });

    it('should call doSignup', (done) => {
        const form = jest.fn();
        form.mockReturnValue(true);
        
        const doSignup = (info) => {
            expect(info).toEqual({ email: "email", username: "username", password: "pass", password_confirmation: "pass"});
            return Promise.resolve();
        }

        wrapper.setState({ email: "email", username: "username", password: "pass", password_confirmation: "pass" });
        wrapper.setProps({ validation: { form: form }, doSignup});

        wrapper.find('form').simulate("submit", { preventDefault: jest.fn()});
        expect(form).toHaveBeenCalled();
        setImmediate(()=>{
            expect.assertions(2);
            done();
        });
    });

    it('should not call doSignup if validation don\'t pass', () => {
        const doSignup = jest.fn();
        const form = jest.fn();
        form.mockReturnValue(false);

        wrapper.setProps({ validation: { form: form }, doSignup });
        wrapper.find('form').simulate("submit", { preventDefault: jest.fn() });

        expect(form).toHaveBeenCalled();
        expect(doSignup).not.toHaveBeenCalled();
    });

    it('should set error messages when doSignup fails', (done) => {
        const setError = jest.fn();
        const form = () => true; 
        const doSignup = () => {
            return Promise.reject({ errors: { field: "message" }});
        }

        wrapper.setProps({ validation: { form, setError }, doSignup });
        wrapper.find('form').simulate("submit", { preventDefault: jest.fn() });
        
        setImmediate(() => {
            expect(setError).toHaveBeenCalledWith(expect.anything(), "field", "message");
            done();
        });
    });
});