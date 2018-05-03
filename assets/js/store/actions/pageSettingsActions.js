import * as actionTypes from './actionTypes'
import { getPageSettings } from '../../services/pageSettingsService'

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

export const loadPageSettings = () => dispatch => {
    dispatch(setLoadingPageSettings(true));
    
    return getPageSettings()
        .then(pageSettings => {
            dispatch(setPageSettings(pageSettings.data))
        }, reason => dispatch(setPageSettingsError(reason)));
};