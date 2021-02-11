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
      localStorage.setItem('uniqueId', user.uniqueId);
      localStorage.setItem('accessToken', user.accessToken);
      localStorage.setItem('tokenExpiresAt', user.tokenExpiresAt);
      localStorage.setItem('idToken', user.idToken);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);
      localStorage.setItem('givenName', user.givenName);
      localStorage.setItem('familyName', user.familyName);
      localStorage.setItem('userPicture', user.userPicture);
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
