import Vue from 'vue';
import { login, getUserFromSession, logout } from '@/api';
import { LOGIN_STATUS } from '@/constants';
import log from '@/utils/log';

const store = {
  state: {
    loginStatus: LOGIN_STATUS.LOGGED_OUT,
    id: null,
    restaurant: null,
  },
  mutations: {
    setLoginStatus(state, { loginStatus, user }) {
      Vue.set(state, 'loginStatus', loginStatus);

      if (loginStatus === LOGIN_STATUS.SUCCESS) {
        Vue.set(state, 'restaurant', user.restaurant);
        Vue.set(state, 'id', user.id);
      } else {
        Vue.set(state, 'restaurant', null);
        Vue.set(state, 'id', null);
      }
    },
  },
  actions: {
    async attemptLogin({ dispatch, commit }, credentials) {
      commit({
        type: 'setLoginStatus',
        loginStatus: LOGIN_STATUS.REQUEST,
      });

      try {
        const user = await login(credentials);

        dispatch('fetchData');

        commit({
          type: 'setLoginStatus',
          loginStatus: LOGIN_STATUS.SUCCESS,
          user,
        });
      } catch (e) {
        commit({
          type: 'setLoginStatus',
          loginStatus: LOGIN_STATUS.FAILED,
        });
      }
    },
    async getUser({ commit }) {
      try {
        const user = await getUserFromSession();

        commit({
          type: 'setLoginStatus',
          loginStatus: LOGIN_STATUS.SUCCESS,
          user,
        });
      } catch (error) {
        log('Could not login from session');
      }
    },
    async logout({ commit }) {
      await logout();

      commit({
        type: 'setLoginStatus',
        loginStatus: LOGIN_STATUS.LOGGED_OUT,
      });
      commit('clearData');
    },
  },
};

export default store;
