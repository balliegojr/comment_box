// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"
import commentsReducer from './store/reducers/commentsReducer'
import pageReducer from "./store/reducers/pageReducer";

import { CommentBox } from './components/comments/commentBox'
import ComentList from './containers/comments/commentList'

/*
    Load page details
        show comments if user authenticated or page allows to unauthenticated
        show comment box if user authenticated or page allow unauthenticated comment

        show signin button if user is not authenticated
        show signup button if user is not authenticated
*/

const rootReducer = combineReducers({
    page: pageReducer,
    comments: commentsReducer
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

class ReactApp extends React.Component {
    render() {
        return (
            <BrowserRouter basename="/app/">
                <div>
                    <Route path="" component={CommentBox} />
                    <Route path="" component={ComentList} />
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
    <Provider store={store}><ReactApp /></Provider>,
    document.getElementById("hello-react")
)