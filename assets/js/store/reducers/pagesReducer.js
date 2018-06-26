import { actionTypes } from '../actions';
import { expandObject } from '../../utility';
import * as paginationReducer from './paginationReducer';


const initialState = {
    fetching: false,
    loaded: false,
    editing: null,
    pagination: paginationReducer.build_state(10)
}

const updatePage = (state, page) => {
    const pages = state.pagination.all.map(p => p.id !== page.id ? p : expandObject(p, page));
    const pagination = paginationReducer.set_content(state.pagination, pages);
    return expandObject(state, { pagination });
}

const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAR_USER_DATA:
            return initialState;

        case actionTypes.FETCHING_PAGES:
            return expandObject(state, { fetching: action.payload })

        case actionTypes.SET_PAGES:
            const pagination = paginationReducer.set_content(state.pagination, action.payload);
            return expandObject(state, { pagination, fetching: false, loaded: true });

        case actionTypes.SET_EDITING_PAGE:
            return expandObject(state, { editing: action.payload });

        case actionTypes.UPDATE_PAGE:
            return updatePage(state, action);

        case actionTypes.SET_PAGE_PAGINATION:
            return expandObject(state, { pagination: paginationReducer.set_page(state.pagination, action.payload) });
    }
    
    return state;
};

export default pagesReducer;