// ==========================================
// utils.js – Fonctions utilitaires
// ==========================================

/**
 * Formate un prix en FCFA
 */
function formatPrice(price) {
    if (typeof price !== 'number' || isNaN(price)) return '0 FCFA';
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

/**
 * Génère un ID unique
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Tronque un texte
 */
function truncateText(text, maxLength = 100) {
    if (!text || typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Retourne le libellé de la condition (MANQUANTE - AJOUTÉE)
 */
function getConditionLabel(condition, i18nInstance) {
    const labels = {
        'new': 'Neuf',
        'used': 'Occasion',
        'refurbished': 'Reconditionné'
    };
    
    // Support i18n si disponible
    if (i18nInstance && i18nInstance.t) {
        return i18nInstance.t(`condition_${condition}`) || labels[condition] || condition;
    }
    
    return labels[condition] || condition;
}

/**
 * Calcule la réduction en pourcentage
 */
function getDiscountPercentage(oldPrice, newPrice) {
    if (!oldPrice || oldPrice <= 0 || newPrice >= oldPrice) return 0;
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

/**
 * Génère les étoiles HTML pour le rating (MANQUANTE - AJOUTÉE)
 */
function renderStars(rating) {
    if (typeof rating !== 'number' || rating < 0) rating = 0;
    if (rating > 5) rating = 5;
    
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let html = '';
    for (let i = 0; i < fullStars; i++) html += '<i class="fas fa-star"></i>';
    if (halfStar) html += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < emptyStars; i++) html += '<i class="far fa-star"></i>';
    
    return html;
}

/**
 * Détecte si l'appareil est mobile
 */
function isMobile() {
    return /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) || window.innerWidth < 768;
}

/**
 * Échappe les caractères HTML (XSS prevention - AJOUTÉ)
 */
function escapeHtml(str) {
    if (!str || typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Sauvegarde dans le localStorage avec gestion d'erreur
 */
function safeLocalStorage(key, value) {
    try {
        if (value === undefined) {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.warn('localStorage non disponible:', e);
        return null;
    }
}

/**
 * Copie un texte dans le presse-papier
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (e) {
        console.warn('Presse-papier non disponible:', e);
        return false;
    }
}

/**
 * Debounce une fonction
 */
function debounce(func, delay = 300) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Vérifie si l'application est installée en PWA
 */
function isPWAInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true;
}

/**
 * Obtient les paramètres d'URL
 */
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (const [key, value] of params) {
        obj[key] = value;
    }
    return obj;
}

/**
 * Valide un email (AJOUTÉ)
 */
function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Valide un numéro de téléphone (AJOUTÉ)
 */
function validatePhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const re = /^\+?[\d\s-]{8,15}$/;
    return re.test(phone);
}

/**
 * Valide un slug de boutique (AJOUTÉ - sécurité)
 */
function validateShopSlug(slug) {
    if (!slug || typeof slug !== 'string') return false;
    // N'accepte que lettres minuscules, chiffres et tirets
    return /^[a-z0-9-]+$/.test(slug) && slug.length > 0 && slug.length <= 50;
}

/**
 * Toast notification (AJOUTÉ)
 */
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#1B6B93'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 99999;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}
