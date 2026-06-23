// storage.js – Base de données locale (localStorage)

const DB = {
  // --- Utilisateurs ---
  getUsers() {
    return JSON.parse(localStorage.getItem('nmh_users') || '[]');
  },
  saveUsers(users) {
    localStorage.setItem('nmh_users', JSON.stringify(users));
  },
  findUserByEmail(email) {
    return this.getUsers().find(u => u.email === email);
  },
  createUser(email, password, role = 'buyer') {
    const users = this.getUsers();
    const newUser = {
      id: Date.now().toString(36),
      email,
      password: btoa(password), // encodage simple (pas sécurisé, mais suffisant pour démo)
      role,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  },
  authenticate(email, password) {
    const user = this.findUserByEmail(email);
    if (user && user.password === btoa(password)) {
      return user;
    }
    return null;
  },

  // --- Session ---
  getSession() {
    return JSON.parse(localStorage.getItem('nmh_session') || 'null');
  },
  setSession(user) {
    localStorage.setItem('nmh_session', JSON.stringify(user));
  },
  clearSession() {
    localStorage.removeItem('nmh_session');
  },

  // --- Produits ---
  getProducts() {
    return JSON.parse(localStorage.getItem('nmh_products') || '[]');
  },
  saveProducts(products) {
    localStorage.setItem('nmh_products', JSON.stringify(products));
  },
  addProduct(product) {
    const products = this.getProducts();
    product.id = Date.now().toString(36);
    product.createdAt = new Date().toISOString();
    products.push(product);
    this.saveProducts(products);
    return product;
  },
  updateProduct(id, updates) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.saveProducts(products);
    }
  },
  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
  },
  getProductsBySeller(sellerId) {
    return this.getProducts().filter(p => p.sellerId === sellerId);
  },

  // --- Panier (déjà existant, on garde la compatibilité) ---
  getCart() {
    return JSON.parse(localStorage.getItem('nmh_cart') || '[]');
  },
  saveCart(cart) {
    localStorage.setItem('nmh_cart', JSON.stringify(cart));
  }
};
