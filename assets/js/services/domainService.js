import axios from 'axios';
import { errorMessage } from '../utility';

export function getDomains() {
    return new Promise((resolve, reject) => {
        axios.get(`/api/domain`)
            .then((domains) => {
                resolve(domains.data);
            }, reason => reject(errorMessage(reason)));
    });
}


export function deleteDomain(domain_id) {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/domain/${domain_id}`)
            .then(() => {
                resolve();
            }, reason => reject(errorMessage(reason)));
    });
}

export function createDomain(domain_info) {
    return new Promise((resolve, reject) => {
        axios.post(`/api/domain`, { domain: domain_info })
            .then((domain) => {
                resolve(domain.data);
            }, reason => reject(errorMessage(reason)));
    });
}

export function updateDomain(domain_info) {
    return new Promise((resolve, reject) => {
        axios.put(`/api/domain/${domain_info.id}`, { domain: domain_info })
            .then((domain) => {
                resolve(domain.data);
            }, reason => reject(errorMessage(reason)));
    });
}