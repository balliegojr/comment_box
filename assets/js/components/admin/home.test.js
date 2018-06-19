import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Link, NavLink } from 'react-router-dom';

import Home from './home';
import { Role } from '../authorization';
import PlanChooser from './planChooser';
import planForm from './planForm';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Home />);
    });

    it('should render <Role /> sectors ', () => {
        const adminSection = wrapper.find(Role).filterWhere(r => r.props().roles.indexOf("Admin") > -1);
        const ownerSection = wrapper.find(Role).filterWhere(r => r.props().roles.indexOf("Owner") > -1);
        const moderatorSection = wrapper.find(Role).filterWhere(r => r.props().roles.indexOf("Moderator") > -1);
        const anonymousSection = wrapper.find(Role).filterWhere(r => r.props().roles.length === 0);

        expect(adminSection.children()).toHaveLength(1);
        expect(ownerSection.children()).toHaveLength(1);
        expect(moderatorSection.children()).toHaveLength(1);
        
        expect(anonymousSection.children().filter(PlanChooser)).toHaveLength(1);
        expect(anonymousSection.children().filter(planForm)).toHaveLength(0);
        
        wrapper.setState({ plan: true});
        expect(wrapper.find(Role).filterWhere(r => r.props().roles.length === 0).children().filter(planForm)).toHaveLength(1);
    });
});