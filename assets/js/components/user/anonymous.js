import React, { Component } from 'react';

import Signin from './signin'
import Signup from './signup'

class Anonymous extends Component {
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
                <div className="text-center alert alert-warning"> You are not authenticated, please <a onClick={() => this.handleToggleSignin(!this.state.showSignin)}>signin</a> or <a onClick={() => this.handleToggleSignup(!this.state.showSignup)} >signup</a> 
                </div>
                {this.state.showSignin ? <Signin /> : "" }
                {this.state.showSignup ? <Signup /> : "" }
            </div>
        )
    }
}

export default Anonymous