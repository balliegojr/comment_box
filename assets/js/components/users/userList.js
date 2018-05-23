import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { usersActions } from '../../store/actions';

const UserRow = (props) => {
    return (
        <tr>
            <td>{ props.user.name}</td>
            <td>{ props.user.username}</td>
            <td>{ props.user.email}</td>
            <td>{ props.user.roles.map(r => r.name).join(", ")}</td>
            <td>
                { 
                    props.user.account_status === 0
                    ? "Enabled"
                    : "Disabled"
                }
            </td>
            <td>
                <Link className="btn btn-link btn-sm pull-right" to={`/users/${props.user.id}`}>
                    Edit
                </Link>
            </td>
        </tr>
    )
}


class UserList extends Component {
    constructor(props) { 
        super(props)

        this.state = {
            currentUserType: "admin"
        }
    }
    componentDidMount() {
        this.props.doLoadusers(this.state.currentUserType);
    }

    handleChangeUserType(newType) {
        if (this.state.currentUserType === newType) {
            return;
        }

        this.setState({ currentUserType: newType });
        this.props.doLoadusers(newType);
    }


    render() {
        let content = (
            <div className="row">
                <div className="col-sm-12">
                    <div className="alert alert-info text-center">
                        There are no users to show
                    </div>
                </div>
            </div>
        );
        if (!!this.props.users.loadedUsers.length) {
            const users = this.props.users.loadedUsers.map((user) => <UserRow key={user.id} user={user} />)
            content = (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Username </th>
                            <th> Email </th>
                            <th> Roles </th>
                            <th> Status </th>
                            <th>  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
            )
        }
        

        return (
            <div className="user-list">
                <div className="row">
                    <div className="col-md-12 text-center ">
                        <div className="btn-group" role="group">
                            <button className={"btn btn-default " + (this.state.currentUserType === "admin" ? "active" : "")} onClick={() => this.handleChangeUserType('admin')}>Admins</button>
                            <button className={"btn btn-default " + (this.state.currentUserType === "owner" ? "active" : "")} onClick={() => this.handleChangeUserType('owner')}>Owners</button>
                            <button className={"btn btn-default " + (this.state.currentUserType === "" ? "active" : "")} onClick={() => this.handleChangeUserType('')}>All users</button>
                        </div>
                    </div>
                </div>

                { content }
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLoadusers: (userType) => dispatch(usersActions.loadUsers(userType))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList);