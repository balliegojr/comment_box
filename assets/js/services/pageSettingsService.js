import axios from 'axios';

export function getPageSettings() {
    return axios.get("/api/page");
}