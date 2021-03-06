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
import { ToastContainer, toast } from 'react-toastify';


// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import * as socketService from "./services/socketService";


import { globalReducer, usersReducer, domainReducer, pagesReducer } from './store/reducers/'
import { accountActions } from './store/actions';
import * as accountService from './services/accountService';

import AdminHeader from './components/admin/header';
import AdminHome from './components/admin/home';
import UserList from './components/users/userList';
import UserEdit from './components/users/userEdit';
import Account from './components/users/account';
import DomainEdit from './components/domain/domainEdit';
import DomainList from './components/domain/domainList';
import PageEdit from './components/page/pageEdit';
import PageList from './components/page/pageList';

import { redux_logger } from './utility';
import { Anonymous, AuthenticatedRoute } from './components/authorization';
import AuthenticationForms from './components/authentication/authenticationForms';


socketService.connect();

const rootReducer = combineReducers({
    global: globalReducer,
    users: usersReducer,
    domains: domainReducer,
    pages: pagesReducer
});



const store = createStore(rootReducer, compose(applyMiddleware(redux_logger, thunk)));
// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
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
                            
                            <AuthenticatedRoute roles={["Owner"]} path="/domains/:id" component={DomainEdit} />
                            <AuthenticatedRoute roles={["Owner"]} path="/domains" component={DomainList} />
                            
                            <AuthenticatedRoute roles={["Owner"]} path="/pages/:id" component={PageEdit} />
                            <AuthenticatedRoute roles={["Owner"]} path="/pages" component={PageList} />

                            <AuthenticatedRoute path="/comments" render={() => (<div>Comments page</div>)} />
                            <AuthenticatedRoute path="/" exact component={AdminHome} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
            <ToastContainer position={"top-center"} />
        </React.Fragment>
    </Provider>,
    document.getElementById('hello-react')
)

if (accountService.hasToken()) {
    store.dispatch(accountActions.setTokenAndLoadUser(accountService.getToken()));
}


global.authHook = (info) => {
    if (info.error) {
        toast.error("somenthing went wrong");
    } else {
        store.dispatch(accountActions.setTokenAndLoadUser(info.token));
    }
}