import React from 'react'
import ValidationComponent from '../validationComponent'
import { connect } from 'react-redux'
import * as userActions from '../../store/actions/userActions'



class SignUp extends ValidationComponent {
    constructor(props) {
        super(props);

        this.state = {
            sending: false,
            username: "",
            password: "",
            email: "",
            password_confirmation: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();

        if (!this.validateForm(this.refs.form)){
            return;
        }

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
                if (reason.errors) {
                    for (let target in reason.errors) {
                        this.setError(this.refs.form, target, reason.errors[target]);
                    }
                }
            });
    }

    handleChange(ev) {
        const { name, value } = ev.target;
        this.setState({ [name]: value});
    }

    render() {
        return (
            <form onSubmit={(ev) => this.handleSubmit(ev)} disabled={this.state.sending} ref="form">
                <div className="row form-group">

                    <div className="col-xs-6">
                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="Username" 
                            id="username"
                            name="username" 
                            value={this.state.username} 
                            onChange={this.handleChange}
                            onBlur={this.validateField} 
                            required="true"
                            minLength="3"
                            validate="true" />
                        <label className="error-message" htmlFor="username"></label>

                    </div>
                    <div className="col-xs-6">
                        <input id="email" className="form-control" type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} onBlur={this.validateField} required />
                        <label className="error-message" htmlFor="email"></label>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-xs-6">
                        <input id="password"className="form-control" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} onBlur={this.validateField} required minLength="6" />
                        <label className="error-message" htmlFor="password"></label>
                    </div>
                    <div className="col-xs-6">
                        <input id="password_confirmation" className="form-control" type="password" placeholder="Password Confirmation" name="password_confirmation" value={this.state.password_confirmation} onBlur={this.validateField} onChange={this.handleChange} required minLength="6" match="password" />
                        <label className="error-message" htmlFor="password_confirmation"></label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 text-right">
                        <button type="submit" className="btn btn-default">Sign up</button>
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