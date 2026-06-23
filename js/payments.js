// ==========================================
// payments.js – Gestion des paiements
// Version 2.0 – Intégration API réelle
// ==========================================

const Payments = {
    // Configuration
    config: {
        useLocalData: true, // true = simulation, false = API réelle
        supportedMethods: ['wave', 'orange_money', 'moov_money', 'cash'],
        currency: 'XOF',
        minAmount: 500,
        maxAmount: 10000000
    },

    /**
     * Initialise le module de paiement
     */
    init(config = {}) {
        this.config = { ...this.config, ...config };
        console.log('💳 Paiements initialisés:', this.config);
        return this;
    },

    /**
     * Initie un paiement
     */
    async initiatePayment(orderData) {
        // Validation
        const validation = this.validateOrder(orderData);
        if (!validation.valid) {
            throw new Error(validation.error);
        }

        const {
            orderId,
            amount,
            phone,
            method,
            description = ''
        } = orderData;

        console.log('💳 Initiation paiement:', { orderId, amount, method });

        if (this.config.useLocalData) {
            return this.simulatePayment(orderData);
        } else {
            return this.apiPayment(orderData);
        }
    },

    /**
     * Simulation de paiement (mode développement)
     */
    async simulatePayment(orderData) {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simuler un taux de réussite de 95%
        const success = Math.random() > 0.05;
        
        if (success) {
            const transaction = {
                id: 'TXN-' + generateId().toUpperCase(),
                orderId: orderData.orderId,
                amount: orderData.amount,
                method: orderData.method,
                status: 'completed',
                phone: orderData.phone,
                timestamp: new Date().toISOString(),
                receipt: `RECU-${Date.now().toString(36).toUpperCase()}`
            };
            
            // Sauvegarder dans l'historique
            this.saveTransaction(transaction);
            
            console.log('✅ Paiement simulé réussi:', transaction.id);
            return transaction;
        } else {
            throw new Error('Le paiement a été refusé. Veuillez réessayer.');
        }
    },

    /**
     * Paiement via API réelle
     */
    async apiPayment(orderData) {
        try {
            const response = await API.post('/payments/initiate', {
                order_id: orderData.orderId,
                amount: orderData.amount,
                phone: orderData.phone,
                method: orderData.method,
                description: orderData.description,
                currency: this.config.currency
            });

            if (response && response.status === 'completed') {
                this.saveTransaction(response);
                return response;
            } else if (response && response.status === 'pending') {
                // Paiement en attente (ex: Orange Money)
                return this.pollPaymentStatus(response.id);
            } else {
                throw new Error(response.message || 'Paiement échoué');
            }
        } catch (error) {
            console.error('❌ Erreur paiement API:', error);
            throw new Error(error.message || 'Erreur lors du paiement');
        }
    },

    /**
     * Vérifie le statut d'un paiement en attente
     */
    async pollPaymentStatus(transactionId, maxAttempts = 10, interval = 3000) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            console.log(`🔄 Vérification statut paiement (${attempt}/${maxAttempts})...`);
            
            await new Promise(resolve => setTimeout(resolve, interval));
            
            try {
                const status = await API.get(`/payments/status/${transactionId}`);
                
                if (status.status === 'completed') {
                    this.saveTransaction(status);
                    return status;
                } else if (status.status === 'failed') {
                    throw new Error('Le paiement a échoué');
                }
                // Sinon, continuer à attendre
            } catch (error) {
                if (attempt === maxAttempts) {
                    throw new Error('Délai de paiement dépassé. Veuillez réessayer.');
                }
            }
        }
        
        throw new Error('Délai de paiement dépassé');
    },

    /**
     * Valide une commande avant paiement
     */
    validateOrder(orderData) {
        if (!orderData.orderId) {
            return { valid: false, error: 'ID de commande requis' };
        }
        
        if (!orderData.amount || orderData.amount < this.config.minAmount) {
            return { valid: false, error: `Montant minimum: ${formatPrice(this.config.minAmount)}` };
        }
        
        if (orderData.amount > this.config.maxAmount) {
            return { valid: false, error: `Montant maximum: ${formatPrice(this.config.maxAmount)}` };
        }
        
        if (!validatePhone(orderData.phone)) {
            return { valid: false, error: 'Numéro de téléphone invalide' };
        }
        
        if (!this.config.supportedMethods.includes(orderData.method)) {
            return { valid: false, error: 'Méthode de paiement non supportée' };
        }
        
        return { valid: true };
    },

    /**
     * Sauvegarde une transaction dans l'historique
     */
    saveTransaction(transaction) {
        const history = this.getTransactionHistory();
        history.unshift(transaction);
        
        // Garder les 50 dernières transactions
        const trimmed = history.slice(0, 50);
        safeLocalStorage('payment_history', trimmed);
    },

    /**
     * Récupère l'historique des transactions
     */
    getTransactionHistory() {
        return safeLocalStorage('payment_history') || [];
    },

    /**
     * Récupère une transaction par son ID
     */
    getTransaction(transactionId) {
        const history = this.getTransactionHistory();
        return history.find(t => t.id === transactionId) || null;
    },

    /**
     * Génère un reçu de paiement
     */
    generateReceipt(transaction) {
        if (!transaction) return null;
        
        return {
            transactionId: transaction.id,
            orderId: transaction.orderId,
            amount: transaction.amount,
            method: transaction.method,
            date: transaction.timestamp,
            status: transaction.status,
            receiptNumber: transaction.receipt || `RECU-${transaction.id}`
        };
    },

    /**
     * Calcule les frais de transaction
     */
    calculateFees(amount, method) {
        // Frais simulés (à remplacer par l'API réelle)
        const fees = {
            'wave': 0.01, // 1%
            'orange_money': 0.015, // 1.5%
            'moov_money': 0.012, // 1.2%
            'cash': 0 // Pas de frais pour le cash
        };
        
        const rate = fees[method] || 0;
        return Math.ceil(amount * rate);
    }
};

// Initialiser
Payments.init();

// Fonction de compatibilité
async function initiatePayment(orderId, phone, method) {
    return Payments.initiatePayment({
        orderId,
        phone,
        method,
        amount: 0, // À définir selon le panier
        description: ''
    });
}
