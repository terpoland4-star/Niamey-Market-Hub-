// ==========================================
// Service Worker – Niamey Market Hub
// Version 2.0 – Cache optimisé avec stratégie Network First
// ==========================================

const CACHE_NAME = 'niamey-market-hub-v2';
const RUNTIME_CACHE = 'niamey-market-hub-runtime-v2';

// Ressources à pré-cacher
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/utils.js',
    '/js/i18n.js',
    '/js/shop-config.js',
    '/js/shop-loader.js',
    '/js/api.js',
    '/js/auth.js',
    '/js/theme.js',
    '/js/cart.js',
    '/js/payments.js',
    '/js/install.js',
    '/js/ui.js',
    '/js/app.js',
    '/manifest.json',
    '/assets/images/logo/default.png',
    '/assets/favicon-96x96.png'
];

// Installation – mise en cache des assets critiques
self.addEventListener('install', (event) => {
    console.log('⚙️ Service Worker: Installation...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Service Worker: Mise en cache des assets...');
                return Promise.allSettled(
                    PRECACHE_ASSETS.map(url => 
                        cache.add(url).catch(err => {
                            console.warn(`⚠️ Échec cache: ${url}`, err);
                        })
                    )
                );
            })
            .then(() => {
                console.log('✅ Service Worker: Installation terminée');
                return self.skipWaiting();
            })
    );
});

// Activation – nettoyage des anciens caches
self.addEventListener('activate', (event) => {
    console.log('🟢 Service Worker: Activation...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                const validCaches = [CACHE_NAME, RUNTIME_CACHE];
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (!validCaches.includes(cacheName)) {
                            console.log('🗑️ Service Worker: Suppression ancien cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker: Activé');
                return self.clients.claim();
            })
    );
});

// Stratégie : Network First avec fallback cache + page offline
self.addEventListener('fetch', (event) => {
    // Ignorer requêtes non GET
    if (event.request.method !== 'GET') return;
    
    // Ignorer les requêtes API externes
    const url = new URL(event.request.url);
    if (url.hostname.includes('onesignal.com') || 
        url.hostname.includes('google-analytics.com') ||
        url.hostname.includes('api.niameymarkethub.com')) {
        return;
    }

    // Stratégie Network First pour les pages HTML
    if (event.request.mode === 'navigate') {
        event.respondWith(
            networkFirstWithOfflineFallback(event.request)
        );
        return;
    }

    // Stratégie Cache First pour les assets statiques (CSS, JS, images)
    if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?)$/)) {
        event.respondWith(
            cacheFirstWithNetworkUpdate(event.request)
        );
        return;
    }

    // Stratégie Network First pour tout le reste
    event.respondWith(
        networkFirstWithCacheFallback(event.request)
    );
});

/**
 * Stratégie Network First avec page offline
 */
async function networkFirstWithOfflineFallback(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Mettre en cache si réponse valide
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Essayer le cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Page offline
        const offlinePage = await caches.match('/');
        if (offlinePage) {
            return offlinePage;
        }
        
        // Message d'erreur minimal
        return new Response(
            '<h1>Hors-ligne</h1><p>Veuillez vérifier votre connexion internet.</p>',
            {
                status: 503,
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            }
        );
    }
}

/**
 * Stratégie Cache First avec mise à jour réseau en arrière-plan
 */
async function cacheFirstWithNetworkUpdate(request) {
    const cachedResponse = await caches.match(request);
    
    // Mettre à jour le cache en arrière-plan
    const networkUpdate = fetch(request)
        .then(response => {
            if (response && response.status === 200) {
                caches.open(RUNTIME_CACHE).then(cache => {
                    cache.put(request, response.clone());
                });
            }
        })
        .catch(() => {});
    
    // Retourner le cache immédiatement s'il existe
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // Sinon attendre le réseau
    try {
        const networkResponse = await fetch(request);
        return networkResponse;
    } catch (error) {
        return new Response('', { status: 408 });
    }
}

/**
 * Stratégie Network First avec fallback cache
 */
async function networkFirstWithCacheFallback(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        return cachedResponse || new Response('', { status: 408 });
    }
}

// Gestion des notifications push
self.addEventListener('push', (event) => {
    if (!event.data) return;

    try {
        const data = event.data.json();
        
        const options = {
            body: data.body || 'Nouvelle notification',
            icon: data.icon || '/assets/icons/icon-192x192.png',
            badge: '/assets/icons/icon-96x96.png',
            vibrate: [200, 100, 200],
            data: {
                url: data.url || '/',
                timestamp: Date.now()
            },
            actions: data.actions || []
        };

        event.waitUntil(
            self.registration.showNotification(
                data.title || 'Niamey Market Hub',
                options
            )
        );
    } catch (e) {
        console.error('Erreur notification push:', e);
    }
});

// Clic sur notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const url = event.notification.data?.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(windowClients => {
                // Chercher un onglet déjà ouvert
                const existingClient = windowClients.find(
                    client => client.url === url && 'focus' in client
                );
                
                if (existingClient) {
                    return existingClient.focus();
                }
                
                // Ouvrir un nouvel onglet
                return clients.openWindow(url);
            })
    );
});

// Message depuis l'application
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                caches.delete(cacheName);
            });
        });
    }
});
