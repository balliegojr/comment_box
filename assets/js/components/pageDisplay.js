import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom"

import { connect } from "react-redux";

import CommentBox from '../components/comments/commentBox'
import ComentList from './comments/commentList'
import Anonymous from './user/anonymous'
import Authenticated from './user/authenticated'

import * as pageActions from '../store/actions/pageSettingsActions'
import * as commentActions from '../store/actions/commentActions'
import socket from '../socket'

console.log(Anonymous)

class PageDisplay extends Component {
    componentDidMount() {
        this.props.onLoadPageSettings()
    }

    componentWillReceiveProps(props) {
        if (this.props.settings.id !== props.settings.id){
            this.joinChannel(props.settings.id);
        }
    }

    componentWillUnmount() {
        if (this.channel) {
            this.channel.leave();
        }
    }


    joinChannel(page_id) {
        if (this.channel) {
            this.channel.leave();
        }

        this.channel = socket.channel(`page:${page_id}`);
        this.channel.on("comment_new", payload => this.props.onAddNewComment(payload));
        this.channel.on("comment_updated", payload => this.props.onUpdateComment(payload));

        this.channel.join();
    }

    render() {
        return (
            <div>
                { !this.props.user.isAuthenticated 
                    ? <Anonymous />
                    : <Authenticated />
                }
                { this.props.user.isAuthenticated || this.props.settings.allowAnonymousComment
                    ? <Route path="" component={CommentBox} /> 
                    : <div className="text-center alert alert-info">The owner of this page disabled anonymous comments</div> 
                }
                <hr />
                { this.props.user.isAuthenticated || this.props.settings.allowAnonymousView 
                    ? <Route path="" component={ComentList} /> 
                    : <div>Not allowed to view comments</div> 
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        settings: state.pageSettings,
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadPageSettings: () => dispatch(pageActions.loadPageSettings()),
        onAddNewComment: (comment) => dispatch(commentActions.appendComment(comment)),
        onUpdateComment: (comment) => dispatch(commentActions.updateComment(comment)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDisplay);