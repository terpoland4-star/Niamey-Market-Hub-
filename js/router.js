// router.js – Routeur avec paramètres
const Router = {
  routes: {},
  params: {},

  init() {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  },

  addRoute(hash, handler) {
    this.routes[hash] = handler;
  },

  resolve() {
    const hash = location.hash.slice(1) || 'home';
    const parts = hash.split('/');
    const baseRoute = parts[0];
    const param = parts[1] || null;
    const query = location.hash.includes('?') ? new URLSearchParams(location.hash.split('?')[1]) : null;

    const handler = this.routes[baseRoute];
    const app = document.getElementById('app');
    if (handler) {
      this.params = { id: param, query };
      handler(app, this.params);
    } else {
      app.innerHTML = '<p>Page introuvable</p>';
    }
  },

  navigate(hash) {
    location.hash = hash;
  }
};
