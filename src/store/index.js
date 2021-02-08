import Vue from 'vue'
import Vuex from 'vuex'
import { setStore, getStore } from '@/config/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser: null
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
      setStore('user', user);
    }
  },
  actions: {

  },
  modules: {
  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    },
  }
})
