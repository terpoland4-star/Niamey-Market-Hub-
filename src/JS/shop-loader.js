// ==========================================
// shop-loader.js – Chargeur de boutique
// Version finale – Sans import dynamique
// ==========================================

async function loadShopConfig() {
    console.log('📡 Chargement de la configuration...');
    
    try {
        let config = null;
        const shopSlug = detectShop();
        
        console.log('🔍 Boutique détectée:', shopSlug);
        
        // Méthode 1 : Utiliser la config déjà chargée (depuis shop-config.js inclus dans HTML)
        if (typeof SHOP_CONFIG !== 'undefined' && SHOP_CONFIG && SHOP_CONFIG.name && SHOP_CONFIG.products && SHOP_CONFIG.products.length > 0) {
            config = SHOP_CONFIG;
            console.log('✅ Config trouvée dans la variable globale');
        }
        
        // Méthode 2 : Config de secours intégrée
        if (!config || !config.name || !config.products || config.products.length === 0) {
            console.log('⚠️ Utilisation de la config de secours');
            config = getEmergencyConfig();
        }
        
        // Appliquer la config
        window.SHOP_CONFIG = config;
        
        // Appliquer les couleurs
        document.documentElement.style.setProperty('--orange', config.primaryColor || '#E05206');
        document.documentElement.style.setProperty('--secondary', config.secondaryColor || '#1B6B93');
        
        // Titre
        if (config.name) {
            document.title = config.name;
        }
        
        console.log('✅ Configuration prête:', config.name);
        console.log('📦 Produits:', (config.products || []).length);
        
        return config;
        
    } catch (error) {
        console.error('❌ Erreur loadShopConfig:', error);
        const config = getEmergencyConfig();
        window.SHOP_CONFIG = config;
        return config;
    }
}

function detectShop() {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('shop')) return params.get('shop');
        return 'boutique-demo';
    }
    
    return 'boutique-demo';
}

function getEmergencyConfig() {
    return {
        slug: 'boutique-demo',
        name: 'Ma Boutique Démo',
        tagline: 'Votre boutique en ligne de confiance',
        description: 'Découvrez notre sélection de produits de qualité à Niamey.',
        logo: 'https://placehold.co/200x200/E05206/white?text=Demo',
        favicon: 'https://placehold.co/96x96/E05206/white?text=Demo',
        primaryColor: '#E05206',
        secondaryColor: '#1B6B93',
        whatsapp: '22786762903',
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
                thumbnail: 'https://placehold.co/600x400/orange/white?text=Smartphone',
                description: 'Smartphone dernière génération avec 128Go de stockage, appareil photo 48MP et batterie longue durée.',
                rating: 4.5
            },
            {
                id: 'demo-2',
                name: 'Robe traditionnelle Wax',
                category: 'mode',
                condition: 'new',
                price: 25000,
                oldPrice: null,
                thumbnail: 'https://placehold.co/600x400/1B6B93/white?text=Robe',
                description: 'Magnifique robe en wax authentique, fabrication artisanale, disponible en plusieurs tailles.',
                rating: 4.8
            },
            {
                id: 'demo-3',
                name: 'Table basse design',
                category: 'maison',
                condition: 'used',
                price: 35000,
                oldPrice: 50000,
                thumbnail: 'https://placehold.co/600x400/8B4513/white?text=Table',
                description: 'Table basse en bois massif, très bon état, idéale pour votre salon.',
                rating: 4.0
            },
            {
                id: 'demo-4',
                name: 'Ordinateur portable reconditionné',
                category: 'electronique',
                condition: 'refurbished',
                price: 200000,
                oldPrice: 300000,
                thumbnail: 'https://placehold.co/600x400/333/white?text=PC',
                description: 'PC portable Core i5, 8Go RAM, 256Go SSD, écran 15 pouces, garantie 6 mois.',
                rating: 4.3
            },
            {
                id: 'demo-5',
                name: 'Chaussures en cuir',
                category: 'mode',
                condition: 'new',
                price: 18000,
                oldPrice: 22000,
                thumbnail: 'https://placehold.co/600x400/654321/white?text=Chaussures',
                description: 'Chaussures en cuir véritable, fabrication artisanale, confort garanti.',
                rating: 4.6
            },
            {
                id: 'demo-6',
                name: 'Canapé 3 places',
                category: 'maison',
                condition: 'new',
                price: 120000,
                oldPrice: null,
                thumbnail: 'https://placehold.co/600x400/2F4F4F/white?text=Canape',
                description: 'Canapé confortable 3 places, tissu résistant, coloris au choix.',
                rating: 4.2
            }
        ]
    };
}
