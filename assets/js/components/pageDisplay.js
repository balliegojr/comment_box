import React, { Component } from "react";
import { connect } from "react-redux";

import AuthenticatedForms from './authentication/authenticationForms'
import CommentBox from '../components/comments/commentBox'
import ComentList from './comments/commentList'
import TopContent from './comments/topContent'

import * as pageActions from '../store/actions/pageSettingsActions'
import * as commentActions from '../store/actions/commentActions'
import * as socketService from '../services/socketService'

class PageDisplay extends Component {
    componentDidMount() {
        this.props.onLoadPageSettings()
    }

    componentWillReceiveProps(props) {
        if (this.props.settings.id !== props.settings.id){
            
            const page_id = this.props.settings.id;
            socketService.leave(`page:${page_id}`);
            
            this.joinChannel(props.settings.id);
        }
    }

    componentWillUnmount() {
        delete this.channel;

        const page_id = this.props.settings.id;
        socketService.leave(`page:${page_id}`);
    }

    joinChannel(page_id) {
        this.channel = socketService.channel(`page:${page_id}`);
        this.channel.on("comment_new", payload => this.props.onAddNewComment(payload));
        this.channel.on("comment_updated", payload => this.props.onUpdateComment(payload));
    }

    render() {
        if (this.props.settings.hasError) {
            return (
                <div className="alert alert-danger text-center"> <span> Something is wrong, please contact the administrator </span></div>
            )
        }

        const commentBoxSection = this.props.user.isAuthenticated || this.props.settings.allowAnonymousComment
            ? <CommentBox />
            : <div className="text-center alert alert-info">The owner of this page disabled anonymous comments</div> 
            
        const commentsSection = this.props.user.isAuthenticated || this.props.settings.allowAnonymousView
            ? <ComentList />
            : <div>Not allowed to view comments</div>
        
        return (
            <div>
                { !this.props.user.isAuthenticated 
                    ? <AuthenticatedForms />
                    : <TopContent />
                }

                { this.props.settings.isLoading 
                    ? <div className="alert alert-info text-center"><span className="text-center"> loading ... </span> </div>
                    : <div>
                           {commentBoxSection}
                           {commentsSection}
                      </div>
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