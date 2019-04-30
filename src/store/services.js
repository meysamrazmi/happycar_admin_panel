import {HTTP} from "../common/http-common";

const services = {
    namespaced: true,
    state: {
        services: {},
        newServices: 0
    },
    mutations: {
        setServices: function (state, services) {
            state.services = services;
        },
        setNewServices: function (state, newServices) {
            state.newServices = newServices;
        }
    },
    actions: {
        getServices: function ({commit}) {
            HTTP.get('service').then((res)=>{
                commit('setServices', res.services);
                commit('setNewServices', res.newServices);
            }).catch((err)=> {
                console.log(err)
            })
        }
    },
    getters: {

    }
};

export default services;