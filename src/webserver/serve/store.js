import Vue from 'vue';
import Vuex from 'vuex';
import  format from './format'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        flag:0,
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
        getFlag(state){
          return  state.flag;
        },

        getUser(state) {
            return state.user;
        }

    },
    mutations: {
        setFlag(state,val){
            state.flag=val;
        },
        setUser (state,info) {
            state.user=info;
        }
    }
})
export  default  store
