import * as actionTypes from '../actions/actionTypes';
import { expandObject } from '../../utility';
const initialState = {
    isLoading: false,
    loadedComments: []
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_COMMENTS:
            return expandObject(state, { isLoading: action.payload })
        case actionTypes.SET_COMMENTS:
            return expandObject(state, { loadedComments: action.payload, isLoading: false});
        case actionTypes.ADD_COMMENT:
            const comments = state.loadedComments.slice();
            comments.unshift(action.payload);
            
            return expandObject(state, { loadedComments: comments });
    }
    
    return state;
};

export default commentsReducer;