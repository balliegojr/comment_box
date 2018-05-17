import React, { Component } from 'react';
import { connect } from 'react-redux';


class Authenticated extends Component {
    render() {
        if (!this.props.user.isAuthenticated || !this.props.user.current) {
            return null
        }

        return this.props.children;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Authenticated)
