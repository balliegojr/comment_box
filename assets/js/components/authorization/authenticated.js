import React, { Component } from 'react';
import { connect } from 'react-redux';


export class Authenticated extends Component {
    render() {
        if (!this.props.user.isAuthenticated) {
            return null
        }

        if (!this.props.user.current) {
            return null;
        }

        return this.props.children;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.global
    }
}

export default connect(mapStateToProps)(Authenticated)
