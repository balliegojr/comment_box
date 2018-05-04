import axios from 'axios';

export function setHeader(access_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

export function setToken(access_token) {
    localStorage.setItem("access_token", access_token);
}

export function hasToken() {
    return !!localStorage.getItem("access_token");
}

export function getToken() {
    return localStorage.getItem("access_token");
}

export function clearToken() {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common['Authorization'];
}


export function signin(username, password) {
    return new Promise((resolve, reject) => {
        axios.post("/api/auth/signin", { user: { username: username, password: password} })
            .then((tokenData) => {
                // setToken(tokenData.data.access_token);
                // setHeader(tokenData.data.access_token);
                resolve(tokenData.data.access_token);
            }, (reason) => reject(reason.response.data));

    })
}

export function signup(userInfo) {
    return new Promise((resolve, reject) =>{
        axios.post("/api/user", { user: userInfo })
            .then((tokenData) => {
                // setToken(tokenData.data.access_token);
                // setHeader(tokenData.data.access_token);
                resolve(tokenData.data.access_token);
            }, (reason) => reject(reason.response.data));
    });
}

export function signout() {
    clearToken();
}

export function currentUser() {
    return axios.get("/api/auth/me");
}