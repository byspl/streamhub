// ===== SERVICE WORKER - BLOQUEADOR DE ADS =====
const VERSION = 'sw-v1';

// Dominios de publicidad a bloquear
const AD_DOMAINS = [
  'doubleclick.net',
  'googlesyndication.com',
  'adservice.google.com',
  'ads.google.com',
  'popads.net',
  'popcash.net',
  'trafficjunky.net',
  'juicyads.com',
  'exoclick.com',
  'trafficstars.com',
  'adsterra.com',
  'propellerads.com',
  'pornvertiser.com',
  'plugrush.com',
  'hilltopads.net',
  'realsrv.com',
  'adspyglass.com',
  'adskeeper.co.uk',
  'clickadu.com',
  'bidvertiser.com',
  'admaven.com',
  'adcash.com',
  'richpush.co',
  'evadav.com',
  'pushnow.net',
  'push.house',
  'megapush.com',
  'pushground.com',
  'adpushup.com',
  'onesignal.com',
  'pushcrew.com',
  'izooto.com',
  'sendpulse.com',
  'gravitec.net',
  'aimtell.com',
  'cdn.pn.vip',
  'img.pn.vip',
  'acpushnet.com',
  'pn.vip',
  'ad.plus',
  'smartadserver.com',
  'rubiconproject.com',
  'openx.net',
  'pubmatic.com',
  'appnexus.com',
  'criteo.com',
  'taboola.com',
  'outbrain.com',
  'mgid.com',
  'revcontent.com',
  'contentad.net',
  'zergnet.com',
  'disqus.com',
  'livechat.com',
  'tawk.to',
  'popunder.ru',
  'adspop.com',
  'popunders.net',
  'justpush.me',
  'web-push-notifications.com',
  'notix.io',
  'gotrackier.com',
  'track.clicksfly.com',
  'go.brmte.com',
  'mdsrv.com',
  'cdn.bmcdn5.com',
  'bmcdn5.com',
  'cdn.bmcdn6.com',
  'bmcdn6.com',
  'pcdn.io',
  'cdn.jsdelivr.net/npm/prebid',
  'securepubads.g.doubleclick.net',
  'pagead2.googlesyndication.com',
  'tpc.googlesyndication.com',
];

// Verificar si una URL pertenece a un dominio de ads
function esAd(url) {
  try {
    const hostname = new URL(url).hostname;
    return AD_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

// Instalar Service Worker
self.addEventListener('install', (e) => {
  console.log('[SW] Instalado');
  self.skipWaiting();
});

// Activar Service Worker
self.addEventListener('activate', (e) => {
  console.log('[SW] Activado');
  e.waitUntil(self.clients.claim());
});

// Interceptar todos los requests
self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Bloquear si es un dominio de ads
  if (esAd(url)) {
    console.log('[SW] Bloqueado:', url);
    e.respondWith(
      new Response('', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      })
    );
    return;
  }

  // Dejar pasar el resto
  e.respondWith(fetch(e.request).catch(() => new Response('')));
});
