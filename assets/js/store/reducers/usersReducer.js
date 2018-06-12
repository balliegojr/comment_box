import * as actionTypes from '../actions/actionTypes'
import { expandObject } from '../../utility'

const initialState = {
    isLoading: false,
    loadedUsers: [],
    editing: null
}

const addUser = (state, user) => {
    const users = state.loadedUsers.slice();
    if (!users.some((c) => c.id === user.id)) {
        users.push(users);
    }

    return expandObject(state, { loadedUsers: users });
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAR_USER_DATA:
            return initialState;
            
        case actionTypes.SET_LOADING_USERS:
            return expandObject(state, { isLoading: action.payload });
        case actionTypes.SET_LOADEDUSERS:
            return expandObject(state, { loadedUsers: action.payload, isLoading: false});
        case actionTypes.APPEND_LOADED_USER:
            return addUser(state, action.payload);
        
        case actionTypes.SET_EDITING_USER:
            return expandObject(state, { editing: action.payload, isLoading: false });
    }

    return state;
};

export default usersReducer;