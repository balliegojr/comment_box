import * as actionTypes from './actionTypes';

export const setProgressBar = (show) => {
    return {
        type: actionTypes.SET_PROGRESS_BAR,
        payload: show
    }
}
