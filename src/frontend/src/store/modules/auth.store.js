

import { 
  SET_ENTITY
} from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    user: null
  },

  actions: {
    async login({ commit, dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch('getMe');
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(
        SET_ENTITY,
        { module: 'Auth', entity: 'user', value: null },
        { root: true }
      );
    },

    async getMe({ commit, dispatch, state }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          { module: 'Auth', entity: 'user', value: data },
          { root: true }
        );
      } catch {
        dispatch('logout', false);
      }
    }
  },
  getters:{
    isAuthenticated(state){
      if(state.user){
        return true
      }
      return false
    }
  }
};
