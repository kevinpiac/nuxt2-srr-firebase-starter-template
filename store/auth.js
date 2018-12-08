import Firebase from '~/plugins/firebase';
import Cookies from 'js-cookie';

export const state = () => ({
  uid: null,
  user: null,
});

export const getters = {
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid;
    else return null;
  },

  user(state) {
    return state.user;
  },

  isAuthenticated(state) {
    return !!state.user && !!state.uid;
  },
};

export const actions = {
  async login({ dispatch, state }, user) {
    console.log('[STORE ACTIONS] - login');
    const token = await Firebase.auth().currentUser.getIdToken(true);
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid,
    };
    Cookies.set('access_token', token); // saving token in cookie for server rendering
    await dispatch('setUser', userInfo);
    await dispatch('saveUID', userInfo.uid);
    console.log('[STORE ACTIONS] - in login, response:', status);
  },

  async logout({ commit, dispatch }) {
    console.log('[STORE ACTIONS] - logout');
    await Firebase.auth().signOut();

    Cookies.remove('access_token');
    commit('setUser', null);
    commit('saveUID', null);
  },

  saveUID({ commit }, uid) {
    console.log('[STORE ACTIONS] - saveUID');
    commit('saveUID', uid);
  },

  setUser({ commit }, user) {
    commit('setUser', user);
  },
};

export const mutations = {
  saveUID(state, uid) {
    console.log('[STORE MUTATIONS] - saveUID:', uid);
    state.uid = uid;
  },

  setUser(state, user) {
    console.log('[STORE MUTATIONS] - setUser:', user);
    state.user = user;
  },
};
