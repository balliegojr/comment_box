import { actionTypes } from '../actions';
import { expandObject } from '../../utility';

const initialState = {
    isLoading: false,
    loadedDomains: [],
    editing: null
}

const appendDomain = (state, action) => {
    const domains = [action.payload, ...state.loadedDomains];
    return expandObject(state, { loadedDomains: domains });
}

const updateDomain = (state, domain) => {
    const domains = state.loadedDomains.map(d => d.id !== domain.id ? d : expandObject(d, domain));
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

        case actionTypes.SET_EDITING_DOMAIN:
            return expandObject(state, { editing: action.payload });

        case actionTypes.UPDATE_DOMAIN:
            return updateDomain(state, action);
    }

    return state;
};

export default domainReducer;