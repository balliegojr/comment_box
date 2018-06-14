import * as actionTypes from '../actions/actionTypes'
import { expandObject } from '../../utility'

const initialState = {
    allowAnonymousComments: false,
    allowAnonymousView: false,
    commentSizeLimit: 1000
}

const pageSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.CLEAR_USER_DATA:
        //     return initialState;
        case actionTypes.LOADING_PAGESETTINGS:
            return expandObject(state, { isLoading: action.payload });
        case actionTypes.SET_PAGESETTINGS:
            const payload = expandObject(action.payload, { isLoading: false, isLoaded: true });
            return expandObject(state, payload);
        case actionTypes.SET_PAGESETTINGS_ERROR:
            return expandObject(action.payload, { isLoading: false, isLoaded: false, hasError: true})
    }

    return state;
};

export default pageSettingsReducer;