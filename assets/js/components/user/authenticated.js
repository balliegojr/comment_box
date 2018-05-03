import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../store/actions/userActions'

class Authenticated extends Component {
    handleSignOut() {
        this.props.doSignOut();
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <b>{this.props.user ? this.props.user.username : ""}</b>
                </div>
                <div className="col-md-6 text-right">
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
        doSignOut: () => dispatch(userActions.signout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);