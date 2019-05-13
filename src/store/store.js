import Vue from 'vue';
import Vuex from 'vuex';
import  format from '../webserver/serve/format'
//购物车相关
import cart from './modules/cat'
import products from './modules/products'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        flag:0,
        user: {id:''}
    },
    modules:{
        cart,
        products
    },
    getters:{
        power(state){
            if(state.user===undefined||state.user==null){
                return false;
            }
            else{
                return format.toStr(state.user.id).length>1
            }

        },
        /*zxl 2019-04-15 新增权限的判断*/
        power_flag(state){
            return !(state.user === undefined || state.user == null || parseInt(state.user.flag) === 0);

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
    },
    actions: {

    }
})
export  default  store
