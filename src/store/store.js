import Vue from 'vue';
import Vuex from 'vuex';
import format from '../webserver/serve/format'
// 购物车相关
import cart from './modules/cat'
import products from './modules/products'

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    flag: 0,
    user: {
      id: '',
      flag: 0
    }
  },
  modules: {
    cart,
    products
  },
  getters: {
    /* zxl 2019-04-15 新增权限的判断 */
    powerFlag(state) {
      return !(parseInt(state.user.flag) === 0);
    },
    power(state) {
      return format.toStr(state.user.id).length > 1
    },
    getFlag(state) {
      return state.flag;
    },

    getUser(state) {
      return state.user;
    },

    getUserId(state) {
      return state.user.id
    }

  },
  mutations: {
    setFlag(state, val) {
      state.flag = val;
    },
    setUser(state, info) {
      state.user = info;
    }
  },
  actions: {}
})
export default store
