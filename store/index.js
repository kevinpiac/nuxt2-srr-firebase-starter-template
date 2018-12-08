import { getUserFromCookie } from '@/helpers';

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const user = getUserFromCookie(req);
    if (user) {
      await dispatch('auth/setUser', {
        name: user.name,
        email: user.email,
        avatar: user.picture,
        uid: user.user_id,
      });
    }
  },
};
