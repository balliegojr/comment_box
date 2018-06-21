import { actionTypes } from '../actions'
import * as domainService  from '../../services/domainService';
import { cloneObject } from '../../utility';

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

const setEditingDomain = (domain) => {
    return {
        type: actionTypes.SET_EDITING_DOMAIN,
        payload: domain
    }
}

export const editDomain = (domain_id) => (dispatch, getStore) => {
    if (!domain_id) {
        dispatch(setEditingDomain(null));
        return;
    }

    const filtered_domains = getStore().domains.loadedDomains.filter((domain) => domain.id === domain_id);
    if (!!filtered_domains.length) {
        const domain = cloneObject(filtered_domains[0]);
        dispatch(setEditingDomain(domain));
    } else {
        dispatch(loadDomains())
            .then(() => dispatch(editDomain(domain_id)));
    }
}


const updateDomainAction = (domain) => {
    return {
        type: actionTypes.UPDATE_DOMAIN,
        payload: domain
    }
}

export const updateDomain = (domain_info) => (dispatch) => {
    return domainService.updateDomain(domain_info)
        .then((domain) => dispatch(updateDomainAction(domain)));
}