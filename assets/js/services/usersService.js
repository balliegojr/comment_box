import axios from 'axios';

export function getUsers(userType) {
    if (userType) {
        return axios.get(`/api/user/byType/${userType}`);
    } else {
        return axios.get('/api/user/byType/admin,owner');
    }
}


export function getUser(user_id) {
    return axios.get(`/api/user/${user_id}`);
}

export function saveUserFromAdmin(user_info) {
    return axios.put(`/api/user/${user_info.id}/admin`, { user: user_info });
}