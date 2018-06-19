import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DomainRow, DomainList, CopyKey } from './domainList';
import newDomainForm from './newDomainForm';

configure({adapter: new Adapter()});

describe('<DomainList />', () => {
    let wrapper;
    let doLoadDomains;
    beforeEach(() => {
        doLoadDomains = jest.fn();
        wrapper = shallow(<DomainList domains={[]} doLoadDomains={doLoadDomains} />)
    });

    it('should call doLoadDomains', () => {
        expect(doLoadDomains).toHaveBeenCalled();
    });

    it('should render <DomainRow /> for each domain', () => {
        wrapper.setProps({ domains: [{ id: 1}, {id:2}]});

        expect(wrapper.find('tbody').children()).toHaveLength(2);
        expect(wrapper.find('tbody').children().first().dive().find('small')).toHaveLength(1);
    });

    it('should render delete button if there is more than 1 domain', () => {
        wrapper.setProps({ domains: [{ id: 1 }] });

        expect(wrapper.find('tbody').children()).toHaveLength(1);
        expect(wrapper.find('tbody').children().first().dive().find('small span a')).toHaveLength(0);
        
        wrapper.setProps({ domains: [{ id: 1 }, { id: 2 }] });
        expect(wrapper.find('tbody').children().first().dive().find('small span a')).toHaveLength(1);
    });

    it('should handle delete click', ()=> {
        const doDeleteDomain = jest.fn();
        wrapper.setProps({ domains: [{ id: 1 }, { id: 2 }], doDeleteDomain });

        wrapper.find('tbody').children().first().dive().find('small span a').simulate('click');
        expect(doDeleteDomain).toHaveBeenCalledWith(1);

    });

    it('should handle copy key click', () => {
        const info = jest.fn();
        wrapper.setProps({ domains: [{ id: 1, app_key: "key" }], notifiable: { info }});

        wrapper.find('tbody').children().first().dive().find('small a').simulate('click');
        expect(info).toHaveBeenCalledWith(<CopyKey appKey="key" />);
    });

    it('should render <newDomainForm />', ()=>{
        expect(wrapper.find(newDomainForm)).toHaveLength(0);
        wrapper.find('a').simulate('click');
        expect(wrapper.find(newDomainForm)).toHaveLength(1);
    });
});