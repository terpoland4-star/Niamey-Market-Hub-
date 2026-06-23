// pages.js – Vues de l'application

// --- Page d'accueil ---
function renderHome(app) {
  const products = DB.getProducts();
  app.innerHTML = `
    <h2>Produits disponibles</h2>
    <div class="product-grid" id="product-grid">
      ${products.length === 0 ? '<p>Aucun produit pour le moment.</p>' : products.map(p => `
        <div class="product-card">
          <img src="${p.thumbnail || 'https://placehold.co/300x200/ccc/666?text=Pas+d\'image'}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p class="price-current">${Number(p.price).toLocaleString()} FCFA</p>
          <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}')">Commander</button>
        </div>
      `).join('')}
    </div>
  `;
}

// --- Page de connexion ---
function renderLogin(app) {
  app.innerHTML = `
    <h2>Connexion</h2>
    <form id="login-form">
      <input type="email" id="login-email" placeholder="Email" required>
      <input type="password" id="login-password" placeholder="Mot de passe" required>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
    <p>Pas encore de compte ? <a href="#register">S'inscrire</a></p>
  `;
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const user = DB.authenticate(email, password);
    if (user) {
      DB.setSession(user);
      Router.navigate('dashboard');
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  });
}

// --- Page d'inscription ---
function renderRegister(app) {
  app.innerHTML = `
    <h2>Inscription</h2>
    <form id="register-form">
      <input type="email" id="reg-email" placeholder="Email" required>
      <input type="password" id="reg-password" placeholder="Mot de passe" required>
      <select id="reg-role">
        <option value="buyer">Acheteur</option>
        <option value="seller">Vendeur</option>
      </select>
      <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form>
    <p>Déjà un compte ? <a href="#login">Se connecter</a></p>
  `;
  document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;
    if (DB.findUserByEmail(email)) {
      alert('Cet email est déjà utilisé.');
      return;
    }
    const newUser = DB.createUser(email, password, role);
    DB.setSession(newUser);
    Router.navigate('dashboard');
  });
}

// --- Tableau de bord (après connexion) ---
function renderDashboard(app) {
  const session = DB.getSession();
  if (!session) {
    Router.navigate('login');
    return;
  }
  const products = session.role === 'seller' ? DB.getProductsBySeller(session.id) : [];
  app.innerHTML = `
    <h2>Tableau de bord</h2>
    <p>Connecté en tant que <strong>${session.email}</strong> (${session.role === 'seller' ? 'Vendeur' : 'Acheteur'})</p>
    <button class="btn btn-outline" onclick="logout()">Se déconnecter</button>
    ${session.role === 'seller' ? `
      <h3>Mes produits</h3>
      <button class="btn btn-primary" onclick="Router.navigate('add-product')">Ajouter un produit</button>
      <div id="my-products">
        ${products.length === 0 ? '<p>Vous n\'avez pas encore de produit.</p>' : products.map(p => `
          <div class="product-card">
            <img src="${p.thumbnail || 'https://placehold.co/100x100/ccc/666'}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>${Number(p.price).toLocaleString()} FCFA</p>
            <button class="btn btn-sm btn-outline" onclick="editProduct('${p.id}')">Modifier</button>
            <button class="btn btn-sm btn-danger" onclick="deleteProduct('${p.id}')">Supprimer</button>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

// --- Ajout de produit ---
function renderAddProduct(app) {
  const session = DB.getSession();
  if (!session || session.role !== 'seller') {
    Router.navigate('login');
    return;
  }
  app.innerHTML = `
    <h2>Ajouter un produit</h2>
    <form id="add-product-form">
      <input type="text" id="prod-name" placeholder="Nom du produit" required>
      <input type="number" id="prod-price" placeholder="Prix (FCFA)" required>
      <input type="text" id="prod-thumb" placeholder="URL de l'image (optionnel)">
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
    <button class="btn btn-outline" onclick="Router.navigate('dashboard')">Retour</button>
  `;
  document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const product = {
      name: document.getElementById('prod-name').value,
      price: Number(document.getElementById('prod-price').value),
      thumbnail: document.getElementById('prod-thumb').value || 'https://placehold.co/300x200/ccc/666?text=Produit',
      sellerId: session.id
    };
    DB.addProduct(product);
    Router.navigate('dashboard');
  });
}

// Fonctions globales
function logout() {
  DB.clearSession();
  Router.navigate('home');
}

function addToCart(productId) {
  // simplifié : on redirige vers WhatsApp avec le nom du produit
  const product = DB.getProducts().find(p => p.id === productId);
  if (product) {
    const message = `Bonjour, je suis intéressé par ${product.name} à ${product.price} FCFA.`;
    window.open(`https://wa.me/22786762903?text=${encodeURIComponent(message)}`, '_blank');
  }
}

// (Les fonctions editProduct/deleteProduct seront développées plus tard)
