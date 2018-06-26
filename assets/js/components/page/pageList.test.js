import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PageList } from './pageList';
import { Link } from 'react-router-dom';


import * as pagination from '../../store/reducers/paginationReducer';
import Switcher from '../pagination/switcher';

configure({adapter: new Adapter()});


describe('<PageList />', () => {
    let wrapper;
    let doLoadPages;
    beforeEach(() => {
        doLoadPages = jest.fn();
        
        wrapper = shallow(<PageList pages={{ pagination: pagination.set_content(pagination.build_state(10), [{ id: 0 }]) }} doLoadPages={doLoadPages} />)
    });

    it('should call doLoadPages', () => {
        expect(doLoadPages).toHaveBeenCalled();
    });

    it('should render <PageRow /> for each page', () => {
        const page = {
            id: 1,
            domain: { address: 'someaddress' },
            url: '/someurl',
            allowComments: true,
            allowAnonymousComments: true,
            allowAnonymousView: true,
            inserted_at: new Date()
        }
        wrapper.setProps({ pages: { pagination: pagination.set_content(pagination.build_state(10), [page, { id: 2 }]) } });

        expect(wrapper.find('tbody').children()).toHaveLength(2);
        const row = wrapper.find('tbody').children().first().dive();

        expect(row.containsMatchingElement(<td>someaddress</td>)).toBeTruthy();
        expect(row.find('a[href="http://someaddress/someurl"]').text()).toEqual('/someurl');
        expect(row.find('td').filterWhere(td => td.text() === ' Yes ')).toHaveLength(3);

        expect(row.contains(<Link to='/pages/1'>edit</Link>)).toBeTruthy();
    });

    it('should render loading message', () => {
        wrapper.setProps({ pages: { fetching: true }});
        expect(wrapper.contains(<div className="alert alert-info text-center">Loading</div>)).toBeTruthy();
    });

    it('should render "no pages" message', () => {
        wrapper.setProps({ pages: { pagination: { all: [] } }});
        expect(wrapper.contains(<div className="alert alert-info text-center">There are no pages to show</div>)).toBeTruthy();
    });

    it('should render a <Switcher />', () => {
        expect(wrapper.find(Switcher)).toHaveLength(1);
    });
});