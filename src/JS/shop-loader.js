// ==========================================
// shop-loader.js – Détecte et charge la boutique active
// Version 2.1 – Compatible GitHub Pages
// ==========================================

const ShopLoader = {
    cachedConfig: null,
    cacheTimestamp: null,
    CACHE_TTL: 5 * 60 * 1000,

    /**
     * Détecte le slug de la boutique depuis le domaine
     */
    detectShop() {
        const hostname = window.location.hostname;
        
        // Mode développement local
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            const params = getUrlParams();
            if (params.shop && validateShopSlug(params.shop)) {
                return params.shop.toLowerCase();
            }
            return 'boutique-demo';
        }
        
        // GitHub Pages ou production
        return 'boutique-demo';
    },

    /**
     * Charge la configuration de la boutique
     */
    async loadShopConfig() {
        const shopSlug = this.detectShop();
        
        // VALIDATION DE SÉCURITÉ
        if (!validateShopSlug(shopSlug)) {
            console.error('❌ Slug boutique invalide:', shopSlug);
            return this.loadFallbackConfig('Slug boutique invalide');
        }
        
        // Vérifier le cache
        if (this.cachedConfig && this.cacheTimestamp) {
            const age = Date.now() - this.cacheTimestamp;
            if (age < this.CACHE_TTL && this.cachedConfig.slug === shopSlug) {
                console.log('📦 Configuration chargée depuis le cache');
                window.SHOP_CONFIG = this.cachedConfig;
                this.applyTheme();
                return this.cachedConfig;
            }
        }
        
        try {
            let config;
            
            // Essayer de charger le fichier de config
            config = await this.loadFromFile(shopSlug);
            
            // Si pas trouvé, utiliser la config par défaut intégrée
            if (!config) {
                console.warn('⚠️ Fichier config introuvable, utilisation de la config intégrée');
                config = this.getDefaultConfig();
            }
            
            // Valider la configuration
            if (!config.name) {
                return this.loadFallbackConfig('Configuration incomplète');
            }
            
            // Appliquer la configuration
            window.SHOP_CONFIG = config;
            this.applyTheme();
            
            // Mettre en cache
            this.cachedConfig = config;
            this.cacheTimestamp = Date.now();
            
            console.log('✅ Boutique chargée:', config.name);
            return config;
            
        } catch (error) {
            console.error('❌ Erreur chargement boutique:', error);
            return this.loadFallbackConfig(error.message);
        }
    },

    /**
     * Charge la config depuis un fichier
     * CORRIGÉ pour GitHub Pages
     */
    async loadFromFile(shopSlug) {
        const pathsToTry = [];
        
        // Détecter si on est sur GitHub Pages
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        if (isGitHubPages) {
            // GitHub Pages : le repo sert de base
            const repoName = window.location.pathname.split('/')[1] || '';
            pathsToTry.push(
                `../shops/${shopSlug}/shop-config.js`,
                `../../shops/${shopSlug}/shop-config.js`,
                `/${repoName}/shops/${shopSlug}/shop-config.js`,
                `/shops/${shopSlug}/shop-config.js`
            );
        } else {
            pathsToTry.push(
                `../../shops/${shopSlug}/shop-config.js`,
                `../shops/${shopSlug}/shop-config.js`,
                `/shops/${shopSlug}/shop-config.js`
            );
        }
        
        for (const path of pathsToTry) {
            try {
                console.log('🔄 Tentative chargement:', path);
                const configModule = await import(path);
                if (configModule && configModule.SHOP_CONFIG) {
                    console.log('✅ Config chargée depuis:', path);
                    return configModule.SHOP_CONFIG;
                }
            } catch (e) {
                console.log('❌ Échec:', path);
            }
        }
        
        return null;
    },

    /**
     * Configuration par défaut intégrée (hardcodée)
     * Sert de fallback si le fichier est introuvable
     */
    getDefaultConfig() {
        return {
            slug: 'boutique-demo',
            name: 'Ma Boutique Démo',
            tagline: 'Votre boutique en ligne de confiance',
            description: 'Découvrez notre sélection de produits de qualité à Niamey.',
            logo: 'https://placehold.co/200x200?text=Demo',
            favicon: 'https://placehold.co/96x96?text=Demo',
            primaryColor: '#E05206',
            secondaryColor: '#1B6B93',
            whatsapp: '22700000000',
            whatsappMessage: 'Bonjour, je viens de visiter votre boutique !',
            email: 'contact@maboutique.com',
            phone: '+227 00 00 00 00',
            address: 'Niamey, Niger',
            googleMaps: '#',
            facebook: '#',
            instagram: '',
            tiktok: '',
            developerName: 'Hamadine AG MOCTAR',
            developerTitle: 'Développeur full‑stack & CEO de HAM Global Words',
            developerAddress: 'Tchangarey, Marché de Bétail, Niamey (Niger)',
            developerWhatsapp: '22786762903',
            developerEmail: 'contact@hamglobalwords.com',
            developerLogo: '',
            categories: [
                { key: 'electronique', label: 'Électronique' },
                { key: 'mode', label: 'Mode' },
                { key: 'maison', label: 'Maison' }
            ],
            products: [
                {
                    id: 'demo-1',
                    name: 'Smartphone Pro X',
                    category: 'electronique',
                    condition: 'new',
                    price: 150000,
                    oldPrice: 180000,
                    thumbnail: 'https://placehold.co/600x400?text=Smartphone',
                    description: 'Smartphone dernière génération avec 128Go de stockage.',
                    rating: 4.5,
                    stock: 15,
                    available: true
                },
                {
                    id: 'demo-2',
                    name: 'Robe traditionnelle',
                    category: 'mode',
                    condition: 'new',
                    price: 25000,
                    oldPrice: null,
                    thumbnail: 'https://placehold.co/600x400?text=Robe',
                    description: 'Magnifique robe en wax authentique.',
                    rating: 4.8,
                    stock: 20,
                    available: true
                },
                {
                    id: 'demo-3',
                    name: 'Table basse design',
                    category: 'maison',
                    condition: 'used',
                    price: 35000,
                    oldPrice: 50000,
                    thumbnail: 'https://placehold.co/600x400?text=Table',
                    description: 'Table basse en bon état, idéale pour votre salon.',
                    rating: 4.0,
                    stock: 1,
                    available: true
                }
            ]
        };
    },

    /**
     * Charge la configuration de fallback
     */
    async loadFallbackConfig(reason = 'Non spécifié') {
        console.warn('⚠️ Chargement config fallback. Raison:', reason);
        
        const fallbackConfig = this.getDefaultConfig();
        window.SHOP_CONFIG = fallbackConfig;
        this.applyTheme();
        
        return fallbackConfig;
    },

    /**
     * Applique le thème dynamiquement
     */
    applyTheme() {
        if (!window.SHOP_CONFIG) return;
        
        const config = window.SHOP_CONFIG;
        
        document.documentElement.style.setProperty('--orange', config.primaryColor || '#E05206');
        document.documentElement.style.setProperty('--secondary', config.secondaryColor || '#1B6B93');
        
        if (config.name) {
            document.title = config.name;
        }
    },

    /**
     * Recharge la configuration
     */
    async reload() {
        this.cachedConfig = null;
        this.cacheTimestamp = null;
        return this.loadShopConfig();
    }
};

// Fonctions de compatibilité
function detectShop() {
    return ShopLoader.detectShop();
}

async function loadShopConfig() {
    return ShopLoader.loadShopConfig();
}
