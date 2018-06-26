import { actionTypes } from '../actions';
import { expandObject } from '../../utility';
import * as paginationReducer from './paginationReducer';

const initialState = {
    fetching: false,
    loaded: false,
    editing: null,
    pagination: paginationReducer.build_state(10)
}

const appendDomain = (state, action) => {
    const domains = [action.payload, ...state.pagination.all];
    const pagination = paginationReducer.set_content(state.pagination, domains);

    return expandObject(state, { pagination });
}

const updateDomain = (state, domain) => {
    const domains = state.pagination.all.map(d => d.id !== domain.id ? d : expandObject(d, domain));

    const pagination = paginationReducer.set_content(state.pagination, domains);
    return expandObject(state, { pagination });
}

const deleteDomain = (state, domain) => {
    const domains = state.pagination.all.filter(d => d.id !== domain);
    const pagination = paginationReducer.set_content(state.pagination, domains);
    return expandObject(state, { pagination });
}

const domainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAR_USER_DATA:
            return initialState;
       
        case actionTypes.FETCHING_DOMAINS:
            return expandObject(state, { fetching: action.payload});

        case actionTypes.SET_DOMAINS:
            const pagination = paginationReducer.set_content(state.pagination, action.payload);
            return expandObject(state, { pagination, fetching: false, loaded: true });
        case actionTypes.DELETE_DOMAINS:
            return deleteDomain(state, action.payload);
        case actionTypes.APPEND_DOMAIN:
            return appendDomain(state, action);

        case actionTypes.SET_EDITING_DOMAIN:
            return expandObject(state, { editing: action.payload });

        case actionTypes.UPDATE_DOMAIN:
            return updateDomain(state, action);

        case actionTypes.SET_DOMAIN_PAGE:
            return expandObject(state, { pagination: paginationReducer.set_page(state.pagination, action.payload) });
    }

    return state;
};

export default domainReducer;