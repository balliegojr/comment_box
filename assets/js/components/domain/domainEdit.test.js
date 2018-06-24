import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { DomainEdit } from './domainEdit';

configure({adapter: new Adapter()});

describe('<DomainEdit />', () => {
    let wrapper;
    let doSetEditingDomain;
    beforeEach(() => {
        doSetEditingDomain = jest.fn();
        wrapper = shallow(<DomainEdit doSetEditingDomain={doSetEditingDomain} match={{params: { id: 1}}} />)
    });

    it('should call doSetEditingDomain', () => {
        expect(doSetEditingDomain).toHaveBeenCalledWith(1);
    });

    it('should set state', () => {
        expect(wrapper.state()).toEqual({});

        wrapper.setProps({ domain: { id: 1, allowComments: true, allowAnonymousComments: true, allowAnonymousView: true}});
        expect(wrapper.state()).toEqual({ allowComments: true, allowAnonymousComments: true, allowAnonymousView: true});
    });

    it('should handle cancel click', () => {
        const goBack = jest.fn();
        wrapper.setProps({ history: { goBack }, domain: {}});
        wrapper.find('button').first().simulate('click');

        expect(goBack).toHaveBeenCalled();
    });

    it('should render a loading message when no domain is loaded', () => {
        expect(wrapper.find('.alert').text()).toEqual('Loading');
        expect(wrapper.find('form')).toHaveLength(0);

        wrapper.setProps({ domain: {}});
        expect(wrapper.find('form')).toHaveLength(1);
    });

    it('should handle submit and show success notification', (done) => {
        expect.assertions(4);
        
        const doUpdateDomain = jest.fn();
        const info = jest.fn();
        const goBack = jest.fn();
        const domain = { id: 1, allowComments: true, allowAnonymousComments: true, allowAnonymousView: true};

        doUpdateDomain.mockReturnValue(Promise.resolve());

        wrapper.setProps({ domain, doUpdateDomain, notifiable: { info }, history: { goBack } });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(wrapper.state().saving).toBeTruthy();
        expect(doUpdateDomain).toHaveBeenCalledWith({ id: 1, allowComments: true, allowAnonymousComments: true, allowAnonymousView: true });
        setImmediate(() => {
            expect(info).toHaveBeenCalled();
            expect(goBack).toHaveBeenCalled();
            done();
        });
    });

    it('should handle submit and show error notification', (done) => {
        expect.assertions(3);

        const doUpdateDomain = jest.fn();
        const error = jest.fn();
        const goBack = jest.fn();
        const domain = { id: 1, allowComments: true, allowAnonymousComments: true, allowAnonymousView: true };

        doUpdateDomain.mockReturnValue(Promise.reject());

        wrapper.setProps({ domain, doUpdateDomain, notifiable: { error }, history: { goBack } });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        
        setImmediate(() => {
            expect(wrapper.state().saving).not.toBeTruthy();
            expect(error).toHaveBeenCalled();
            expect(goBack).not.toHaveBeenCalled();
            done();
        });
    });
});
