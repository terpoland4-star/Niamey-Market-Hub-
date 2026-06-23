// ==========================================
// app.js – Point d'entrée principal
// Version 3.2 – UI.init(config) corrigé
// ==========================================

(function() {
    console.log('🚀 Niamey Market Hub – Démarrage...');

    try {
        // 1. Charger la config boutique
        const config = loadShopConfig();
        window.SHOP_CONFIG = config;
        document.title = config.name || 'Niamey Market Hub';
        console.log('✅ Config:', config.name);

        // 2. i18n
        I18n.init();
        var langSelector = document.getElementById('lang-selector');
        if (langSelector) {
            langSelector.value = I18n.lang;
            langSelector.onchange = function() {
                I18n.setLang(this.value);
                UI.init(config);
            };
        }

        // 3. Theme
        Theme.init();
        document.getElementById('theme-btn').onclick = function() { Theme.toggle(); };
        document.getElementById('contrast-btn').onclick = function() { Theme.toggleContrast(); };
        document.getElementById('font-plus').onclick = function() { Theme.fontUp(); };
        document.getElementById('font-minus').onclick = function() { Theme.fontDown(); };

        // 4. Panier
        Cart.init();

        // 5. UI – AVEC LA CONFIG
        UI.init(config);

        // 6. Bouton panier
        document.getElementById('cart-btn').onclick = function() { UI.openCart(); };

        // 7. Modales
        document.getElementById('modal-close').onclick = function() { UI.closeModal('product-modal'); };
        document.getElementById('cart-modal-close').onclick = function() { UI.closeModal('cart-modal'); };
        document.getElementById('product-modal').onclick = function(e) { if (e.target === this) UI.closeModal('product-modal'); };
        document.getElementById('cart-modal').onclick = function(e) { if (e.target === this) UI.closeModal('cart-modal'); };

        // 8. Échap
        document.onkeydown = function(e) {
            if (e.key === 'Escape') {
                UI.closeModal('product-modal');
                UI.closeModal('cart-modal');
            }
        };

        console.log('✅ Application prête !');
        console.log('📦 ' + (config.products || []).length + ' produits');
        console.log('🏪 ' + config.name);

    } catch (error) {
        console.error('❌ Erreur:', error);
        document.getElementById('app').innerHTML = 
            '<div style="text-align:center;padding:60px 20px;">' +
            '<p style="font-size:3rem;">⚠️</p>' +
            '<h2>Erreur lors du chargement</h2>' +
            '<p style="color:var(--text-light);">' + error.message + '</p>' +
            '<button class="btn btn-primary" onclick="location.reload()" style="margin-top:16px;">🔄 Réessayer</button>' +
            '</div>';
    }
})();
