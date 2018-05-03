import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../../store/actions/userActions'

class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sending: false,
            username: "",
            password: ""
        }
    }

    handleSubmit(ev) {
        ev.preventDefault();

        const signInInfo = {
            username: this.state.username,
            password: this.state.password
        }

        this.setState({ sending: true });
        this.props.doSignin(signInInfo)
            .then(() => {

            }, (reason) => {
                this.setState({ sending: false });
                console.log(reason);
            });
    }

    handleUsernameChange(ev) {
        this.setState({ username: ev.target.value });
    }

    handlePasswordChange(ev) {
        this.setState({ password: ev.target.value });
    }

    render() {
        return (
            <form onSubmit={(ev) => this.handleSubmit(ev)} disabled={this.state.sending}>
                <div className="row form-group">

                    <div className="col-md-6">
                        <input className="form-control" type="text" placeholder="Username" value={this.state.username} onChange={(ev) => this.handleUsernameChange(ev)} />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" type="password" placeholder="Password" value={this.state.password} onChange={(ev) => this.handlePasswordChange(ev)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 text-right">
                        <button type="submit" className="btn btn-default" disabled={!this.state.username || !this.state.password}>Sign in</button>
                    </div>
                </div>

            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doSignin: (signininfo) => dispatch(userActions.signin(signininfo))
    }
}

export default connect(null, mapDispatchToProps)(Signin);