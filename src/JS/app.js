// ==========================================
// app.js – Point d'entrée principal
// Version 2.1 – Correction initPWA → initInstallBanner
// ==========================================

(async function() {
    console.log('🚀 Niamey Market Hub – Démarrage...');
    
    // État de l'application
    const APP_STATE = {
        ready: false,
        config: null,
        error: null
    };

    try {
        // 1. Initialiser l'internationalisation
        I18n.init();
        
        // 2. Appliquer la langue sauvegardée
        const savedLang = safeLocalStorage('language');
        if (savedLang) {
            I18n.setLang(savedLang);
            const langSelector = document.getElementById('lang-selector');
            if (langSelector) {
                langSelector.value = savedLang;
            }
        }

        // 3. Initialiser l'API
        if (typeof API !== 'undefined' && API.init) {
            API.init({
                baseUrl: 'https://api.niameymarkethub.com/v1',
                timeout: 10000
            });
        }

        // 4. Charger la configuration de la boutique
        console.log('📡 Chargement de la configuration...');
        const config = await loadShopConfig();
        
        if (!config) {
            throw new Error('Impossible de charger la configuration de la boutique');
        }
        
        APP_STATE.config = config;
        window.SHOP_CONFIG = config;
        
        console.log(`✅ Configuration chargée: ${config.name}`);

        // 5. Initialiser le thème
        if (typeof initTheme === 'function') {
            initTheme();
        }

        // 6. Initialiser l'UI avec la config chargée
        UI.init(config);
        
        // 7. Mettre à jour la bannière
        UI.updateBanner();

        // 8. Gérer le sélecteur de langue
        const langSelector = document.getElementById('lang-selector');
        if (langSelector) {
            langSelector.addEventListener('change', (e) => {
                I18n.setLang(e.target.value);
                // Re-render avec la nouvelle langue SANS recharger la page
                if (APP_STATE.config) {
                    UI.init(APP_STATE.config);
                }
            });
        }

        // 9. Écouter les changements de langue i18n
        I18n.onChange((newLang) => {
            console.log('🌐 Langue changée:', newLang);
            if (APP_STATE.config) {
                UI.init(APP_STATE.config);
            }
        });

        // 10. Installation PWA (si supportée) – CORRIGÉ ligne 81
        // Vérifier d'abord initInstallBanner (fonction réelle dans install.js)
        if (typeof initInstallBanner === 'function') {
            initInstallBanner();
        } else if (typeof initPWA === 'function') {
            // Fallback pour rétrocompatibilité
            initPWA();
        }

        // 11. Vérifier la connexion internet
        window.addEventListener('online', () => {
            console.log('🟢 Connexion internet rétablie');
            if (typeof showToast === 'function') {
                showToast('Connexion rétablie', 'success', 2000);
            }
        });
        
        window.addEventListener('offline', () => {
            console.log('🔴 Connexion internet perdue');
            if (typeof showToast === 'function') {
                showToast('Mode hors-ligne', 'info', 3000);
            }
        });

        // 12. Gestion des erreurs globales
        window.addEventListener('error', (event) => {
            console.error('❌ Erreur globale:', event.error);
            if (event.error && event.error instanceof Error) {
                if (typeof showToast === 'function') {
                    showToast('Une erreur est survenue', 'error', 5000);
                }
            }
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('❌ Promesse non gérée:', event.reason);
            if (typeof showToast === 'function') {
                showToast('Erreur inattendue', 'error', 5000);
            }
        });

        // 13. Marquer l'app comme prête
        APP_STATE.ready = true;
        
        // Dispatch un événement pour informer les autres scripts
        window.dispatchEvent(new CustomEvent('app:ready', { 
            detail: { config: APP_STATE.config } 
        }));
        
        console.log('✅ Application prête !');
        console.log(`📦 ${(config.products || []).length} produits chargés`);
        console.log(`🎨 Couleur primaire : ${config.primaryColor}`);
        console.log(`🏪 Boutique : ${config.name}`);

    } catch (error) {
        console.error('❌ Erreur fatale au démarrage:', error);
        
        APP_STATE.error = error;
        
        // Afficher un message d'erreur à l'utilisateur
        const app = document.getElementById('app');
        if (app) {
            const errorMessage = typeof escapeHtml === 'function' 
                ? escapeHtml(error.message || 'Erreur inconnue') 
                : (error.message || 'Erreur inconnue');
                
            app.innerHTML = `
                <div class="error-state" style="padding: 40px; text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #dc3545;" aria-hidden="true"></i>
                    <h2 style="margin: 20px 0; color: var(--text-primary);">${I18n.t('error_loading')}</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">${errorMessage}</p>
                    <button onclick="location.reload()" class="btn btn-primary">
                        <i class="fas fa-redo" aria-hidden="true"></i> ${I18n.t('retry')}
                    </button>
                </div>
            `;
        }
        
        // Dispatch un événement d'erreur
        window.dispatchEvent(new CustomEvent('app:error', { 
            detail: { error } 
        }));
    }

})();
