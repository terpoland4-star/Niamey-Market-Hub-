// ==========================================
// Niamey Market Hub – Configuration par défaut (fallback)
// Version 2.0 – Avec validation et schéma
// ==========================================

const SHOP_CONFIG = {
    // ---------- MÉTADONNÉES ----------
    version: '2.0.0',
    schemaVersion: '1.0',
    
    // ---------- IDENTITÉ ----------
    slug: 'default',
    name: 'Niamey Market Hub',
    tagline: 'Votre plateforme de boutiques en ligne',
    description: 'Bienvenue sur Niamey Market Hub, la plateforme qui connecte les commerçants et les clients.',
    
    // ---------- MARQUE ----------
    logo: 'assets/images/logo/default.png',
    favicon: 'assets/favicon-96x96.png',
    primaryColor: '#E05206',
    secondaryColor: '#1B6B93',
    
    // ---------- CONTACT ----------
    whatsapp: '22786762903',
    whatsappMessage: 'Bonjour Niamey Market Hub !',
    email: 'contact@niameymarkethub.com',
    phone: '+227 86 76 29 03',
    address: 'Niamey, Niger',
    googleMaps: '#',
    
    // ---------- RÉSEAUX SOCIAUX ----------
    facebook: '#',
    instagram: '',
    tiktok: '',
    
    // ---------- DÉVELOPPEUR ----------
    developerName: 'Hamadine AG MOCTAR',
    developerTitle: 'Développeur full‑stack & CEO de HAM Global Words',
    developerAddress: 'Tchangarey, Marché de Bétail, Niamey (Niger)',
    developerWhatsapp: '22786762903',
    developerEmail: 'contact@hamglobalwords.com',
    developerLogo: 'assets/images/logo/logoHAM.png',
    
    // ---------- CATÉGORIES ----------
    categories: [
        { key: 'categorie-1', label: 'Catégorie 1' },
        { key: 'categorie-2', label: 'Catégorie 2' },
        { key: 'categorie-3', label: 'Catégorie 3' }
    ],
    
    // ---------- PRODUITS ----------
    products: [
        {
            id: 'default-1',
            name: 'Produit exemple 1',
            category: 'categorie-1',
            condition: 'new',
            price: 15000,
            oldPrice: 20000,
            thumbnail: 'https://placehold.co/600x400?text=Produit+1',
            description: 'Description du produit exemple.',
            rating: 4.5,
            stock: 10,
            available: true
        },
        {
            id: 'default-2',
            name: 'Produit exemple 2',
            category: 'categorie-2',
            condition: 'used',
            price: 8500,
            oldPrice: null,
            thumbnail: 'https://placehold.co/600x400?text=Produit+2',
            description: 'Description du produit exemple.',
            rating: 4.0,
            stock: 5,
            available: true
        }
    ],

    /**
     * Valide la configuration
     * @returns {Object} { valid: boolean, errors: string[] }
     */
    validate() {
        const errors = [];
        
        // Champs obligatoires
        const requiredStrings = ['slug', 'name', 'tagline'];
        requiredStrings.forEach(field => {
            if (!this[field] || typeof this[field] !== 'string') {
                errors.push(`Champ requis manquant: ${field}`);
            }
        });
        
        // Validation slug
        if (this.slug && !/^[a-z0-9-]+$/.test(this.slug)) {
            errors.push('Slug invalide (lettres minuscules, chiffres, tirets uniquement)');
        }
        
        // Validation couleurs
        const colorRegex = /^#[0-9A-Fa-f]{6}$/;
        if (this.primaryColor && !colorRegex.test(this.primaryColor)) {
            errors.push('primaryColor doit être une couleur hex valide (#RRGGBB)');
        }
        if (this.secondaryColor && !colorRegex.test(this.secondaryColor)) {
            errors.push('secondaryColor doit être une couleur hex valide (#RRGGBB)');
        }
        
        // Validation WhatsApp
        if (this.whatsapp && !/^\d{8,15}$/.test(this.whatsapp.replace(/[\s+]/g, ''))) {
            errors.push('Numéro WhatsApp invalide');
        }
        
        // Validation email
        if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
            errors.push('Email invalide');
        }
        
        // Validation produits
        if (!Array.isArray(this.products)) {
            errors.push('products doit être un tableau');
        } else {
            this.products.forEach((product, index) => {
                if (!product.id) errors.push(`Produit #${index + 1}: id requis`);
                if (!product.name) errors.push(`Produit #${index + 1}: name requis`);
                if (typeof product.price !== 'number' || product.price < 0) {
                    errors.push(`Produit #${index + 1}: price invalide`);
                }
                if (product.rating && (product.rating < 0 || product.rating > 5)) {
                    errors.push(`Produit #${index + 1}: rating doit être entre 0 et 5`);
                }
                if (product.condition && !['new', 'used', 'refurbished'].includes(product.condition)) {
                    errors.push(`Produit #${index + 1}: condition invalide (new, used, refurbished)`);
                }
            });
        }
        
        // Validation catégories
        if (!Array.isArray(this.categories)) {
            errors.push('categories doit être un tableau');
        } else {
            const categoryKeys = this.categories.map(c => c.key);
            this.products.forEach((product, index) => {
                if (product.category && !categoryKeys.includes(product.category)) {
                    errors.push(`Produit #${index + 1}: catégorie "${product.category}" non définie`);
                }
            });
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    },

    /**
     * Retourne un produit par son ID
     */
    getProduct(productId) {
        return this.products.find(p => p.id === productId) || null;
    },

    /**
     * Retourne les produits d'une catégorie
     */
    getProductsByCategory(categoryKey) {
        return this.products.filter(p => p.category === categoryKey);
    },

    /**
     * Retourne les produits en promotion
     */
    getDiscountedProducts() {
        return this.products.filter(p => p.oldPrice && p.oldPrice > p.price);
    }
};

// Exporter pour les modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SHOP_CONFIG };
}
