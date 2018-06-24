import { actionTypes } from '../actions';
import { expandObject } from '../../utility';

const initialState = {
    isLoading: false,
    loadedPages: [],
    editing: null
}

const updatePage = (state, page) => {
    const pages = state.loadedPages.map(p => p.id !== page.id ? p : expandObject(p, page));
    return expandObject(state, { loadedPages: pages });
}

const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_PAGES_LOADING:
            return expandObject(state, { isLoading: action.payload })
        case actionTypes.SET_PAGES:
            return expandObject(state, { loadedPages: action.payload, isLoading: false });

        case actionTypes.SET_EDITING_PAGE:
            return expandObject(state, { editing: action.payload });

        case actionTypes.UPDATE_PAGE:
            return updatePage(state, action);
    }
    
    return state;
};

export default pagesReducer;