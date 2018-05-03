import axios from 'axios';

export function savePageComment(comment) {
    return axios.post("/api/comment", { comment: comment });
}

export function getPageComments(page_id) {
    return axios.get(`/api/page/${page_id}/comment`);
}