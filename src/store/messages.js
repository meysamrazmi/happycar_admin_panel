import {RHTTP} from '../common/realTime-http';

const messages = {
    namespaced: true,
    state: {
        messages: [],
        unreadMessages: 0,
    },
    mutations: {
        setMessage: function (state, fetchedMessages) {
            state.messages = fetchedMessages;
        },
        setUnreadMessages: function (state, newCount) {
            state.unreadMessages = newCount;
        }
    },
    actions: {
        getMessages ({commit}) {
            RHTTP.get('/contact_us/all_message/').then((res)=>{
                if(res.data){
                    commit('setMessage', res.data.result.data);
                    commit('setUnreadMessages', res.data.result.count);
                }else {
                    commit('setMessage', []);
                    commit('setUnreadMessages', 0);
                }
            }).catch((err)=> {
                console.log(err);
            })
        }
    },
    getters: {

    }
};

export default messages;
