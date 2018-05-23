import React, { Component } from 'react';
import { connect } from 'react-redux';
import { usersActions } from '../../store/actions';

const server_roles = "Admin Owner Moderator".split(" ");

class UserEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_roles: [],
            account_status: 0,
            name: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(received_props) {
        if (received_props.user) {
            this.setState({ 
                user_roles: received_props.user.roles.map(r => r.name),
                name: received_props.name,
                account_status: received_props.user.account_status || 0
            });
        }
    }
    componentDidMount() {
        this.props.doSetEditingUser(+this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.doSetEditingUser(0);
    }

    handleCancelClick() {
        this.props.history.goBack();
    }

    handleSubmit(ev) {
        ev.preventDefault();
        
        this.setState({ saving: true, error: null });

        const current_roles = this.props.user.roles.map(r => r.name);

        const update_info = {
            id: this.props.user.id,
            account_status: this.state.account_status,
            name: this.state.name,
            roles: server_roles.map(role => { 
                const is_current = current_roles.indexOf(role) !== -1;
                const is_new = this.state.user_roles.indexOf(role) !== -1;

                if (is_current && !is_new) {
                    return {
                        name: role,
                        remove: true
                    };
                } else if (!is_current && is_new) {
                    return {
                        name: role,
                        add: true
                    };
                }
            }).filter(r => r)
        }        

        this.props.doSaveUser(update_info)
            .then(() => {
                
                this.props.history.goBack();
            }, reason => {
                this.setState({ saving: false, error: "An error has ocurred, please try again" });
            });
    }

    handleRoleToggle(ev, role) {
        const { checked, value } = ev.target;

        let user_roles = this.state.user_roles.slice();
        if (user_roles.indexOf(role) > -1) {
            user_roles = user_roles.filter(r => r !== role)
        } else {
            user_roles.push(role);
        }

        this.setState({ user_roles: user_roles});
    }

    handleChange(ev) {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    }

    render() {
        if (!this.props.user) {
            return <div>Loading...</div>;
        }

        const roles = server_roles.map(role => {
            return (
                <div className="checkbox-inline" key={role} >
                    <label>
                        <input 
                            type="checkbox" 
                            value={ role } 
                            checked={this.state.user_roles.indexOf(role) > -1} 
                            onChange={(ev) => this.handleRoleToggle(ev, role)}
                            /> {role}
                    </label>
                </div>
            )
        });
        
        return (
            <form onSubmit={(ev) => this.handleSubmit(ev)} disabled={this.state.saving}>
                { this.state.error
                    ? (
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="alert alert-danger"> {this.state.error} </div>
                            </div>
                        </div>
                    )
                    : null
                }
                
                
                
                <div className=" text-right">
                    <h5 className="h4">
                        Editing User
                    </h5>
                </div>

                <div className="row form-group"> 
                    <div className="col-sm-2 text-right">
                        <label className="control-label"> Username </label>
                    </div>
                    <div className="col-sm-10">
                        <input className="form-control" value={this.props.user.username} readOnly="true"  /> 
                    </div>
                </div>

                <div className="row form-group"> 
                    <div className="col-sm-2 text-right">
                        <label className="control-label"> Email </label>
                    </div>
                    <div className="col-sm-10">
                        <input className="form-control" value={this.props.user.email} readOnly="true"  /> 
                    </div>
                </div>

                <hr />
                <fieldset disabled={this.state.saving}>
                    <div className="row form-group">
                        <div className="col-sm-2 text-right">
                            <label className="control-label"> Name </label>
                        </div>
                        <div className="col-sm-10">
                            <input className="form-control" value={this.props.user.name} name="name" onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-2 text-right">
                            <label className="control-label"> Roles </label>
                        </div>
                        <div className="col-sm-10">
                            { roles }
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-sm-2 text-right">
                            <label className="control-label"> Account Status </label>
                        </div>
                        <div className="col-sm-10">
                            <select className="form-control" value={this.state.account_status} name="account_status" onChange={this.handleChange} >
                                <option value="0"> Enabled </option>
                                <option value="1"> Disabled </option>
                            </select>
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
        user: state.users.editing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doSetEditingUser: (user_id) => dispatch(usersActions.edituser(user_id)),
        doSaveUser: (user_info) => dispatch(usersActions.saveUserChangesFromAdmin(user_info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);