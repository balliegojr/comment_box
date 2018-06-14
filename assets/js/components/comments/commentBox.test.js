import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CommentBox } from './commentBox';

configure({adapter: new Adapter()});

describe('<CommentBox />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CommentBox pageSettings={{ commentSizeLimit: 10 }} />);
    });

    it("should handle user input", () => {
        const input = wrapper.find('textarea');
        input.simulate('change', { target: { value: 'a' } });
        expect(wrapper.state().content).toEqual('a');
        expect(wrapper.state().contentSize).toEqual(1);

        const st = 'some long input';
        for (let i = 0; i < st.length; i++) {
            input.simulate('change', { target: { value: st.substr(0, i + 1) } });
        }
        
        expect(wrapper.state().content).toEqual('some long ');
        expect(wrapper.state().contentSize).toEqual(10);
    });

    it("should show the content size", () => {
        wrapper.find('textarea').simulate('change', { target: { value: "content" } });
        expect(wrapper.find('span.control-label').text()).toEqual(" 7/10 ")
    });

    it("should handle saveComment", (done) => {
        wrapper.find('textarea').simulate('change', { target: { value: "content" } });
        
        wrapper.setProps({onSaveComment: (comment) => { 
            expect(comment.content).toEqual("content");
            return Promise.resolve();
        }});
        
        wrapper.find('button').simulate('click');
        setImmediate(() => {
            expect(wrapper.state()).toEqual({ content: "", contentSize: 0});
            expect.assertions(2);
            done();
        });
    });

    it("should show a warning when saveComment fails", (done) => {
        wrapper.find('textarea').simulate('change', { target: { value: "content" } });

        wrapper.setProps({
            onSaveComment: (comment) => {
                return Promise.reject();
            },
            notifiable: {
                error: (message) => expect(message).toEqual("Oops, something went wrong")
            }
        });

        wrapper.find('button').simulate('click');
        setImmediate(() => {
            expect(wrapper.state()).toEqual({ content: "content", contentSize: 7 });
            
            expect.assertions(2);
            done();
        });
    });
});
