import AuthService from "../services/auth.service";

const accessToken = localStorage.getItem("accessToken");
const initialState = accessToken
  ? { status: { loggedIn: true }, accessToken }
  : { status: { loggedIn: false }, accessToken: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (accessToken) => {
          commit("loginSuccess", accessToken);
          return Promise.resolve(accessToken);
        },
        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, accessToken) {
      state.status.loggedIn = true;
      state.accessToken = accessToken;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.accessToken = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.accessToken = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
};
