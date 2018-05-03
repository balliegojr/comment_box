import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as userActions from '../../store/actions/userActions'

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sending: false,
            username: "",
            password: "",
            email: "",
            password_confirmation: ""
        }
    }

    handleSubmit(ev) {
        ev.preventDefault();

        const userInfo = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }

        this.setState({ sending: true });
        this.props.doSignup(userInfo)
            .then(() => {

            }, (reason) => {
                this.setState({ sending: false });
                console.log(reason);
            });
    }

    handleUsernameChange(ev) {
        this.setState({ username: ev.target.value });
    }

    handleEmailChange(ev) {
        this.setState({ email: ev.target.value });
    }

    handlePasswordChange(ev) {
        this.setState({ password: ev.target.value });
    }

    handlePasswordConfirmationChange(ev) {
        this.setState({ password_confirmation: ev.target.value });
    }

    validateForm() {
        return (
            !this.state.sending
            && this.state.username
            && this.state.email
            && this.state.password.length >= 6
            && this.state.password === this.state.password_confirmation
        )
    }

    render() {
        const submitEnabled = this.validateForm();

        return (
            <form onSubmit={(ev) => this.handleSubmit(ev)} disabled={this.state.sending}>
                <div className="row form-group">

                    <div className="col-md-6">
                        <input className="form-control" type="text" placeholder="Username" value={this.state.username} onChange={(ev) => this.handleUsernameChange(ev)} />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" type="email" placeholder="Email" value={this.state.email} onChange={(ev) => this.handleEmailChange(ev)} />
                    </div>
                </div>

                <div className="row form-group">

                    <div className="col-md-6">
                        <input className="form-control" type="password" placeholder="Password" value={this.state.password} onChange={(ev) => this.handlePasswordChange(ev)} />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" type="password" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={(ev) => this.handlePasswordConfirmationChange(ev)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 text-right">
                        <button type="submit" className="btn btn-default" disabled={!submitEnabled}>Sign up</button>
                    </div>
                </div>

            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doSignup: (user) => dispatch(userActions.signup(user))
    }
}

export default connect(null, mapDispatchToProps)(SignUp);