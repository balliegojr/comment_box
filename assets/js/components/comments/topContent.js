import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountActions } from '../../store/actions'

export class TopContent extends Component {
    handleSignOut() {
        this.props.doSignOut();
    }
    render() {
        return (
            <div className="row">
                <div className="col-xs-6">
                    <a href="/admin/account" target="_blank"><b>{this.props.user ? this.props.user.username : ""}</b></a>
                </div>
                <div className="col-xs-6 text-right">
                    <a onClick={() => this.handleSignOut()}>Sign out</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.current
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doSignOut: () => dispatch(accountActions.signout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);