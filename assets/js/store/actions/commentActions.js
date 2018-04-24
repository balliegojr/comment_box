import * as actionTypes from './actionTypes'
import axios from 'axios';

export const setLoadingComments = (isLoading) => {
    return { type: actionTypes.LOADING_COMMENTS, payload: false };
}


export const setComments = (comments) => {
    return {
        type: actionTypes.SET_COMMENTS,
        payload: comments
    }
}

export const setCommentsError = (reason) => {
    return {
        type: actionTypes.SET_COMMENTS_ERROR,
        payload: reason
    }
}

export const loadComments = () => {
    return dispatch => {
        dispatch(setLoadingComments(true));
        axios.get("/api/comment")
            .then(comments => {
                dispatch(setComments(comments.data))
            }, reason => dispatch(setCommentsError(reason)));
    }
};