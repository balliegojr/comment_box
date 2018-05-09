import * as actionTypes from './actionTypes'
import * as userService from '../../services/userService';

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

    userService.currentUser()
        .then((userInfo) => {
            dispatch(setUser(userInfo.data));
        }, (reason) => {
            // user probably don't exist
            dispatch(signout());
        });
}

export const signin = (signinInfo) => (dispatch) => {
    return userService.signin(signinInfo.username, signinInfo.password)
        .then((access_token) => {
            dispatch(setTokenAndLoadUser(access_token));
        });
}

export const signup = (userInfo) => (dispatch) => {
    return userService.signup(userInfo)
        .then((access_token) => {
            dispatch(setTokenAndLoadUser(access_token));
        });
}

export const signout = () => {
    return {
        type: actionTypes.CLEAR_USER_DATA,
    }
}