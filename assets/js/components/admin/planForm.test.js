import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PlanForm } from './planForm';


configure({ adapter: new Adapter() });

describe('<PlanForm />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<PlanForm plan={{name: ''}} />);
    });

    it('should handle submit and call doJoinPlan', () => {
        const form = jest.fn();
        form.mockReturnValue(true);
        const doJoinPlan = jest.fn();
        doJoinPlan.mockReturnValue(Promise.resolve());
        wrapper.setProps({ validation: { form }, doJoinPlan});

        wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});

        expect(form).toHaveBeenCalled();
        expect(doJoinPlan).toHaveBeenCalledWith({ plan: '', domain: ''});
    });

    it('should not call doJoinPlan if validation fails', () => {
        const form = jest.fn();
        form.mockReturnValue(false);
        const doJoinPlan = jest.fn();
        
        wrapper.setProps({ validation: { form }, doJoinPlan });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(form).toHaveBeenCalled();
        expect(doJoinPlan).not.toHaveBeenCalled();
    });

    it('should show a notification in case of error', (done) => {
        const form = jest.fn();
        form.mockReturnValue(true);
        const doJoinPlan = () => Promise.reject('error message');
        const error = jest.fn();
        wrapper.setProps({ validation: { form }, doJoinPlan, notifiable: { error } });

        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        setImmediate(() => {
            expect(error).toHaveBeenCalledWith('Oops, something went wrong');
            done();
        });
    });
});