import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountActions } from '../../store/actions'

export class SigninForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sending: false,
            username: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();

        const signInInfo = {
            username: this.state.username,
            password: this.state.password
        }

        this.setState({ sending: true, error_message: null });
        this.props.doSignin(signInInfo)
            .then(() => {

            }, (reason) => {
                this.setState({ sending: false, error_message:reason.error });
                
            });
    }

    handleChange(ev) {
        const { name, value } = ev.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <form onSubmit={(ev) => this.handleSubmit(ev)}>
                <div className="row form-group">

                    <div className="col-xs-6">
                        <input className="form-control" type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} required />
                        <label className="error-message" id="username" htmlFor="username"></label>
                    </div>
                    <div className="col-xs-6">
                        <input className="form-control" id="password" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                        <label className="error-message" htmlFor="password"></label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-8 ">
                        <label className="error-message">{this.state.error_message}</label>
                    </div>
                    <div className="col-xs-4 text-right">
                        <button type="submit" className="btn btn-default" disabled={this.state.sending}>Sign in</button>
                    </div>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doSignin: (signininfo) => dispatch(accountActions.signin(signininfo))
    }
}

export default connect(null, mapDispatchToProps)(SigninForm);