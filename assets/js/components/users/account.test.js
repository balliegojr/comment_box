import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Account } from './account';

configure({adapter: new Adapter()});

describe('<Account />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Account />);
    });

    it('should set initial state',() => {
        expect(wrapper.state()).toEqual({});

        wrapper = shallow(<Account user={{ anyProp: ''}} />);
        expect(wrapper.state()).toEqual({ password:'', password_confirmation:'', current_password:'', anyProp: ''});
    });

    it('should not call doUpdateAccount', () => {
        const form = jest.fn();
        form.mockReturnValue(false);

        const doUpdateAccount = jest.fn();
        wrapper.setProps({ doUpdateAccount, validation: { form } });

        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(doUpdateAccount).not.toHaveBeenCalled();
    });

    it('should call doUpdateAccount', (done) => {
        expect.assertions(3);
        const form = jest.fn();
        form.mockReturnValue(true);

        const info = jest.fn();

        const doUpdateAccount = jest.fn();
        doUpdateAccount.mockReturnValue(Promise.resolve());
        wrapper.setProps({ doUpdateAccount, validation: { form }, notifiable: { info } });

        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(doUpdateAccount).toHaveBeenCalledWith({});
        setImmediate(() => {
            expect(wrapper.state()).toEqual({ saving: false, current_password: '', password: '', password_confirmation: '' });
            expect(info).toHaveBeenCalledWith('Account updated');
            done();
        });
    });


    it('should call set errors', (done) => {
        expect.assertions(4);
        
        const form = jest.fn();
        form.mockReturnValue(true);

        const setError = jest.fn();
        const info = jest.fn();

        const doUpdateAccount = jest.fn();
        doUpdateAccount.mockReturnValue(Promise.reject({ errors: {"field": "message"}}));

        wrapper.setProps({ doUpdateAccount, validation: { form, setError }, notifiable: { info } });

        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(doUpdateAccount).toHaveBeenCalledWith({});
        setImmediate(() => {
            expect(wrapper.state()).toEqual({ saving: false });
            expect(info).not.toHaveBeenCalled();
            expect(setError).toHaveBeenCalledWith(undefined, "field", "message");

            done();
        });
    });

    it('should handle cancel click', () => {
        const goBack = jest.fn();
        wrapper.setProps({ history: { goBack }});
        wrapper.find('button').first().simulate('click');

        expect(goBack).toHaveBeenCalled();
    });
});