import * as actionTypes from '../actions/actionTypes'
import { expandObject } from '../../utility'

const initialState = {
    allowUnauthenticatedComment: false,
    allowUnauthenticatedList: false,
    allowUnanthenticatedResponse: false
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