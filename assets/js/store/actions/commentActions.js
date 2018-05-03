import * as actionTypes from './actionTypes'
import { expandObject } from '../../utility';
import { savePageComment, getPageComments } from '../../services/commentService';

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

export const loadComments = () => (dispatch, getStore) => {
    const page_id = getStore().pageSettings.id;
    dispatch(setLoadingComments(true));
    
    getPageComments(page_id)
        .then(comments => {
            dispatch(setComments(comments.data))
        }, reason => dispatch(setCommentsError(reason)));

};

export const appendComment = (comment) => {
    return {
        type: actionTypes.ADD_COMMENT,
        payload: comment
    }
}

export const saveComment = (comment) => (dispatch, getStore) => {
    const page_id = getStore().pageSettings.id;
    
    return savePageComment(expandObject(comment, { page_id: page_id, status: 0 }))
        .then(theComment => {
            dispatch(appendComment(theComment.data));
        });
}