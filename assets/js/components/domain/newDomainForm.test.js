import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { NewDomainForm } from './newDomainForm';

configure({adapter: new Adapter()});

describe('<NewDomainForm />', ()=> {
    let wrapper;
    let onHideForm;
    beforeEach(() => {
        onHideForm = jest.fn();
        wrapper = shallow(<NewDomainForm onHideForm={onHideForm} />);
    });

    it('should handle cancel click', () => {
        wrapper.find('button').first().simulate('click');
        expect(onHideForm).toHaveBeenCalled();
    });

    it('should call doAddNewDomain', (done) => {
        expect.assertions(2);
        
        const doAddNewDomain = jest.fn();
        doAddNewDomain.mockReturnValue(Promise.resolve());

        wrapper.setState({ domain: 'domain'});
        wrapper.setProps({ doAddNewDomain });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});

        expect(doAddNewDomain).toHaveBeenCalledWith({ address: 'domain'});
        setImmediate(() => {
            expect(onHideForm).toHaveBeenCalled();
            done();
        });
    });

    it('should show error message', (done) => {
        expect.assertions(1);

        const doAddNewDomain = jest.fn();
        const error = jest.fn();
        doAddNewDomain.mockReturnValue(Promise.reject());

        wrapper.setProps({ doAddNewDomain, notifiable: { error: error} });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        setImmediate(() => {
            expect(error).toHaveBeenCalled();
            done();
        });
    });
});
