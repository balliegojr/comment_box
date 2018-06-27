import { actionTypes } from '../actions';
import { expandObject } from '../../utility'
import * as paginationReducer from './paginationReducer';

const initialState = {
    fetching: false,
    loaded: false,
    editing: null,
    pagination: paginationReducer.build_state(10)
}

const addUser = (state, user) => {
    if (!state.pagination.all.some((c) => c.id === user.id)) {
        const domains = [action.payload, ...state.pagination.all];
        const pagination = paginationReducer.set_content(state.pagination, domains);
    
        return expandObject(state, { pagination });
    }

    return state;
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAR_USER_DATA:
            return initialState;
            
        case actionTypes.FETCHING_USERS:
            return expandObject(state, { fetching: action.payload });
        case actionTypes.SET_LOADEDUSERS:
            const pagination = paginationReducer.set_content(state.pagination, action.payload);
            return expandObject(state, { pagination, fetching: false, loaded: true });

        case actionTypes.APPEND_LOADED_USER:
            return addUser(state, action.payload);
        
        case actionTypes.SET_EDITING_USER:
            return expandObject(state, { editing: action.payload, fetching: false  });
        case actionTypes.SET_USERS_PAGE:
            return expandObject(state, { pagination: paginationReducer.set_page(state.pagination, action.payload) });
    }

    return state;
};

export default usersReducer;