import React from 'react';
import { connect } from 'react-redux';
import { cloneObject, expandObject } from '../../utility';
import ValidationComponent from '../validationComponent';
import { accountActions, usersActions } from '../../store/actions';

class Account extends ValidationComponent {
    constructor(props) {
        super(props);

        this.state = {};
        if (props.user) {
            let user = cloneObject(props.user);
            for (let f in user) {
                if (user[f] === null) {
                    user[f] = ''
                }
            }

            this.state = expandObject(user, { password: '', password_confirmation: '', current_password: '' });
        }
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        if (!this.validateForm(this.refs.form)){
            return;
        }

        this.setState({ saving: true });
        let user_info = {
            id: this.state.id,
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
        }

        if (this.state.current_password !== '') {
            user_info = expandObject(user_info, {
                current_password: this.state.current_password,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            });
        }


        this.props.doUpdateAccount(user_info)
            .then(() => {
                this.setState({ saving: false, current_password: '', password: '', password_confirmation: '' });
                
            }, (reason) => {
                this.setState({ saving: false });
                if (reason.errors) {
                    for (let target in reason.errors) {
                        this.setError(this.refs.form, target, reason.errors[target]);
                    }
                }
            });
    }

    handleCancelClick() {
        this.props.history.goBack();
    }

    render() {
        return (
            <form onSubmit={(ev) => this.handleSubmit(ev)} ref="form">
                <div className=" text-right">
                    <h5 className="h4">
                        Account Settings
                    </h5>
                </div>

                <fieldset disabled={this.state.saving}>

                    <div className="row form-group">
                        <div className="col-sm-2 text-right">
                            <label className="control-label"> Name </label>
                        </div>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-2 text-right">
                            <label className="control-label" htmlFor="username"> Username </label>
                        </div>
                        <div className="col-sm-10">
                            <input className="form-control" value={this.state.username} name="username" id="username"
                                onChange={this.handleChange} 
                                onBlur={this.validateField}
                                required="true"
                                minLength="3"
                                validate="true" />
                            <label className="error-message" htmlFor="username"></label>
                                
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-2 text-right">
                            <label className="control-label" htmlFor="email"> Email </label>
                        </div>
                        <div className="col-sm-10">
                            <input className="form-control" value={this.state.email} name="email" id="email"
                                type="email"
                                onChange={this.handleChange} 
                                onBlur={this.validateField} 
                                required="true" />
                            <label className="error-message" htmlFor="email"></label>
                                
                        </div>
                    </div>

                    <hr />

                    <div className=" text-right">
                        <h5 className="h4">
                            Change Password
                        </h5>
                        <h5 className="h6">
                            Only fill the fields bellow if you want to change your password
                        </h5>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-2 text-right">
                            <label className="control-label" htmlFor="current_password"> Current Password </label>
                        </div>
                        <div className="col-sm-10">
                            <input className="form-control" value={this.state.current_password} name="current_password" id="current_password"
                                type="password"
                                onChange={this.handleChange}
                                onBlur={this.validateField} />
                            <label className="error-message" htmlFor="current_password"></label>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-2 text-right">
                            <label className="control-label" htmlFor="password"> New Password </label>
                        </div>
                        <div className="col-sm-10">
                            <input className="form-control" value={this.state.password} name="password" id="password"
                                type="password"
                                onChange={this.handleChange}
                                onBlur={this.validateField}
                                minLength="6" />
                            <label className="error-message" htmlFor="password"></label>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-2 text-right">
                            <label className="control-label" htmlFor="password_confirmation"> Password Confirmation </label>
                        </div>
                        <div className="col-sm-10">
                            <input className="form-control" value={this.state.password_confirmation} name="password_confirmation" id="password_confirmation"
                                type="password"
                                onChange={this.handleChange}
                                onBlur={this.validateField}
                                minLength="6" 
                                match="password"/>
                            <label className="error-message" htmlFor="password_confirmation"></label>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-sm-12 text-right">
                            <button className="btn btn-link" type="button" onClick={() => this.handleCancelClick()}> Cancel </button>
                            <button className="btn btn-default" type="submit"> Save </button>
                        </div>
                    </div>
                </fieldset>

            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.current
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doUpdateAccount: (user_info) => dispatch(accountActions.updateAccount(user_info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
