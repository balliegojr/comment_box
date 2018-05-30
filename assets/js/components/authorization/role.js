import React, { Component } from 'react';
import { connect } from 'react-redux';


class Role extends Component {
    render() {
        if (this.props.user.current) {
            if (
                (this.props.roles.length === 0 && this.props.user.current.roles.length === 0) 
                || (this.props.roles.some(role => this.props.user.current.roles.some(userRole => role === userRole.name)))
            ) {
                return this.props.children;
            }
        }

        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Role)
