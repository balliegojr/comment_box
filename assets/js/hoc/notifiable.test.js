import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Notifiable from './notifiable';

configure({adapter: new Adapter()});

describe('Notifiable', () => {
    it('should add a notifiable property to the component', () => {
        const component = () => (<div> Test component </div>);
        const NotifiableComponent = Notifiable(component);

        const wrapper = shallow(<NotifiableComponent />);
        expect(wrapper.props().notifiable).toBeDefined();
    });
}); 