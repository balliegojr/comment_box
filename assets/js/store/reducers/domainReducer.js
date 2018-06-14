import { actionTypes } from '../actions';
import { expandObject } from '../../utility';

const initialState = {
    isLoading: false,
    loadedDomains: []
}

const appendDomain = (state, action) => {
    const domains = [action.payload, ...state.loadedDomains];
    return expandObject(state, { loadedDomains: domains });
}

const domainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAR_USER_DATA:
            return initialState;
       
        case actionTypes.SET_DOMAINS_LOADING:
            return expandObject(state, { isLoading: action.payload});
        case actionTypes.SET_DOMAINS:
            return expandObject(state, { loadedDomains: action.payload, isLoading: false });
        case actionTypes.DELETE_DOMAINS:
            const domains = state.loadedDomains.filter(domain => domain.id !== action.payload);
            return expandObject(state, { loadedDomains: domains });
        case actionTypes.APPEND_DOMAIN:
            return appendDomain(state, action);
    }

    return state;
};

export default domainReducer;