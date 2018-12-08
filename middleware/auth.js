const auth = ({ store, redirect, app }) => {
  if (!store.getters['auth/isAuthenticated']) {
    return redirect(app.localePath({ name: 'signup' }));
  }
};

export default auth;
