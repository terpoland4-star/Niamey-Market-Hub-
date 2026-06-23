// app.js – Marketplace locale avec routeur et comptes
(function() {
    // Définir les routes
    Router.addRoute('home', renderHome);
    Router.addRoute('login', renderLogin);
    Router.addRoute('register', renderRegister);
    Router.addRoute('dashboard', renderDashboard);
    Router.addRoute('add-product', renderAddProduct);

    // Lancer le routeur
    Router.init();

    // Mettre à jour les liens de navigation selon la session
    function updateNav() {
        var session = DB.getSession();
        var loginLink = document.getElementById('login-link');
        var registerLink = document.getElementById('register-link');
        var dashboardLink = document.getElementById('dashboard-link');
        if (loginLink) loginLink.style.display = session ? 'none' : 'inline-block';
        if (registerLink) registerLink.style.display = session ? 'none' : 'inline-block';
        if (dashboardLink) dashboardLink.style.display = session ? 'inline-block' : 'none';
    }
    window.addEventListener('hashchange', updateNav);
    updateNav();
})();
