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


import usersReducer from './store/reducers/usersReducer'
import * as userActions from './store/actions/userActions';
import * as userService from './services/userService';

import AdminHeader from './components/admin/header';
import AdminHome from './components/admin/home';
import { redux_logger } from './utility';

socketService.connect();

const rootReducer = combineReducers({
    user: usersReducer
});



const store = createStore(rootReducer, compose(applyMiddleware(redux_logger, thunk)));
// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/admin/">
            <div>
                <AdminHeader />
                <div className="container">
                    <Switch>
                        <Route path="/users" render={() => (<div>Users page</div>)} />
                        <Route path="/account" render={() => (<div>Account page</div>)} />
                        <Route path="/domains" render={() => (<div>Domains page</div>)} />
                        <Route path="/pages" render={() => (<div>Pages page</div>)} />
                        <Route path="/comments" render={() => (<div>Comments page</div>)} />
                        <Route path="/" component={AdminHome} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('hello-react')
)

if (userService.hasToken()) {
    store.dispatch(userActions.setTokenAndLoadUser(userService.getToken()));
}