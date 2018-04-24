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
    }
    
    return state;
};

export default commentsReducer;