import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Comment from './comment';
configure({adapter: new Adapter()});

describe('<Comment />', () => {
    var wrapper;
    var comment;
    beforeEach(() => {
        comment = {
            content: "some text content"
        }
        wrapper = shallow(<Comment comment={comment}/>);
    });

    it('should render comment content', () => {
        expect(wrapper.find("pre").text()).toEqual("some text content");
    });

    it('should render Anonymmous if there is no author', () => {
        expect(wrapper.find("small b").text()).toEqual("Anonymous");
    });

    it('should render user name', () => {
        wrapper.setProps({ comment: { user: { username: "user name"}}});
        expect(wrapper.find("small b").text()).toEqual("user name");

    });

    it('should render class polarity if confidend is > 0.6', () => {
        expect(wrapper.find(".comment.positive")).toHaveLength(0);
        
        wrapper.setProps({ comment: { polarity: "positive", polarity_confidence: 0.8}});
        expect(wrapper.find(".comment.positive")).toHaveLength(1);
    });
    
});