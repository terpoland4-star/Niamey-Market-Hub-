// ==========================================
// ui.js – Interface utilisateur dynamique
// ==========================================

const UI = {
    config: null,

    init(config) {
        this.config = config;
        this.renderApp();
        this.renderFooter();
        this.updateMetaTags();
        this.updateWhatsApp();
    },

    // ---------- MÉTADONNÉES DYNAMIQUES ----------
    updateMetaTags() {
        document.title = this.config.name;
        
        // Favicon
        const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = this.config.favicon || 'assets/favicon-96x96.png';
        document.head.appendChild(favicon);
        
        // Theme color
        document.querySelector('meta[name="theme-color"]').content = this.config.primaryColor;
        
        // Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = this.config.description;
        
        // Open Graph
        this.updateMetaProperty('og:title', this.config.name);
        this.updateMetaProperty('og:description', this.config.description);
        this.updateMetaProperty('og:image', this.config.logo);
    },

    updateMetaProperty(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    },

    // ---------- APPLICATION PRINCIPALE ----------
    renderApp() {
        const app = document.getElementById('app');
        if (!app) return;

        const config = this.config;
        
        app.innerHTML = `
            <!-- En-tête de la boutique -->
            <header class="shop-header fade-in">
                <img src="${config.logo}" 
                     alt="${config.name}" 
                     class="shop-header__logo"
                     onerror="this.src='https://placehold.co/200x200?text=${encodeURIComponent(config.name.charAt(0))}'">
                <h1 class="shop-header__name">${config.name}</h1>
                <p class="shop-header__tagline">${config.tagline}</p>
            </header>

            <!-- Barre de filtres -->
            <div class="filters-bar fade-in">
                <div class="filters-bar__left">
                    <select id="category-filter" class="toolbar-select">
                        <option value="all">${I18n.t('all_categories')}</option>
                        ${config.categories.map(cat => 
                            `<option value="${cat.key}">${cat.label}</option>`
                        ).join('')}
                    </select>
                    <select id="sort-filter" class="toolbar-select">
                        <option value="default">${I18n.t('sort_default')}</option>
                        <option value="price-asc">${I18n.t('sort_price_asc')}</option>
                        <option value="price-desc">${I18n.t('sort_price_desc')}</option>
                        <option value="rating">${I18n.t('sort_rating')}</option>
                    </select>
                </div>
                <div class="filters-bar__right">
                    <span id="products-count" class="products-count"></span>
                </div>
            </div>

            <!-- Grille produits -->
            <div id="products-grid" class="products-grid fade-in">
                ${this.renderProducts(config.products)}
            </div>

            <!-- Modal produit -->
            <div id="product-modal" class="modal-overlay" style="display: none;">
                <div class="modal">
                    <button class="modal__close" onclick="UI.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                    <div id="modal-content"></div>
                </div>
            </div>
        `;

        // Écouteurs de filtres
        document.getElementById('category-filter')?.addEventListener('change', () => this.filterProducts());
        document.getElementById('sort-filter')?.addEventListener('change', () => this.filterProducts());
        
        // Compteur produits
        this.updateProductsCount(config.products.length);
    },

    // ---------- RENDU DES PRODUITS ----------
    renderProducts(products) {
        if (!products || products.length === 0) {
            return `
                <div class="error-state">
                    <i class="fas fa-box-open" style="font-size: 3rem; opacity: 0.3;"></i>
                    <p>${I18n.t('no_results')}</p>
                </div>
            `;
        }

        return products.map(product => `
            <article class="product-card fade-in" onclick="UI.openProductModal('${product.id}')">
                <div style="position: relative;">
                    <img src="${product.thumbnail}" 
                         alt="${product.name}" 
                         class="product-card__image"
                         loading="lazy"
                         onerror="this.src='https://placehold.co/600x400?text=${encodeURIComponent(product.name)}'">
                    <span class="product-card__badge product-card__badge--${product.condition}">
                        ${getConditionLabel(product.condition)}
                    </span>
                </div>
                <div class="product-card__info">
                    <h3 class="product-card__name">${product.name}</h3>
                    <div class="product-card__price">
                        <span class="product-card__price-current">${formatPrice(product.price)}</span>
                        ${product.oldPrice ? 
                            `<span class="product-card__price-old">${formatPrice(product.oldPrice)}</span>
                             <span style="color: #28a745; font-size: var(--font-size-sm); font-weight: 600;">
                                -${getDiscountPercentage(product.oldPrice, product.price)}%
                             </span>` 
                            : ''}
                    </div>
                    <div class="product-card__rating">
                        ${renderStars(product.rating)}
                        <span style="color: var(--text-secondary); font-size: var(--font-size-sm);">
                            ${product.rating}
                        </span>
                    </div>
                </div>
            </article>
        `).join('');
    },

    // ---------- FILTRAGE ----------
    filterProducts() {
        const categoryFilter = document.getElementById('category-filter')?.value || 'all';
        const sortFilter = document.getElementById('sort-filter')?.value || 'default';
        
        let products = [...this.config.products];
        
        // Filtre catégorie
        if (categoryFilter !== 'all') {
            products = products.filter(p => p.category === categoryFilter);
        }
        
        // Tri
        switch (sortFilter) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                products.sort((a, b) => b.rating - a.rating);
                break;
        }
        
        // Mise à jour de l'affichage
        const grid = document.getElementById('products-grid');
        if (grid) {
            grid.innerHTML = this.renderProducts(products);
        }
        
        this.updateProductsCount(products.length);
    },

    updateProductsCount(count) {
        const countEl = document.getElementById('products-count');
        if (countEl) {
            countEl.textContent = `${count} ${I18n.t('products').toLowerCase()}`;
        }
    },

    // ---------- MODAL PRODUIT ----------
    openProductModal(productId) {
        const product = this.config.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('product-modal');
        const content = document.getElementById('modal-content');
        
        if (!modal || !content) return;

        const whatsappLink = `https://wa.me/${this.config.whatsapp}?text=${encodeURIComponent(
            `${I18n.t('order_message')}\n\n*${product.name}*\n${I18n.t('price')} : ${formatPrice(product.price)}\n\n${this.config.whatsappMessage}`
        )}`;

        content.innerHTML = `
            <img src="${product.thumbnail}" 
                 alt="${product.name}" 
                 style="width: 100%; border-radius: var(--radius-sm); margin-bottom: 20px;"
                 onerror="this.src='https://placehold.co/600x400?text=${encodeURIComponent(product.name)}'">
            
            <span class="product-card__badge product-card__badge--${product.condition}" style="position: static; display: inline-block;">
                ${getConditionLabel(product.condition)}
            </span>
            
            <h2 style="margin: 15px 0 10px; font-size: var(--font-size-2xl);">${product.name}</h2>
            
            <div class="product-card__price" style="margin-bottom: 15px;">
                <span class="product-card__price-current">${formatPrice(product.price)}</span>
                ${product.oldPrice ? `<span class="product-card__price-old">${formatPrice(product.oldPrice)}</span>` : ''}
            </div>
            
            <div class="product-card__rating" style="margin-bottom: 15px;">
                ${renderStars(product.rating)}
                <span>${product.rating}</span>
            </div>
            
            ${product.description ? `
                <div style="margin-bottom: 20px;">
                    <h4>${I18n.t('description')}</h4>
                    <p style="color: var(--text-secondary);">${product.description}</p>
                </div>
            ` : ''}
            
            <a href="${whatsappLink}" 
               target="_blank" 
               rel="noopener" 
               class="btn btn-whatsapp" 
               style="width: 100%;">
                <i class="fab fa-whatsapp"></i>
                ${I18n.t('order_whatsapp')}
            </a>
        `;

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Fermer avec Escape
        document.addEventListener('keydown', this._escHandler);
    },

    closeModal() {
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
        document.removeEventListener('keydown', this._escHandler);
    },

    _escHandler(e) {
        if (e.key === 'Escape') {
            UI.closeModal();
        }
    },

    // ---------- FOOTER ----------
    renderFooter() {
        const footer = document.getElementById('footer-app');
        if (!footer) return;

        const config = this.config;
        const socialLinks = [];
        
        if (config.facebook) socialLinks.push(`<a href="${config.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook fa-lg"></i></a>`);
        if (config.instagram) socialLinks.push(`<a href="${config.instagram}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram fa-lg"></i></a>`);
        if (config.tiktok) socialLinks.push(`<a href="${config.tiktok}" target="_blank" rel="noopener" aria-label="TikTok"><i class="fab fa-tiktok fa-lg"></i></a>`);

        footer.innerHTML = `
            <footer class="shop-footer fade-in">
                <div style="margin-bottom: 20px;">
                    <h3 style="color: var(--orange);">${config.name}</h3>
                    ${config.address ? `<p style="color: var(--text-secondary);"><i class="fas fa-map-marker-alt"></i> ${config.address}</p>` : ''}
                    ${config.phone ? `<p style="color: var(--text-secondary);"><i class="fas fa-phone"></i> ${config.phone}</p>` : ''}
                    ${config.email ? `<p style="color: var(--text-secondary);"><i class="fas fa-envelope"></i> ${config.email}</p>` : ''}
                </div>
                
                ${socialLinks.length ? `
                    <div style="margin-bottom: 20px; display: flex; gap: 15px; justify-content: center;">
                        ${socialLinks.join('')}
                    </div>
                ` : ''}
                
                <div class="shop-footer__dev">
                    <p>${I18n.t('developed_by')} 
                        <strong>${config.developerName}</strong> – ${config.developerTitle}
                    </p>
                    <p style="font-size: var(--font-size-xs);">
                        <i class="fas fa-map-marker-alt"></i> ${config.developerAddress} | 
                        <i class="fab fa-whatsapp"></i> ${config.developerWhatsapp} | 
                        <i class="fas fa-envelope"></i> ${config.developerEmail}
                    </p>
                    ${config.developerLogo ? 
                        `<img src="${config.developerLogo}" alt="Logo développeur" class="shop-footer__dev-logo" onerror="this.style.display='none'">` 
                        : ''}
                </div>
            </footer>
        `;
    },

    // ---------- WHATSAPP ----------
    updateWhatsApp() {
        const link = document.getElementById('whatsappLink');
        const bubble = document.getElementById('whatsappBubble');
        
        if (link) {
            link.href = `https://wa.me/${this.config.whatsapp}?text=${encodeURIComponent(this.config.whatsappMessage)}`;
        }
        
        if (bubble && this.config.name) {
            bubble.textContent = `💬 ${this.config.name}`;
        }
    },

    // ---------- BANNIÈRE ----------
    updateBanner() {
        const banner = document.getElementById('banner-text');
        if (banner) {
            banner.textContent = I18n.t('banner_text');
        }
    }
};
