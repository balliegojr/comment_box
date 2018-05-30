import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class AuthenticatedRoute extends Component {
    validateAccess(roles) {
        console.log(roles)
        if (!this.props.user.isAuthenticated) {
            return false;
        }

        if (!this.props.user.current) {
            return false;
        }

        if (roles) {
            if (
                !((roles.length === 0 && this.props.user.current.roles.length === 0)
                || (roles.some(role => this.props.user.current.roles.some(userRole => role === userRole.name))))
            ) {
                console.log("false")
                return false;
            }
        }

        return true;
    }
    render() {
        const { component: Component, roles: roles, ...rest} = this.props;
        const renderComponent = this.validateAccess(roles);
        
        return <Route
            {...rest}
            render={props =>
                renderComponent ? (
                    <Component {...props} />
                ) : (
                        null
                        // <Redirect
                        //     to={{
                        //         pathname: "/login",
                        //         state: { from: props.location }
                        //     }}
                        // />
                    )
            }
        />
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(AuthenticatedRoute)
