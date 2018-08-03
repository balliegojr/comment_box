// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

import '../css/app.css';

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
import { ToastContainer, toast } from 'react-toastify';

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import * as socketService from "./services/socketService";
import { globalReducer, commentsReducer, pageSettingsReducer } from "./store/reducers";

import { accountActions } from './store/actions';
import * as accountService from './services/accountService';

import PageDisplay from './components/pageDisplay';
import { resize_display, redux_logger } from './utility';

socketService.connect();

const rootReducer = combineReducers({
    pageSettings: pageSettingsReducer,
    comments: commentsReducer,
    global: globalReducer
});

// const store = createStore(rootReducer, compose(applyMiddleware(redux_logger, thunk)));
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <PageDisplay />
            <ToastContainer position={"bottom-center"} />
        </React.Fragment>
    </Provider>,
    document.getElementById('hello-react')
)

if (window.parent.commentbox) {
    resize_display('hello-react', window.parent.commentbox.container);
}

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