import * as actionTypes from '../actions/actionTypes';
import { expandObject } from '../../utility';
const initialState = {
    isLoading: false,
    loadedComments: []
}


const addComment = (state, comment) => {
    const comments = state.loadedComments.slice();
    if (!comments.some((c) => c.id === comment.id)) {
        comments.unshift(comment);
    }

    return expandObject(state, { loadedComments: comments });
}

const updateComment = (state, comment) => {
    const comments = state.loadedComments.map(c => c.id !== comment.id ? c : expandObject(c, comment));
    return expandObject(state, { loadedComments: comments });
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_COMMENTS:
            return expandObject(state, { isLoading: action.payload })
        case actionTypes.SET_COMMENTS:
            return expandObject(state, { loadedComments: action.payload, isLoading: false});
        case actionTypes.ADD_COMMENT:
            return addComment(state, action.payload);
        case actionTypes.UPDATE_COMMENT:
            return updateComment(state, action.payload);
    }
    
    return state;
};

export default commentsReducer;