import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlanChooser, { Plan } from './planChooser';


configure({ adapter: new Adapter() });

describe('<PlanChooser />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<PlanChooser />);
    });

    it('should render 3 Plans', () => {
        expect(wrapper.find(Plan)).toHaveLength(3);
    });
});