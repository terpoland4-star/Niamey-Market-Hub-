// ==========================================
// auth.js – Authentification sécurisée
// Version 2.0 – Mode démo uniquement, prêt pour API
// ==========================================

const Auth = {
    // État de l'authentification
    currentUser: null,
    isAuthenticated: false,
    
    // Configuration
    MODE: 'demo', // 'demo' | 'production'
    
    /**
     * Initialise l'authentification
     */
    init(mode = 'demo') {
        this.MODE = mode;
        
        // Restaurer la session si existe
        this.restoreSession();
        
        console.log('🔐 Auth initialisée en mode:', this.MODE);
        return this;
    },

    /**
     * Restaure la session depuis le localStorage
     */
    restoreSession() {
        const savedUser = safeLocalStorage('auth_user');
        const savedToken = safeLocalStorage('auth_token');
        
        if (savedUser && savedToken) {
            this.currentUser = savedUser;
            this.isAuthenticated = true;
        }
    },

    /**
     * Connexion utilisateur
     * En mode démo : accepte n'importe quel email valide
     * En mode production : appelle l'API
     */
    async login(email, password) {
        // Validation des entrées
        if (!validateEmail(email)) {
            throw new Error('Email invalide');
        }
        if (!password || password.length < 3) {
            throw new Error('Mot de passe trop court (minimum 3 caractères)');
        }

        if (this.MODE === 'demo') {
            return this.demoLogin(email);
        } else {
            return this.apiLogin(email, password);
        }
    },

    /**
     * Connexion mode démo (localStorage uniquement)
     */
    demoLogin(email) {
        const user = {
            id: generateId(),
            email: email,
            full_name: email.split('@')[0],
            role: 'customer',
            created_at: new Date().toISOString()
        };
        
        // Générer un token simple (non sécurisé, pour démo uniquement)
        const token = btoa(JSON.stringify({
            userId: user.id,
            email: user.email,
            exp: Date.now() + (24 * 60 * 60 * 1000) // 24 heures
        }));
        
        this.setSession(user, token);
        
        console.log('✅ Connexion démo réussie:', user.email);
        return { user, token };
    },

    /**
     * Connexion mode production (API)
     */
    async apiLogin(email, password) {
        try {
            const response = await API.post('/auth/login', {
                email,
                password
            });
            
            if (response && response.user && response.token) {
                this.setSession(response.user, response.token);
                return response;
            } else {
                throw new Error('Réponse API invalide');
            }
        } catch (error) {
            console.error('❌ Erreur login API:', error);
            throw new Error(error.message || 'Échec de la connexion');
        }
    },

    /**
     * Inscription
     */
    async register(userData) {
        // Validation
        if (!validateEmail(userData.email)) {
            throw new Error('Email invalide');
        }
        if (!userData.password || userData.password.length < 6) {
            throw new Error('Mot de passe trop court (minimum 6 caractères)');
        }
        if (!userData.full_name || userData.full_name.length < 2) {
            throw new Error('Nom requis');
        }

        if (this.MODE === 'demo') {
            return this.demoRegister(userData);
        } else {
            return this.apiRegister(userData);
        }
    },

    /**
     * Inscription mode démo
     */
    demoRegister(userData) {
        const user = {
            id: generateId(),
            email: userData.email,
            full_name: userData.full_name,
            phone: userData.phone || '',
            role: 'customer',
            created_at: new Date().toISOString()
        };
        
        const token = btoa(JSON.stringify({
            userId: user.id,
            email: user.email,
            exp: Date.now() + (24 * 60 * 60 * 1000)
        }));
        
        this.setSession(user, token);
        
        console.log('✅ Inscription démo réussie:', user.email);
        return { user, token };
    },

    /**
     * Inscription mode production
     */
    async apiRegister(userData) {
        try {
            const response = await API.post('/auth/register', userData);
            
            if (response && response.user && response.token) {
                this.setSession(response.user, response.token);
                return response;
            } else {
                throw new Error('Réponse API invalide');
            }
        } catch (error) {
            console.error('❌ Erreur inscription API:', error);
            throw new Error(error.message || 'Échec de l\'inscription');
        }
    },

    /**
     * Déconnexion
     */
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        
        console.log('👋 Déconnexion réussie');
        
        // Notifier l'application
        window.dispatchEvent(new CustomEvent('auth:logout'));
    },

    /**
     * Définit la session utilisateur
     */
    setSession(user, token) {
        this.currentUser = user;
        this.isAuthenticated = true;
        
        safeLocalStorage('auth_user', user);
        safeLocalStorage('auth_token', token);
        
        // Notifier l'application
        window.dispatchEvent(new CustomEvent('auth:login', { 
            detail: { user, token } 
        }));
    },

    /**
     * Vérifie si le token est expiré
     */
    isTokenExpired() {
        const token = safeLocalStorage('auth_token');
        if (!token) return true;
        
        try {
            const payload = JSON.parse(atob(token));
            return payload.exp && payload.exp < Date.now();
        } catch {
            return true;
        }
    },

    /**
     * Rafraîchit le token
     */
    async refreshToken() {
        if (this.MODE === 'demo') {
            // En mode démo, on régénère simplement
            if (this.currentUser) {
                const token = btoa(JSON.stringify({
                    userId: this.currentUser.id,
                    email: this.currentUser.email,
                    exp: Date.now() + (24 * 60 * 60 * 1000)
                }));
                safeLocalStorage('auth_token', token);
                return token;
            }
            return null;
        }
        
        // Mode production
        try {
            const response = await API.post('/auth/refresh', {
                token: safeLocalStorage('auth_token')
            });
            
            if (response && response.token) {
                safeLocalStorage('auth_token', response.token);
                return response.token;
            }
        } catch (error) {
            console.error('❌ Erreur refresh token:', error);
            this.logout();
        }
        
        return null;
    },

    /**
     * Met à jour le profil utilisateur
     */
    async updateProfile(userData) {
        if (!this.isAuthenticated) {
            throw new Error('Non authentifié');
        }

        if (this.MODE === 'demo') {
            this.currentUser = { ...this.currentUser, ...userData };
            safeLocalStorage('auth_user', this.currentUser);
            return this.currentUser;
        }
        
        try {
            const response = await API.put('/auth/profile', userData);
            if (response && response.user) {
                this.currentUser = response.user;
                safeLocalStorage('auth_user', response.user);
                return response.user;
            }
        } catch (error) {
            console.error('❌ Erreur mise à jour profil:', error);
            throw error;
        }
    }
};

// Initialiser en mode démo par défaut
Auth.init('demo');

// Fonctions de compatibilité pour le code existant
async function login(email, password) {
    return Auth.login(email, password);
}

function logout() {
    Auth.logout();
}

function isAuthenticated() {
    return Auth.isAuthenticated;
}

function getCurrentUser() {
    return Auth.currentUser;
}
