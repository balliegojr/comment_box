import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom"

import { connect } from "react-redux";

import { CommentBox } from '../components/comments/commentBox'
import ComentList from './comments/commentList'
import *  as pageActions from '../store/actions/pageSettingsActions'

class PageDisplay extends Component {
    componentDidMount() {
        this.props.onLoadPageSettings()
    }

    render() {
        return (
            <BrowserRouter basename="/app/">
                <div>
                    <Route path="" component={CommentBox} />
                    <Route path="" component={ComentList} />
                </div>
            </BrowserRouter>
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