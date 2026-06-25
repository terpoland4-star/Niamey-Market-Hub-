// app.js – Routeur configuré avec Priorité 1
(function() {
  Router.addRoute('home', renderHome);
  Router.addRoute('login', renderLogin);
  Router.addRoute('register', renderRegister);
  Router.addRoute('dashboard', renderDashboard);
  Router.addRoute('add-product', renderAddProduct);
  Router.addRoute('product', renderProductDetail);
  Router.addRoute('edit-product', renderEditProduct);
  Router.addRoute('orders', renderOrders);

  Router.init();

  function updateNav() {
    const session = DB.getSession();
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const dashboardLink = document.getElementById('dashboard-link');
    const ordersLink = document.getElementById('orders-link');
    if (loginLink) loginLink.style.display = session ? 'none' : 'inline-block';
    if (registerLink) registerLink.style.display = session ? 'none' : 'inline-block';
    if (dashboardLink) dashboardLink.style.display = session ? 'inline-block' : 'none';
    if (ordersLink) ordersLink.style.display = session ? 'inline-block' : 'none';
  }
  window.addEventListener('hashchange', updateNav);
  updateNav();
})();
