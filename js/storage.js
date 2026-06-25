// storage.js – Base de données locale
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
      password: btoa(password),
      role,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  },
  authenticate(email, password) {
    const user = this.findUserByEmail(email);
    if (user && user.password === btoa(password)) return user;
    return null;
  },
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
  getProductById(id) {
    return this.getProducts().find(p => p.id === id) || null;
  },

  // --- Commandes ---
  getOrders() {
    return JSON.parse(localStorage.getItem('nmh_orders') || '[]');
  },
  saveOrders(orders) {
    localStorage.setItem('nmh_orders', JSON.stringify(orders));
  },
  addOrder(order) {
    const orders = this.getOrders();
    order.id = Date.now().toString(36);
    order.createdAt = new Date().toISOString();
    orders.push(order);
    this.saveOrders(orders);
    return order;
  },
  getOrdersByUser(userId, role) {
    const orders = this.getOrders();
    if (role === 'seller') return orders.filter(o => o.sellerId === userId);
    else return orders.filter(o => o.buyerId === userId);
  },
  updateOrderStatus(orderId, status) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.saveOrders(orders);
    }
  },

  // --- Panier ---
  getCart() {
    return JSON.parse(localStorage.getItem('nmh_cart') || '[]');
  },
  saveCart(cart) {
    localStorage.setItem('nmh_cart', JSON.stringify(cart));
  }
};
