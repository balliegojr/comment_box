import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom"

import { connect } from "react-redux";

import CommentBox from '../components/comments/commentBox'
import ComentList from './comments/commentList'
import *  as pageActions from '../store/actions/pageSettingsActions'

class PageDisplay extends Component {
    componentDidMount() {
        this.props.onLoadPageSettings()
    }

    render() {
        return (
            <div>
                { !this.props.settings.allowAnonymousComment ? <Route path="" component={CommentBox} /> : <div>Not allowed to comment</div> }
                <hr />
                { this.props.settings.allowAnonymousView ? <Route path="" component={ComentList} /> : <div>Not allowed to view comments</div> }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        settings: state.pageSettings
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadPageSettings: () => dispatch(pageActions.loadPageSettings())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDisplay);