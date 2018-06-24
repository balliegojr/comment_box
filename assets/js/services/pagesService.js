import axios from 'axios';
import { errorMessage } from '../utility';

export function getPages() {
    return new Promise((resolve, reject) => {
        axios.get(`/api/pages`)
            .then((pages) => {
                resolve(pages.data);
            }, reason => reject(errorMessage(reason)));
    });
}

export function updatePage(page_info) {
    return new Promise((resolve, reject) => {
        axios.put(`/api/pages/${page_info.id}`, { page: page_info})
            .then((page) => {
                resolve(page.data);
            }, reason => reject(errorMessage(reason)));
    });
}