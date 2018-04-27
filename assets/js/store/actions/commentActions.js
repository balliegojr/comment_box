import * as actionTypes from './actionTypes'
import axios from 'axios';
import { expandObject } from '../../utility';

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

export const appendComment = (comment) => {
    return {
        type: actionTypes.ADD_COMMENT,
        payload: comment
    }
}

export const saveComment = (comment) => (dispatch, getStore) => {
    const page_id = getStore().pageSettings.id;
    
    return axios.post("/api/comment", { comment: expandObject(comment, { page_id: page_id, status: 0 })})
        .then(theComment => {
            dispatch(appendComment(theComment.data));
        });
}