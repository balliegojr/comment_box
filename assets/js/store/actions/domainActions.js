import { actionTypes } from '../actions'
import * as domainService  from '../../services/domainService';

const setLoadingDomains = (isLoading) => {
    return { 
        type: actionTypes.SET_DOMAINS_LOADING,
        payload: isLoading
    }
}

const setDomains = (domains) => {
    return {
        type: actionTypes.SET_DOMAINS,
        payload: domains
    }
}

const appendDomain = (domain) => {
    return {
        type: actionTypes.APPEND_DOMAIN,
        payload: domain
    }
}

export const loadDomains = () => (dispatch) => {
    dispatch(setLoadingDomains(true));

    return domainService.getDomains()
        .then((domains) => {
            dispatch(setDomains(domains));
        }, reason => {
            dispatch(setLoadingDomains(false));
        });
}

export const deleteDomain = (domain_id) => (dispatch) => {
    dispatch({ type: actionTypes.DELETE_DOMAINS, payload: domain_id })
    
    return domainService.deleteDomain(domain_id).then(() => {
    });
}

export const addNewDomain = (domain_info) => (dispatch) => {
    return domainService.createDomain(domain_info)
        .then((domain_data) => {
            dispatch(appendDomain(domain_data));
        });
}