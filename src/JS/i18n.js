// ==========================================
// i18n.js – Internationalisation
// Version 2.1 – Avec clés iOS install ajoutées
// ==========================================

const I18n = {
    currentLang: 'fr',
    translations: {},
    listeners: [], // Pattern Observer pour éviter reload

    // Langues disponibles
    availableLangs: ['fr', 'en'],

    // Initialisation
    init() {
        this.translations = {
            fr: {
                // Général
                site_title: 'Niamey Market Hub',
                loading: 'Chargement...',
                error_loading: 'Erreur lors du chargement',
                retry: 'Réessayer',
                close: 'Fermer',
                back: 'Retour',
                save: 'Enregistrer',
                cancel: 'Annuler',
                confirm: 'Confirmer',
                search: 'Rechercher...',
                no_results: 'Aucun résultat trouvé',
                
                // Bannière
                banner_text: '🚧 Site en construction – Certaines fonctionnalités peuvent être limitées 🚧',
                
                // Produits
                products: 'Produits',
                all_categories: 'Toutes les catégories',
                filter_by_category: 'Filtrer par catégorie',
                sort_by: 'Trier par',
                sort_default: 'Par défaut',
                sort_price_asc: 'Prix croissant',
                sort_price_desc: 'Prix décroissant',
                sort_rating: 'Meilleure note',
                condition_new: 'Neuf',
                condition_used: 'Occasion',
                condition_refurbished: 'Reconditionné',
                price: 'Prix',
                old_price: 'Ancien prix',
                discount: 'Réduction',
                add_to_cart: 'Ajouter au panier',
                out_of_stock: 'Rupture de stock',
                in_stock: 'En stock',
                product_details: 'Détails du produit',
                description: 'Description',
                
                // Panier
                cart: 'Panier',
                cart_empty: 'Votre panier est vide',
                cart_total: 'Total',
                cart_checkout: 'Commander',
                cart_clear: 'Vider le panier',
                cart_remove: 'Retirer',
                cart_quantity: 'Quantité',
                cart_continue_shopping: 'Continuer les achats',
                
                // Commande
                order_summary: 'Récapitulatif de la commande',
                order_whatsapp: 'Commander via WhatsApp',
                order_message: 'Bonjour, je souhaite commander les produits suivants :',
                order_confirm: 'Confirmer la commande',
                order_success: 'Commande envoyée avec succès !',
                
                // Contact
                contact: 'Contact',
                whatsapp: 'WhatsApp',
                email: 'Email',
                phone: 'Téléphone',
                address: 'Adresse',
                follow_us: 'Suivez-nous',
                
                // Développeur
                developed_by: 'Développé par',
                
                // PWA
                install_app: 'Installer l\'application',
                install_app_desc: 'Installez cette application sur votre écran d\'accueil pour un accès rapide',
                install: 'Installer',
                later: 'Plus tard',
                
                // iOS Install
                ios_install_step1: 'Appuyez sur le bouton Partager',
                ios_install_step2: 'Sélectionnez "Sur l\'écran d\'accueil"',
                ios_install_step3: 'Puis appuyez sur "Ajouter"',
                
                // Thème
                dark_mode: 'Mode sombre',
                light_mode: 'Mode clair',
                high_contrast: 'Contraste élevé',
                font_size: 'Taille du texte',
                
                // Actions
                share: 'Partager',
                share_text: 'Découvrez cette boutique !',
                
                // Pluralisation
                product_zero: 'Aucun produit',
                product_one: '1 produit',
                product_other: '{count} produits',
                result_zero: 'Aucun résultat',
                result_one: '1 résultat',
                result_other: '{count} résultats'
            },
            en: {
                // General
                site_title: 'Niamey Market Hub',
                loading: 'Loading...',
                error_loading: 'Error loading',
                retry: 'Retry',
                close: 'Close',
                back: 'Back',
                save: 'Save',
                cancel: 'Cancel',
                confirm: 'Confirm',
                search: 'Search...',
                no_results: 'No results found',
                
                // Banner
                banner_text: '🚧 Site under construction – Some features may be limited 🚧',
                
                // Products
                products: 'Products',
                all_categories: 'All categories',
                filter_by_category: 'Filter by category',
                sort_by: 'Sort by',
                sort_default: 'Default',
                sort_price_asc: 'Price: low to high',
                sort_price_desc: 'Price: high to low',
                sort_rating: 'Best rating',
                condition_new: 'New',
                condition_used: 'Used',
                condition_refurbished: 'Refurbished',
                price: 'Price',
                old_price: 'Old price',
                discount: 'Discount',
                add_to_cart: 'Add to cart',
                out_of_stock: 'Out of stock',
                in_stock: 'In stock',
                product_details: 'Product details',
                description: 'Description',
                
                // Cart
                cart: 'Cart',
                cart_empty: 'Your cart is empty',
                cart_total: 'Total',
                cart_checkout: 'Checkout',
                cart_clear: 'Clear cart',
                cart_remove: 'Remove',
                cart_quantity: 'Quantity',
                cart_continue_shopping: 'Continue shopping',
                
                // Order
                order_summary: 'Order summary',
                order_whatsapp: 'Order via WhatsApp',
                order_message: 'Hello, I would like to order the following products:',
                order_confirm: 'Confirm order',
                order_success: 'Order sent successfully!',
                
                // Contact
                contact: 'Contact',
                whatsapp: 'WhatsApp',
                email: 'Email',
                phone: 'Phone',
                address: 'Address',
                follow_us: 'Follow us',
                
                // Developer
                developed_by: 'Developed by',
                
                // PWA
                install_app: 'Install app',
                install_app_desc: 'Install this app on your home screen for quick access',
                install: 'Install',
                later: 'Later',
                
                // iOS Install
                ios_install_step1: 'Tap the Share button',
                ios_install_step2: 'Select "Add to Home Screen"',
                ios_install_step3: 'Then tap "Add"',
                
                // Theme
                dark_mode: 'Dark mode',
                light_mode: 'Light mode',
                high_contrast: 'High contrast',
                font_size: 'Font size',
                
                // Actions
                share: 'Share',
                share_text: 'Check out this store!',
                
                // Pluralization
                product_zero: 'No products',
                product_one: '1 product',
                product_other: '{count} products',
                result_zero: 'No results',
                result_one: '1 result',
                result_other: '{count} results'
            }
        };
        
        // Charger la langue sauvegardée
        const savedLang = safeLocalStorage('language');
        if (savedLang && this.availableLangs.includes(savedLang)) {
            this.currentLang = savedLang;
        }
        
        return this;
    },

    /**
     * Traduction simple
     */
    t(key) {
        const text = this.translations[this.currentLang]?.[key] || 
                     this.translations['fr']?.[key] || 
                     key;
        return text;
    },

    /**
     * Traduction avec pluralisation
     */
    tp(key, count) {
        let pluralKey;
        if (count === 0) pluralKey = key + '_zero';
        else if (count === 1) pluralKey = key + '_one';
        else pluralKey = key + '_other';
        
        let text = this.translations[this.currentLang]?.[pluralKey] ||
                   this.translations['fr']?.[pluralKey] ||
                   this.t(key);
        
        return text.replace('{count}', count);
    },

    /**
     * Change la langue SANS recharger la page
     */
    setLang(lang) {
        if (this.availableLangs.includes(lang)) {
            this.currentLang = lang;
            safeLocalStorage('language', lang);
            document.documentElement.lang = lang;
            
            // Notifier les listeners au lieu de recharger
            this.notifyListeners();
        }
    },

    /**
     * Ajoute un listener pour le changement de langue
     */
    onChange(callback) {
        if (typeof callback === 'function') {
            this.listeners.push(callback);
        }
    },

    /**
     * Retire un listener
     */
    offChange(callback) {
        this.listeners = this.listeners.filter(cb => cb !== callback);
    },

    /**
     * Notifie tous les listeners
     */
    notifyListeners() {
        this.listeners.forEach(callback => {
            try {
                callback(this.currentLang);
            } catch (e) {
                console.error('Erreur listener i18n:', e);
            }
        });
    }
};
