import React, { Component } from 'react';

import SigninForm from './signinForm'
import SignupForm from './signupForm'

class AuthenticationForms extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showSignin: false,
            showSignup: false
        }
    }


    handleToggleSignin(show) {
        this.setState({ showSignin: show, showSignup: false});
    }

    handleToggleSignup(show) {
        this.setState({ showSignin: false, showSignup: show });
    }

    render() {
        return (
            <div>
                <div className="text-center alert alert-warning"> You are not authenticated, please <a onClick={() => this.handleToggleSignin(!this.state.showSignin)}>sign in</a> or <a onClick={() => this.handleToggleSignup(!this.state.showSignup)} >sign up</a> 
                </div>
                {this.state.showSignin ? <SigninForm /> : "" }
                {this.state.showSignup ? <SignupForm /> : "" }
            </div>
        )
    }
}

export default AuthenticationForms