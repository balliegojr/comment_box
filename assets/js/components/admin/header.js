import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { Role, Authenticated } from '../authorization'
import { accountActions } from '../../store/actions'

export class AdminHeader extends Component {
    
    
    handleDropdownToggle(ev) {
        const { target } = ev;
        if (target.parentElement.classList.contains("open")) {
            target.parentElement.classList.remove("open");
        } else {
            target.parentElement.classList.add("open");

            const documentClick = () => {
                target.parentElement.classList.remove("open");
                document.removeEventListener("click", documentClick);
            }

            document.addEventListener("click", documentClick);
        }
    }

    handleSignout() {
        this.props.doSignOut();
    }

    render() {
        let userMenu = null;
        if (this.props.user.isAuthenticated && this.props.user.current) {
            userMenu = (
                <div className="collapse navbar-collapse navbar-header  navbar-right">
                    <ul className="nav navbar-nav ">
                        <li className="dropdown">
                            <a className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false" onClick={(ev) => this.handleDropdownToggle(ev)}> {this.props.user.current.username} <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><NavLink to="/account" activeClassName="active"> Account </NavLink></li>
                                <li role="separator" className="divider"></li>
                                <li><a onClick={() => this.handleSignout()}>Log out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            )
        }


        return (
            //navbar-fixed-top
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="navbar-header navbar-left">
                    <Link to="/" className="navbar-brand"> 
                        <img src="/images/steel_box.png" className="img img-responsive logo" />
                     </Link>
                </div>
                { userMenu }
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-center">
                            <Role roles={["Admin"]}>
                                <li><NavLink to="/users" activeClassName="active"> Users </NavLink></li>
                            </Role>
                            <Role roles={["Owner", "Moderator"]}>
                                <li><NavLink to="/domains" activeClassName="active"> Domains </NavLink></li>
                                <li><NavLink to="/pages" activeClassName="active"> Pages </NavLink></li>
                                {/* <li><NavLink to="/comments" activeClassName="active"> Comments </NavLink></li> */}
                            </Role>
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        doSignOut: () => dispatch(accountActions.signout())
    }
}

export default connect(mapStateToProps, mapActionsToProps)(AdminHeader);