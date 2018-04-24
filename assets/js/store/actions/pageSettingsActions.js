import * as actionTypes from './actionTypes'
import axios from 'axios';

export const setLoadingPageSettings = (isLoading) => {
    return {
        type: actionTypes.LOADING_PAGESETTINGS,
        payload: isLoading
    }
}

export const setPageSettings = (pageSettings) => {
    return {
        type: actionTypes.SET_PAGESETTINGS,
        payload: pageSettings
    }
}

export const setPageSettingsError = (reason) => {
    return {
        type: actionTypes.SET_PAGESETTINGS_ERROR,
        payload: reason
    }
}

export const loadPageSettings = () => {
    return dispatch => {
        dispatch(setLoadingPageSettings(true));
        axios.get("/api/page")
            .then(pageSettings => {
                dispatch(setPageSettings(pageSettings.data))
            }, reason => dispatch(setPageSettingsError(reason)));
    }
};