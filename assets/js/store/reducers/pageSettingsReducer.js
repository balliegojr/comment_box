import * as actionTypes from '../actions/actionTypes'
import { expandObject } from '../../utility'

const initialState = {
    allowAnonymousComments: false,
    allowAnonymousView: false,
    commentSizeLimit: 1000
}

const pageSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_PAGESETTINGS:
            return expandObject(state, { isLoading: action.payload });
        case actionTypes.SET_PAGESETTINGS:
            const payload = expandObject(action.payload, { isLoading: false });
            return expandObject(state, payload);
    }

    return state;
};

export default pageSettingsReducer;