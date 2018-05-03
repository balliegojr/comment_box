import * as actionTypes from '../actions/actionTypes'
import { expandObject } from '../../utility'

const initialState = {
    current: null,
    token: null,
    isAuthenticated: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTH_TOKEN:
            return expandObject(state, { token: action.payload, isAuthenticated: true});
        case actionTypes.SET_USER:
            return expandObject(state, { current: action.payload });
    }
    return state;
}

export default userReducer;