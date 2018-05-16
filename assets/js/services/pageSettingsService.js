import axios from 'axios';
import { queryParameters } from "../utility";

export function getPageSettings() {
    const { client_id, app_id, url } = queryParameters();
    const params = [];
    if (!!client_id) {
        params.push(`c=${client_id}`);
    }
    if (!!app_id) {
        params.push(`a=${app_id}`);
    }
    if (!!url) {
        params.push(`u=${url}`);
    }
    
    return axios.get(`/api/page?${params.join('&')}`);
}