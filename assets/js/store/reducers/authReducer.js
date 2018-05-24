import  { actionTypes } from '../actions'
import { expandObject } from '../../utility'
import { getToken, hasToken, setToken, setHeader, clearToken } from '../../services/accountService'

const token = getToken();
const initialState = {
    current: null,
    token: null,
    isAuthenticated: false
}

const setTokenReducer = (state, action) => {
    setToken(action.payload);
    setHeader(action.payload);
    return expandObject(state, { token: action.payload, isAuthenticated: true});
};

const clearUserDataReducer = (state, action) => {
    clearToken();
    return expandObject(state, { token: null, isAuthenticated: false, current: null });

}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_TOKEN:
            return setTokenReducer(state, action);
        case actionTypes.SET_USER:
            return expandObject(state, { current: action.payload });
        case actionTypes.CLEAR_USER_DATA:
            return clearUserDataReducer(state, action);
    }
    return state;
}

export default authReducer;