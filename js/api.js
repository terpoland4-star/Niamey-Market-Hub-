
// ==========================================
// api.js – Client API pour Niamey Market Hub
// ==========================================

const API = {
    // Base URL - à configurer selon environnement
    BASE_URL: 'https://api.niameymarkethub.com/v1',
    
    // Timeout par défaut (10 secondes)
    TIMEOUT: 10000,

    /**
     * Initialise l'API avec la config
     */
    init(config = {}) {
        if (config.baseUrl) this.BASE_URL = config.baseUrl;
        if (config.timeout) this.TIMEOUT = config.timeout;
        console.log('🔌 API initialisée:', this.BASE_URL);
    },

    /**
     * Appel API générique
     */
    async call(endpoint, options = {}) {
        const {
            method = 'GET',
            body = null,
            headers = {},
            timeout = this.TIMEOUT,
            useAuth = true
        } = options;

        // Construire l'URL
        const url = `${this.BASE_URL}${endpoint}`;

        // Headers par défaut
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-App-Version': '1.0.0'
        };

        // Ajouter token d'authentification si disponible
        if (useAuth) {
            const token = this.getToken();
            if (token) {
                defaultHeaders['Authorization'] = `Bearer ${token}`;
            }
        }

        // Configuration de la requête
        const fetchOptions = {
            method,
            headers: { ...defaultHeaders, ...headers },
            signal: AbortSignal.timeout(timeout)
        };

        // Ajouter le body si nécessaire
        if (body && method !== 'GET') {
            fetchOptions.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, fetchOptions);

            // Gestion des erreurs HTTP
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const error = new Error(errorData.message || `Erreur HTTP ${response.status}`);
                error.status = response.status;
                error.data = errorData;
                
                // Gestion spéciale 401
                if (response.status === 401) {
                    this.clearAuth();
                    window.dispatchEvent(new CustomEvent('auth:expired'));
                }
                
                throw error;
            }

            // Parser la réponse
            const data = await response.json();
            return data;

        } catch (error) {
            // Gestion timeout
            if (error.name === 'TimeoutError' || error.name === 'AbortError') {
                throw new Error('La requête a expiré. Vérifiez votre connexion.');
            }
            
            // Gestion réseau
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                throw new Error('Impossible de contacter le serveur. Vérifiez votre connexion internet.');
            }
            
            throw error;
        }
    },

    /**
     * Raccourcis pour les méthodes HTTP
     */
    async get(endpoint, options = {}) {
        return this.call(endpoint, { ...options, method: 'GET' });
    },

    async post(endpoint, body, options = {}) {
        return this.call(endpoint, { ...options, method: 'POST', body });
    },

    async put(endpoint, body, options = {}) {
        return this.call(endpoint, { ...options, method: 'PUT', body });
    },

    async delete(endpoint, options = {}) {
        return this.call(endpoint, { ...options, method: 'DELETE' });
    },

    /**
     * Gestion du token d'authentification
     */
    getToken() {
        return safeLocalStorage('auth_token');
    },

    setToken(token) {
        safeLocalStorage('auth_token', token);
    },

    clearAuth() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
    },

    /**
     * Vérifie si l'utilisateur est authentifié
     */
    isAuthenticated() {
        return !!this.getToken();
    },

    /**
     * Vérifie la connexion internet
     */
    async isOnline() {
        if (!navigator.onLine) return false;
        
        try {
            await this.call('/health', { useAuth: false, timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }
};

// Fonction utilitaire pour compatibilité avec le code existant
async function apiCall(endpoint, options = {}) {
    return API.call(endpoint, options);
}
