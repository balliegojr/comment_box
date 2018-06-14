import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PageDisplay } from './pageDisplay';
import AuthenticationForms from './authentication/authenticationForms';
import TopContent from './comments/topContent'
import CommentBox from '../components/comments/commentBox'
import CommentList from './comments/commentList'


configure({adapter: new Adapter()});

describe('<PageDisplay />', () => {
    let wrapper;
    let onLoadPageSettings = jest.fn();
    beforeEach(() => {
        wrapper = shallow(<PageDisplay settings={{}} user={{}} onLoadPageSettings={onLoadPageSettings} />);
    });

    it('should load page settings', () => {
        expect(onLoadPageSettings).toHaveBeenCalled();
    });

    it('should show an error message', () => {
        wrapper.setProps({ settings: { hasError: true }});
        expect(wrapper.find('.alert.alert-danger').text()).toEqual("Something is wrong, please contact the administrator");
    });

    it('should show an loading message', () => {
        wrapper.setProps({ settings: { isLoading: true }});
        expect(wrapper.find('.alert.alert-info').text()).toEqual(' loading ...  ');
    });

    it('should render <AuthenticationForms /> when user is not authenticated', () => {
        expect(wrapper.find(AuthenticationForms)).toHaveLength(1);
        expect(wrapper.find(TopContent)).toHaveLength(0);
        
    });

    it('should render <TopContent /> when user is authenticated', () => {
        wrapper.setProps({ user: { isAuthenticated: true } });
        expect(wrapper.find(AuthenticationForms)).toHaveLength(0);
        expect(wrapper.find(TopContent)).toHaveLength(1);
    });

    it('should render <CommentBox /> when user is authenticated or settings allow', () => {
        expect(wrapper.find(CommentBox)).toHaveLength(0);
        wrapper.setProps({ user: { isAuthenticated: true}})
        expect(wrapper.find(CommentBox)).toHaveLength(1);

        wrapper.setProps({ user: { } })
        expect(wrapper.find(CommentBox)).toHaveLength(0);

        wrapper.setProps({ settings: { allowAnonymousComment: true} });
        expect(wrapper.find(CommentBox)).toHaveLength(1);
    });


    it('should render <CommentList /> when user is authenticated or settings allow', () => {
        expect(wrapper.find(CommentList)).toHaveLength(0);
        wrapper.setProps({ user: { isAuthenticated: true } })
        expect(wrapper.find(CommentList)).toHaveLength(1);

        wrapper.setProps({ user: {} })
        expect(wrapper.find(CommentList)).toHaveLength(0);

        wrapper.setProps({ settings: { allowAnonymousView: true } });
        expect(wrapper.find(CommentList)).toHaveLength(1);
    });
});