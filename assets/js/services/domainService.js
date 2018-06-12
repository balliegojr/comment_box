import axios from 'axios';

export function getDomains() {
    return new Promise((resolve, reject) => {
        axios.get(`/api/domain`)
            .then((domains) => {
                resolve(domains.data);
            }, reason => {
                reject(reason.response.data);
            });
    });
}


export function deleteDomain(domain_id) {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/domain/${domain_id}`)
            .then(() => {
                resolve();
            }, reason => {
                reject(reason.response.data);
            });
    });
}

export function createDomain(domain_info) {
    return new Promise((resolve, reject) => {
        axios.post(`/api/domain`, { domain: domain_info })
            .then((domain) => {
                resolve(domain.data);
            }, reason => {
                reject(reason.response.data);
            });
    });
}