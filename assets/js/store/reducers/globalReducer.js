import  { actionTypes } from '../actions'
import { expandObject } from '../../utility'
import { setToken, setHeader, clearToken } from '../../services/accountService'

const initialState = {
    current: null,
    token: null,
    isAuthenticated: false,

    showProgressBar: false
}

const setTokenReducer = (state, action) => {
    setToken(action.payload);
    setHeader(action.payload);
    return expandObject(state, { token: action.payload, isAuthenticated: true});
};

const clearUserDataReducer = (state, action) => {
    clearToken();
    return initialState;
}


const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_TOKEN:
            return setTokenReducer(state, action);
        case actionTypes.SET_USER:
            return expandObject(state, { current: action.payload });
        case actionTypes.CLEAR_USER_DATA:
            return clearUserDataReducer(state, action);
        case actionTypes.SET_PROGRESS_BAR:
            return expandObject(state, { showProgressBar: action.payload });
    }
    return state;
}

export default globalReducer;