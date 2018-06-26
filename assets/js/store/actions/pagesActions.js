import * as actionTypes from './actionTypes'
import * as pagesService from "../../services/pagesService";
import { cloneObject } from '../../utility';

const setLoadingPages = (isLoading) => {
    return {
        type: actionTypes.FETCHING_PAGES,
        payload: isLoading
    }
}

const setPages = (pages) => {
    return {
        type: actionTypes.SET_PAGES,
        payload: pages
    }
}

export const loadPages = () => (dispatch, getStore) => {
    if (getStore().pages.loaded) {
        return Promise.resolve();
    }
    
    dispatch(setLoadingPages(true));

    return pagesService.getPages()
        .then((pages) => dispatch(setPages(pages)));
}


const setEditingPage = (page) => {
    return {
        type: actionTypes.SET_EDITING_PAGE,
        payload: page
    }
}

export const editPage = (page_id) => (dispatch, getStore) => {
    if (!page_id) {
        dispatch(setEditingPage(null));
        return;
    }

    const { fetching, loaded, pagination } = getStore().pages;
    if (!loaded && !fetching) {
        dispatch(loadPages())
            .then(() => dispatch(editPage(page_id)));
    }

    const filtered_pages = pagination.all.filter((page) => page.id === page_id);
    if (!!filtered_pages.length) {
        const page = cloneObject(filtered_pages[0]);
        dispatch(setEditingPage(page));
    } else {
       // redirect to 404
    }
}


const updatePageAction = (page) => {
    return {
        type: actionTypes.UPDATE_PAGE,
        payload: page
    }
}

export const updatePage = (page_info) => (dispatch) => {
    return pagesService.updatePage(page_info)
        .then((page) => dispatch(updatePageAction(page)));
}

export const setCurrentPage = (page) => {
    return {
        type: actionTypes.SET_PAGE_PAGINATION,
        payload: page
    }
}