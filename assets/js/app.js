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
import { BrowserRouter } from "react-router-dom"


// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import * as socketService from "./services/socketService";
import commentsReducer from './store/reducers/commentsReducer'
import pageSettingsReducer from "./store/reducers/pageSettingsReducer"
import usersReducer from './store/reducers/usersReducer'

import * as userActions from './store/actions/userActions';
import * as userService from './services/userService';

import PageDisplay from './components/pageDisplay';
import { resize_display } from './utility';

socketService.connect();

const rootReducer = combineReducers({
    pageSettings: pageSettingsReducer,
    comments: commentsReducer,
    user: usersReducer
});

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

// const store = createStore(rootReducer, compose(applyMiddleware(logger, thunk)));
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/app/">
            <PageDisplay />
        </BrowserRouter>
    </Provider>,
    document.getElementById('hello-react')
)

if (window.parent.commentbox) {
    resize_display('hello-react', window.parent.commentbox.container);
}

if (userService.hasToken()) {
    store.dispatch(userActions.setTokenAndLoadUser(userService.getToken()));
}