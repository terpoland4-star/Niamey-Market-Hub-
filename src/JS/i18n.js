// ==========================================
// Niamey Market Hub – Internationalisation (FR / AR / EN)
// ==========================================

const TRANSLATIONS = {
    fr: {
        siteName: null, // sera remplacé par SHOP_CONFIG.name
        home: 'Accueil',
        cart: 'Panier',
        orders: 'Commandes',
        profile: 'Profil',
        searchPlaceholder: 'Rechercher un produit...',
        addToCart: 'Ajouter',
        emptyCart: 'Panier vide',
        seeProducts: 'Voir les produits',
        back: '← Retour',
        backHome: '← Accueil',
        checkout: 'Finaliser la commande',
        subtotal: 'Sous-total',
        delivery: 'Livraison',
        free: 'Gratuit',
        total: 'Total',
        order: 'Commander',
        confirmOrder: 'Confirmer la commande',
        paymentMethod: 'Mode de paiement',
        zamaniCash: 'Zamani Cash',
        airtelMoney: 'Airtel Money',
        mynita: 'MyNita',
        amanata: 'AmanaTa',
        card: 'Carte Bancaire (Visa/Mastercard)',
        bankTransfer: 'Virement Bancaire',
        cashOnDelivery: 'Espèces à la livraison',
        orderConfirmed: 'Commande confirmée !',
        myOrders: 'Mes commandes',
        noOrders: 'Aucune commande',
        loading: 'Chargement...',
        productNotFound: 'Produit non trouvé',
        errorLoading: 'Erreur de chargement',
        stock: 'Stock',
        inStock: 'En stock',
        outOfStock: 'Rupture',
        aboutTitle: 'À propos',
        contactTitle: 'Contact',
        addressLabel: 'Adresse',
        openMaps: 'Ouvrir dans Google Maps',
        whatsappLabel: 'WhatsApp',
        emailLabel: 'Email',
        followUs: 'Suivez-nous',
        usefulLinks: 'Liens utiles',
        loginTitle: 'Connexion',
        emailPlaceholder: 'Adresse email',
        passwordPlaceholder: 'Mot de passe',
        loginBtn: 'Se connecter',
        registerTitle: 'Créer un compte',
        registerBtn: "S'inscrire",
        fullnamePlaceholder: 'Nom complet',
        createAccount: "Pas encore de compte ? S'inscrire",
        registerSuccess: 'Compte créé avec succès !',
        emailAlreadyUsed: 'Cet email est déjà utilisé.',
        invalidCredentials: 'Email ou mot de passe incorrect.',
        logoutBtn: 'Déconnexion',
        profileTitle: 'Profil',
        namePlaceholder: 'Nom complet',
        addressPlaceholder: 'Adresse complète',
        phoneRequired: 'Téléphone',
        orderDetails: 'Commande',
        status: 'Statut',
        articles: 'Articles',
        addedToCart: 'Produit ajouté au panier',
        errorProduct: 'Erreur',
        noProducts: 'Aucun produit trouvé.',
        discount: '-{discount}%',
        newProducts: 'Produits neufs',
        usedProducts: "Produits d'occasion",
        messagePlaceholder: 'Votre message',
        sendMessage: 'Envoyer le message',
        kycTitle: "Vérification d'identité requise",
        kycDescription: 'Pour les commandes importantes, nous devons vérifier votre identité.',
        kycIdLabel: "Pièce d'identité (CNI, passeport)",
        kycSelfieLabel: "Selfie avec la pièce d'identité",
        kycSend: 'Envoyer pour vérification',
        kycCancel: 'Annuler',
        customerReviews: 'Avis clients',
        noReviews: 'Aucun avis pour le moment.',
        leaveReview: 'Laisser un avis',
        reviewCommentPlaceholder: 'Votre commentaire...',
        submitReview: "Envoyer l'avis",
        reviewSubmitted: 'Avis envoyé !',
        anonymous: 'Anonyme',
        trackOrderTitle: 'Suivi de commande',
        orderNumberPlaceholder: 'Numéro de commande',
        trackOrderBtn: 'Suivre',
        orderNotFoundTrack: 'Commande introuvable.',
        createdAt: 'Date',
        notificationsSubscribe: 'Activer les notifications',
        installTitle: "Ajouter à l'écran d'accueil",
        installSubtitle: 'Installez cette application pour une meilleure expérience',
        installBtn: 'Installer',
        later: 'Plus tard',
        iosInstallStep1: 'Appuyez sur le bouton Partager',
        iosInstallStep2: 'Sélectionnez "Sur l\'écran d\'accueil"',
        iosInstallStep3: 'Puis appuyez sur "Ajouter"',
        close: 'Fermer',
    },
    en: {
        siteName: null,
        home: 'Home',
        cart: 'Cart',
        orders: 'Orders',
        profile: 'Profile',
        searchPlaceholder: 'Search a product...',
        addToCart: 'Add to Cart',
        emptyCart: 'Empty Cart',
        seeProducts: 'See Products',
        back: '← Back',
        backHome: '← Home',
        checkout: 'Checkout',
        subtotal: 'Subtotal',
        delivery: 'Delivery',
        free: 'Free',
        total: 'Total',
        order: 'Order',
        confirmOrder: 'Confirm Order',
        paymentMethod: 'Payment Method',
        zamaniCash: 'Zamani Cash',
        airtelMoney: 'Airtel Money',
        mynita: 'MyNita',
        amanata: 'AmanaTa',
        card: 'Credit Card (Visa/Mastercard)',
        bankTransfer: 'Bank Transfer',
        cashOnDelivery: 'Cash on Delivery',
        orderConfirmed: 'Order Confirmed!',
        myOrders: 'My Orders',
        noOrders: 'No orders',
        loading: 'Loading...',
        productNotFound: 'Product not found',
        errorLoading: 'Error loading',
        stock: 'Stock',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock',
        aboutTitle: 'About',
        contactTitle: 'Contact',
        addressLabel: 'Address',
        openMaps: 'Open in Google Maps',
        whatsappLabel: 'WhatsApp',
        emailLabel: 'Email',
        followUs: 'Follow us',
        usefulLinks: 'Useful links',
        loginTitle: 'Login',
        emailPlaceholder: 'Email address',
        passwordPlaceholder: 'Password',
        loginBtn: 'Log in',
        registerTitle: 'Create an account',
        registerBtn: 'Sign up',
        fullnamePlaceholder: 'Full name',
        createAccount: "Don't have an account? Sign up",
        registerSuccess: 'Account created successfully!',
        emailAlreadyUsed: 'This email is already used.',
        invalidCredentials: 'Invalid email or password.',
        logoutBtn: 'Logout',
        profileTitle: 'Profile',
        namePlaceholder: 'Full Name',
        addressPlaceholder: 'Full Address',
        phoneRequired: 'Phone',
        orderDetails: 'Order',
        status: 'Status',
        articles: 'Items',
        addedToCart: 'Product added to cart',
        errorProduct: 'Error',
        noProducts: 'No products found.',
        discount: '-{discount}%',
        newProducts: 'New products',
        usedProducts: 'Used products',
        messagePlaceholder: 'Your message',
        sendMessage: 'Send message',
        kycTitle: 'Identity verification required',
        kycDescription: 'For large orders, we need to verify your identity.',
        kycIdLabel: 'ID document (National ID, passport)',
        kycSelfieLabel: 'Selfie with ID document',
        kycSend: 'Submit for verification',
        kycCancel: 'Cancel',
        customerReviews: 'Customer reviews',
        noReviews: 'No reviews yet.',
        leaveReview: 'Leave a review',
        reviewCommentPlaceholder: 'Your comment...',
        submitReview: 'Submit review',
        reviewSubmitted: 'Review submitted!',
        anonymous: 'Anonymous',
        trackOrderTitle: 'Order tracking',
        orderNumberPlaceholder: 'Order number',
        trackOrderBtn: 'Track',
        orderNotFoundTrack: 'Order not found.',
        createdAt: 'Date',
        notificationsSubscribe: 'Enable notifications',
        installTitle: 'Add to Home Screen',
        installSubtitle: 'Install this app for a better experience',
        installBtn: 'Install',
        later: 'Later',
        iosInstallStep1: 'Tap the Share button',
        iosInstallStep2: 'Select "Add to Home Screen"',
        iosInstallStep3: 'Then tap "Add"',
        close: 'Close',
    },
    ar: {
        siteName: null,
        home: 'الرئيسية',
        cart: 'السلة',
        orders: 'الطلبات',
        profile: 'الملف الشخصي',
        searchPlaceholder: 'بحث عن منتج...',
        addToCart: 'أضف إلى السلة',
        emptyCart: 'السلة فارغة',
        seeProducts: 'عرض المنتجات',
        back: '← رجوع',
        backHome: '← الرئيسية',
        checkout: 'إتمام الطلب',
        subtotal: 'المجموع الفرعي',
        delivery: 'التوصيل',
        free: 'مجاني',
        total: 'الإجمالي',
        order: 'طلب',
        confirmOrder: 'تأكيد الطلب',
        paymentMethod: 'طريقة الدفع',
        zamaniCash: 'Zamani Cash',
        airtelMoney: 'Airtel Money',
        mynita: 'MyNita',
        amanata: 'AmanaTa',
        card: 'بطاقة بنكية (فيزا/ماستركارد)',
        bankTransfer: 'تحويل بنكي',
        cashOnDelivery: 'الدفع عند الاستلام',
        orderConfirmed: 'تم تأكيد الطلب!',
        myOrders: 'طلباتي',
        noOrders: 'لا توجد طلبات',
        loading: 'جاري التحميل...',
        productNotFound: 'المنتج غير موجود',
        errorLoading: 'خطأ في التحميل',
        stock: 'المخزون',
        inStock: 'متوفر',
        outOfStock: 'نفذ المخزون',
        aboutTitle: 'حول',
        contactTitle: 'اتصل بنا',
        addressLabel: 'العنوان',
        openMaps: 'فتح في خرائط جوجل',
        whatsappLabel: 'واتساب',
        emailLabel: 'البريد الإلكتروني',
        followUs: 'تابعنا',
        usefulLinks: 'روابط مفيدة',
        loginTitle: 'تسجيل الدخول',
        emailPlaceholder: 'البريد الإلكتروني',
        passwordPlaceholder: 'كلمة المرور',
        loginBtn: 'تسجيل الدخول',
        registerTitle: 'إنشاء حساب',
        registerBtn: 'إنشاء حساب',
        fullnamePlaceholder: 'الاسم الكامل',
        createAccount: 'ليس لديك حساب؟ سجل الآن',
        registerSuccess: 'تم إنشاء الحساب بنجاح!',
        emailAlreadyUsed: 'هذا البريد مستخدم بالفعل.',
        invalidCredentials: 'بريد أو كلمة مرور غير صحيحة.',
        logoutBtn: 'تسجيل الخروج',
        profileTitle: 'الملف الشخصي',
        namePlaceholder: 'الاسم الكامل',
        addressPlaceholder: 'العنوان الكامل',
        phoneRequired: 'الهاتف',
        orderDetails: 'الطلب',
        status: 'الحالة',
        articles: 'المنتجات',
        addedToCart: 'تمت الإضافة إلى السلة',
        errorProduct: 'خطأ',
        noProducts: 'لا توجد منتجات.',
        discount: '-{discount}%',
        newProducts: 'منتجات جديدة',
        usedProducts: 'منتجات مستعملة',
        messagePlaceholder: 'رسالتك',
        sendMessage: 'إرسال الرسالة',
        kycTitle: 'التحقق من الهوية مطلوب',
        kycDescription: 'للطلبات الكبيرة، يجب التحقق من هويتك.',
        kycIdLabel: 'وثيقة الهوية (بطاقة وطنية، جواز سفر)',
        kycSelfieLabel: 'صورة سيلفي مع الوثيقة',
        kycSend: 'إرسال للتحقق',
        kycCancel: 'إلغاء',
        customerReviews: 'آراء العملاء',
        noReviews: 'لا توجد آراء حالياً.',
        leaveReview: 'اترك رأياً',
        reviewCommentPlaceholder: 'تعليقك...',
        submitReview: 'إرسال الرأي',
        reviewSubmitted: 'تم إرسال الرأي!',
        anonymous: 'مجهول',
        trackOrderTitle: 'تتبع الطلب',
        orderNumberPlaceholder: 'رقم الطلب',
        trackOrderBtn: 'تتبع',
        orderNotFoundTrack: 'الطلب غير موجود.',
        createdAt: 'التاريخ',
        notificationsSubscribe: 'تفعيل الإشعارات',
        installTitle: 'أضف إلى الشاشة الرئيسية',
        installSubtitle: 'ثبت هذا التطبيق لتجربة أفضل',
        installBtn: 'تثبيت',
        later: 'لاحقاً',
        iosInstallStep1: 'اضغط على زر المشاركة',
        iosInstallStep2: 'اختر "إضافة إلى الشاشة الرئيسية"',
        iosInstallStep3: 'ثم اضغط "إضافة"',
        close: 'إغلاق',
    }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function t(key, params = {}) {
    let text = TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.fr[key] || key;
    Object.keys(params).forEach(p => { text = text.replace(`{${p}}`, params[p]); });
    return text;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : lang === 'en' ? 'en' : 'fr');
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    window.location.reload();
}

