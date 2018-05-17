import React, { Component } from 'react';
import { connect } from 'react-redux';


class Role extends Component {
    render() {
        if (!this.props.user.isAuthenticated || !this.props.user.current) {
            return null
        }

        if (this.props.roles.some( role => this.props.user.current.roles.some(userRole => role === userRole.name))) {
            return this.props.children;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Role)
