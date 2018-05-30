// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

import css from '../css/app.css';

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from "react-router-dom"


// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import * as socketService from "./services/socketService";


import { authReducer, usersReducer } from './store/reducers/'
import { accountActions } from './store/actions';
import * as accountService from './services/accountService';

import AdminHeader from './components/admin/header';
import AdminHome from './components/admin/home';
import UserList from './components/users/userList';
import UserEdit from './components/users/userEdit';
import Account from './components/users/account';

import { redux_logger } from './utility';
import { Authenticated, Anonymous, Role, AuthenticatedRoute } from './components/authorization';
import AuthenticationForms from './components/authentication/authenticationForms';

socketService.connect();

const rootReducer = combineReducers({
    user: authReducer,
    users: usersReducer
});



const store = createStore(rootReducer, compose(applyMiddleware(redux_logger, thunk)));
// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/admin/">
            <div >
                <AdminHeader />
                <div className="container">
                    <Anonymous>
                        <AuthenticationForms />
                    </Anonymous>
                    
                    <Switch>
                        <AuthenticatedRoute roles={["Admin"]} path="/users/:id" exact component={UserEdit} />
                        <AuthenticatedRoute roles={["Admin"]} path="/users" exact component={UserList} />
                        
                        <AuthenticatedRoute path="/account" component={Account} />
                        <AuthenticatedRoute path="/domains" render={() => (<div>Domains page</div>)} />
                        <AuthenticatedRoute path="/pages" render={() => (<div>Pages page</div>)} />
                        <AuthenticatedRoute path="/comments" render={() => (<div>Comments page</div>)} />
                        <AuthenticatedRoute path="/" exact component={AdminHome} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('hello-react')
)

if (accountService.hasToken()) {
    store.dispatch(accountActions.setTokenAndLoadUser(accountService.getToken()));
}