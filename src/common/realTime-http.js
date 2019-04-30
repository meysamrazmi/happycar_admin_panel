import axios from 'axios';
import store from '../store/index';
import swal from 'sweetalert2'

const API_URL = process.env.VUE_APP_DOMAIN;


export const RHTTP = axios.create({
    baseURL: API_URL,
});

RHTTP.interceptors.request.use(
    function (config) {
        let token = localStorage.getItem('token');
        if (token) config.headers.authorization = `Token ${token}`;
        return config;
    }
);


RHTTP.interceptors.response.use((response) => {
    return response
}, function (error) {
    let originalRequest = error.config;
    if ((error.response.status === 401) && !originalRequest._retry) {
        originalRequest._retry = true;
        swal({
            title: 'خطا',
            text: "اعتبار ورود شما منقضی شده‌است. لطفا دوباره وارد شوید.",
            type: 'error',
            confirmButtonText: 'باشه',
        });
        store.dispatch("users/logout");
    } else if (error.response.status === 402) {
        store.dispatch('users/userConfig', window.location.pathname);

    } else if (error.response.status === 409) {
        store.dispatch("users/accessDenied")
    }
    return Promise.reject(error)
});
