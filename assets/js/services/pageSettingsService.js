import axios from 'axios';
import { queryParameters } from "../utility";

export function getPageSettings() {
    const { app_key, url, host } = queryParameters();
    const params = [];

    if (!!app_key) {
        params.push(`k=${app_key}`);
    }
    if (!!url) {
        params.push(`u=${url}`);
    }
    if (!!host) {
        params.push(`h=${host}`);
    }
    return axios.get(`/api/page?${params.join('&')}`);
}