function initLanguage() {
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.value = currentLang;
        langSelector.addEventListener('change', (e) => setLanguage(e.target.value));
    }
    // Appliquer la direction RTL si arabe
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
}

// Footer dynamique
function renderFooter() {
    const footer = document.getElementById('footer-app');
    if (!footer) return;
    const cfg = window.SHOP_CONFIG || {};
    footer.innerHTML = `
        <footer class="promo-footer" role="contentinfo">
            <div class="promo-footer-content">
                <div class="promo-left">
                    <h4 style="margin-bottom:0.5rem; color:white;">
                        <img src="${cfg.logo}" alt="${cfg.name}" style="height:24px; width:auto; vertical-align:middle; margin-right:8px;">
                        ${cfg.name}
                    </h4>
                    <p>📍 ${cfg.address}</p>
                    <a href="${cfg.googleMaps}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="color:white; border-color:white; margin-bottom:0.8rem;">
                        <i class="fas fa-map-marker-alt"></i> ${t('openMaps')}
                    </a>
                    <p><a href="https://wa.me/${cfg.whatsapp}" target="_blank" rel="noopener" class="promo-link"><i class="fab fa-whatsapp"></i> +${cfg.whatsapp}</a></p>
                    <p><a href="mailto:${cfg.email}" class="promo-link"><i class="fas fa-envelope"></i> ${cfg.email}</a></p>
                    <div class="useful-links" style="margin-top:1rem;">
                        <h4 style="color:white; margin-bottom:0.5rem;">🔗 ${t('usefulLinks')}</h4>
                        <a href="#/about" class="promo-link" style="display:block; margin-bottom:0.3rem;"><i class="fas fa-info-circle"></i> ${t('aboutTitle')}</a>
                        <a href="#/contact" class="promo-link" style="display:block; margin-bottom:0.3rem;"><i class="fas fa-envelope"></i> ${t('contactTitle')}</a>
                        <a href="#/orders" class="promo-link" style="display:block; margin-bottom:0.3rem;"><i class="fas fa-box"></i> ${t('myOrders')}</a>
                        <a href="#/cart" class="promo-link" style="display:block; margin-bottom:0.3rem;"><i class="fas fa-shopping-cart"></i> ${t('cart')}</a>
                    </div>
                    ${cfg.facebook ? `
                    <div class="social-links" style="margin-top:0.5rem;">
                        <span style="color:white; font-size:0.9rem; margin-right:0.5rem;">${t('followUs')}</span>
                        <a href="${cfg.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                    </div>` : ''}
                </div>
                <div class="promo-right">
                    <img src="${cfg.developerLogo}" alt="HAM Global Words" style="height:50px; border-radius:50px; margin-bottom:1.5rem;">
                    <div class="promo-name">${cfg.developerName}</div>
                    <div class="promo-title">${cfg.developerTitle}</div>
                    <div class="promo-location">${cfg.developerAddress}</div>
                    <div style="margin-top:0.8rem;">
                        <a href="https://wa.me/${cfg.developerWhatsapp}" target="_blank" rel="noopener" class="promo-link"><i class="fab fa-whatsapp"></i> +${cfg.developerWhatsapp}</a><br>
                        <a href="mailto:${cfg.developerEmail}" class="promo-link"><i class="fas fa-envelope"></i> ${cfg.developerEmail}</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}
