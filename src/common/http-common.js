import axios from 'axios';
import store from '../store/index';
import swal from 'sweetalert2'
import NProgress from 'nprogress/nprogress';

const API_URL = process.env.VUE_APP_DOMAIN;
const MEDIA_URL = process.env.VUE_APP_MEDIA_URL;

export const HTTP = axios.create({
    baseURL: API_URL,
    mediaUrl: MEDIA_URL
});

let inProcessRequest = 0;


HTTP.interceptors.request.use(
    function (config) {
        inProcessRequest += 1;
        NProgress.start();
        let token = localStorage.getItem('token');
        if (token) config.headers.authorization = `Token ${token}`;
        return config;
    }
);


HTTP.interceptors.response.use((response) => {
        inProcessRequest -=1;
        if(inProcessRequest === 0){
            NProgress.done();
        }
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

    }
    else if (error.response.status === 409) {
        store.dispatch("users/accessDenied")
    } else if(parseInt(error.response.status/500) === 1 ){
        store.dispatch('users/serverError')
    }
    inProcessRequest -=1;
    if(inProcessRequest === 0){
        NProgress.done();
    }
    return Promise.reject(error)
});
