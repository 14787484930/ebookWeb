import Vue from 'vue';
import Vuex from 'vuex';
import  format from './format'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        user: {id:''}
    },
    getters:{
        power(state){
            if(state.user==undefined||state.user==null){
                return false;
            }
            else{
                return format.toStr(state.user.id).length>1
            }

        },
        getUser(state) {
            return state.user;
        }

    },
    mutations: {
        setUser (state,info) {
            state.user=info;
        }
    }
})
export  default  store
