// Service Worker for Pinyin Reader PWA (Vite build)
const CACHE_NAME = 'pinyin-reader-v2.0.0';
const RUNTIME_CACHE = 'pinyin-reader-runtime';

// Core static files to cache on install
const STATIC_CACHE_URLS = [
    '/pinyin-reader/',
    '/pinyin-reader/index.html',
    '/pinyin-reader/manifest.json',
    '/pinyin-reader/pinyin.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing v2.0.0...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching static assets');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('[Service Worker] Skip waiting');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Cache failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] Claiming clients');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests (except same-origin with /pinyin-reader/ base)
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache the fetched response for runtime
                    // This will cache Vite's generated JS/CSS files
                    caches.open(RUNTIME_CACHE).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }).catch((error) => {
                    console.error('[Service Worker] Fetch failed:', error);

                    // Return offline page for HTML requests
                    if (event.request.headers.get('accept')?.includes('text/html')) {
                        return caches.match('/pinyin-reader/index.html');
                    }
                });
            })
    );
});

// Background sync for future features
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);
    if (event.tag === 'sync-history') {
        event.waitUntil(syncHistory());
    }
});

async function syncHistory() {
    // Placeholder for future history sync functionality
    console.log('[Service Worker] Syncing history...');
}

// Push notification support (for future features)
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push notification received');

    const options = {
        body: event.data ? event.data.text() : 'Nouvelle notification',
        icon: '/pinyin-reader/icons/icon-192x192.png',
        badge: '/pinyin-reader/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Pinyin Reader', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked');
    event.notification.close();

    event.waitUntil(
        clients.openWindow('/pinyin-reader/')
    );
});
