import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Switcher from './switcher';

configure({adapter: new Adapter()});

describe('<Switcher />', () => {
    let wrapper;
    let setPage;
    beforeEach(() => {
        setPage = jest.fn();
        wrapper = shallow(<Switcher pagination={{ page: 10, total_pages: 30 }} setPage={setPage} />);
    });

    it('should render nothing when total pages are 1', () => {
        wrapper = shallow(<Switcher pagination={{ total_pages: 1}} />);
        expect(wrapper.find('div').exists()).toBeFalsy();
    });

    it('should render 7 buttons before and after current page', () => {
        expect(wrapper.find('button')).toHaveLength(17);

        expect(wrapper.find('button').filterWhere(btn => Number(btn.key()) < 10 )).toHaveLength(7);
        expect(wrapper.find('button').filterWhere(btn => Number(btn.key()) > 10 )).toHaveLength(7);
        
        expect(wrapper.find('button').filterWhere(btn => Number(btn.key()) === 10 )).toHaveLength(1);
    });

    it('should render goToFirst and goToLast buttons', ()=> {
        expect(wrapper.find('button').first().text()).toEqual('<<');
        expect(wrapper.find('button').last().text()).toEqual('>>');
    });

    it('should render responsivity classes', () => {
        expect(wrapper.find('button.hidden-xs')).toHaveLength(10);
        expect(wrapper.find('button.hidden-sm')).toHaveLength(4);
        expect(wrapper.find('button.btn-primary')).toHaveLength(1);
    });

    it('should call setPage function', () => {
        wrapper.find('button').at(0).simulate('click');
        expect(setPage).toHaveBeenCalledWith(1);

        wrapper.find('button').at(16).simulate('click');
        expect(setPage).toHaveBeenCalledWith(30);

        wrapper.find('button').at(8).simulate('click');
        expect(setPage).toHaveBeenCalledWith(10);

        wrapper.find('button').at(1).simulate('click');
        expect(setPage).toHaveBeenCalledWith(3);

        wrapper.find('button').at(15).simulate('click');
        expect(setPage).toHaveBeenCalledWith(17);
    });
})
