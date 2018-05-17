import React from 'react'
import { connect } from 'react-redux'

import { Role, Authenticated } from "../authorization"

const adminHeader = (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Brand</a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav navbar-center">
                        <Role roles={["Admin"]}><li><a href="#">Users</a></li></Role>
                        <li><a href="#">Pages</a></li>
                        <li><a href="#">Comments</a></li>
                    </ul>

                    <Authenticated>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Action</a></li>
                                        <li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li><a href="#">Separated link</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </Authenticated>                   
                </div>
            </div>
        </nav>
            );
}

const mapStateToProps = (state) => {
    return {
        user: state.user.current
    }
}

export default connect(mapStateToProps, null)(adminHeader);