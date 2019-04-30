import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from '../store/index'

import NProgress from 'nprogress/nprogress';

Vue.use(VueRouter);


const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('token')) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            store.dispatch('users/getUserInfo');
            next()
        }
    } else {
        store.dispatch('users/getUserInfo');
        next();
    }
});


router.beforeResolve((to, from, next) => {
    if (to.name) {}
    next()
});


router.afterEach((to, from) => {});

export default router;
