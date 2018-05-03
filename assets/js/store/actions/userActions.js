import * as actionTypes from './actionTypes'
import axios from 'axios';

export const setAuthToken = (token) => {
    return {
        type: actionTypes.SET_AUTH_TOKEN,
        payload: token
    }
}

export const setUser = (userInfo) => {
    return {
        type: actionTypes.SET_USER,
        payload: userInfo
    }
}

export const loadCurrentUserInfo = () => (dispatch) => {
    return axios.get("/api/auth/me")
        .then((userInfo) => {
            dispatch(setUser(userInfo.data));
        });
}

export const signin = (signinInfo) => (dispatch) => {
    return axios.post("/api/auth/signin", { user: signinInfo })
        .then((tokenData) => {
            dispatch(setAuthToken(tokenData.data.access_token));

            axios.defaults.headers.common['Authorization'] = `Bearer ${tokenData.data.access_token}`;
            dispatch(loadCurrentUserInfo());
        });
}

export const signup = (userInfo) => (dispatch) => {
    return axios.post("/api/user", { user: userInfo })
        .then((tokenData) => {
            dispatch(setAuthToken(tokenData.data));
        });
}