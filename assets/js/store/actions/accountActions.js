import * as actionTypes from './actionTypes'
import * as accountService from '../../services/accountService';

const setAuthToken = (token) => {
    return {
        type: actionTypes.SET_AUTH_TOKEN,
        payload: token
    }
}

const setUser = (userInfo) => {
    return {
        type: actionTypes.SET_USER,
        payload: userInfo
    }
}

export const setTokenAndLoadUser = (access_token) => (dispatch) => {
    dispatch(setAuthToken(access_token));

    accountService.currentUser()
        .then((userInfo) => {
            dispatch(setUser(userInfo.data));
        }, (reason) => {
            // user probably don't exist
            dispatch(signout());
        });
}

export const signin = (signinInfo) => (dispatch) => {
    return accountService.signin(signinInfo.username, signinInfo.password)
        .then((access_token) => {
            dispatch(setTokenAndLoadUser(access_token));
        });
}

export const signup = (userInfo) => (dispatch) => {
    return accountService.signup(userInfo)
        .then((access_token) => {
            dispatch(setTokenAndLoadUser(access_token));
        });
}

export const signout = () => {
    return {
        type: actionTypes.CLEAR_USER_DATA,
    }
}

export const updateAccount = (user_info) => (dispatch) => {
    return accountService.updateAccount(user_info)
        .then(updated_account => {
            dispatch(setUser(updated_account));
        });
}