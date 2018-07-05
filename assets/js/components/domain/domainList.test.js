import React from 'react';
import { Link } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DomainList, CopyKey } from './domainList';
import newDomainForm from './newDomainForm';

import * as pagination from '../../store/reducers/paginationReducer';
import Switcher from '../pagination/switcher';

configure({adapter: new Adapter()});

describe('<DomainList />', () => {
    let wrapper;
    let doLoadDomains;
    beforeEach(() => {
        doLoadDomains = jest.fn();
        
        wrapper = shallow(<DomainList domains={{ pagination: pagination.set_content(pagination.build_state(10), [{ id: 0 }])}} doLoadDomains={doLoadDomains} />)
    });

    it('should call doLoadDomains', () => {
        expect(doLoadDomains).toHaveBeenCalled();
    });

    it('should render a <Switcher />', () => {
        expect(wrapper.find(Switcher)).toHaveLength(1);
    });

    it('should render nothing when still loading', () => {
        wrapper.setProps({ domains: { fetching: true }});
        expect(wrapper.contains(<div></div>)).toBeTruthy();
    });

    it('should render an empty content message', () => {
        wrapper.setProps({ domains: { pagination: { current: [] } } });
        expect(wrapper.contains(<div className="alert alert-info text-center">There are no domains to show</div>)).toBeTruthy();
    });

    it('should render <DomainRow /> for each domain', () => {
        const domain = {
            id: 1,
            address: 'some address',
            app_key: 'some key'
        }
        wrapper.setProps( { domains: { pagination: pagination.set_content(pagination.build_state(10), [domain, { id: 2 }]) }});

        expect(wrapper.find('tbody').children()).toHaveLength(2);
        const row = wrapper.find('tbody').children().first().dive();
        
        expect(row.find('td').at(0).text()).toEqual(' some address ');
        expect(row.find('td').at(1).text()).toEqual(' some key ');
        
        expect(row.find('small')).toHaveLength(1);
        expect(row.find('a').first().text()).toEqual(' Copy Key ');
        expect(row.contains(<Link to='/domains/1'> Edit </Link>)).toBeTruthy();
    });

    it('should render delete button if there is more than 1 domain', () => {
        wrapper.setProps({ domains: { pagination: pagination.set_content(pagination.build_state(10), [{ id: 1 }]) }});

        expect(wrapper.find('tbody').children()).toHaveLength(1);
        expect(wrapper.find('tbody').children().first().dive().find('small span a')).toHaveLength(0);
        
        wrapper.setProps({ domains: { pagination: pagination.set_content(pagination.build_state(10), [{ id: 1 }, { id: 2}])}});
        expect(wrapper.find('tbody').children().first().dive().find('small span a')).toHaveLength(1);
    });

    it('should handle delete click', ()=> {
        const doDeleteDomain = jest.fn();
        wrapper.setProps({ domains: { pagination: pagination.set_content(pagination.build_state(10), [{ id: 1 }, { id: 2 }])}, doDeleteDomain });

        wrapper.find('tbody').children().first().dive().find('small span a').simulate('click');
        expect(doDeleteDomain).toHaveBeenCalledWith(1);

    });

    it('should handle copy key click', () => {
        const info = jest.fn();
        wrapper.setProps({ domains: { pagination: pagination.set_content(pagination.build_state(10), [{ id: 1, app_key: "key" }])}, notifiable: { info }});

        wrapper.find('tbody').children().first().dive().find('small a').simulate('click');
        expect(info).toHaveBeenCalledWith(<CopyKey appKey="key" />);
    });

    it('should render <newDomainForm />', ()=>{
        expect(wrapper.find(newDomainForm)).toHaveLength(0);
        wrapper.find('a').simulate('click');
        expect(wrapper.find(newDomainForm)).toHaveLength(1);
    });
});