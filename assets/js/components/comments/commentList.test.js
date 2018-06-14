import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CommentList } from "./commentList";
import Comment from "./comment";

configure({adapter: new Adapter()});

describe("<CommentList />", () => {
    let wrapper;
    let onLoadComments = jest.fn();
    
    beforeEach(() => {
        wrapper = shallow(<CommentList comments={{ loadedComments: []}} onLoadComments={onLoadComments} />);
    });

    it("should load comments upon mount", () => {
        expect(onLoadComments).toHaveBeenCalled();
    });

    it("should render a message when there is no comment", () => {
        expect(wrapper.find(".comments").text()).toEqual("There are no comments yet");
    });

    it("should render a list of <Comment />", () => {
        wrapper.setProps({ comments: { loadedComments: [{ id: 1 }] }});
        expect(wrapper.find(Comment)).toHaveLength(1);
        expect(wrapper.find(Comment).key()).toEqual("1");
        expect(wrapper.find("span").text()).toEqual(" Comments: 1");
    });
});
