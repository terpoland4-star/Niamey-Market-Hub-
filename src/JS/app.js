// ==========================================
// app.js – Point d'entrée principal
// ==========================================

(async function() {
    console.log('🚀 Niamey Market Hub – Démarrage...');

    // 1. Initialiser l'internationalisation
    I18n.init();
    
    // 2. Appliquer la langue sauvegardée
    const savedLang = safeLocalStorage('language');
    if (savedLang) {
        I18n.setLang(savedLang);
        const langSelector = document.getElementById('lang-selector');
        if (langSelector) langSelector.value = savedLang;
    }

    // 3. Charger la configuration de la boutique
    await loadShopConfig();
    const config = window.SHOP_CONFIG;
    
    // 4. Initialiser le thème
    initTheme();
    
    // 5. Initialiser l'UI avec la config chargée
    UI.init(config);
    
    // 6. Mettre à jour la bannière
    UI.updateBanner();

    // 7. Gérer le sélecteur de langue
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            I18n.setLang(e.target.value);
            // Re-render avec la nouvelle langue
            UI.init(config);
        });
    }

    // 8. Gestion du clic sur l'overlay modal
    document.addEventListener('click', (e) => {
        if (e.target.id === 'product-modal') {
            UI.closeModal();
        }
    });

    // 9. Installation PWA (si supportée)
    initPWA();

    // 10. Notification de succès
    console.log(`✅ ${config.name} est prêt !`);
    console.log(`📦 ${config.products.length} produits chargés`);
    console.log(`🎨 Couleur primaire : ${config.primaryColor}`);

})();
