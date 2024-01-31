// обновляем при новой сборке
const CACHE_VERSION = 1;
const CURRENT_CACHE = `cache-${CACHE_VERSION}`;

// что мы изначально хотим закешировать
const cacheFiles = ['/', '/index.html'];

// при активации нового sw удаляем старый кэш
self.addEventListener('activate', (evt) => {
  console.log(`Service worker ${CURRENT_CACHE} activated`);
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CURRENT_CACHE) {
            console.log(`Old service worker ${cacheName} removed`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// при усановке мы загружаем в кэш все файлы из массива cacheFiles
self.addEventListener('install', (evt) =>
  evt.waitUntil(
    caches
      .open(CURRENT_CACHE)
      .then((cache) => {
        return cache.addAll(cacheFiles);
      })
      .then(
        () => {
          console.log(`Service worker ${CURRENT_CACHE} has been updated.`);
        },
        (err) => {
          console.warn(`Failed to update ${CURRENT_CACHE}. ${err}`);
        }
      )
  )
);

// запрос ресурса из сети с таймаутом
const fromNetwork = (request, timeout) =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(request)
      .then((fetchResponse) => {
        clearTimeout(timeoutId);
        return update(request, fetchResponse);
      })
      .then(() => resolve(fetchResponse))
      .catch(reject);
  });

// запрос ресурса из кэша
const fromCache = (request) =>
  caches.open(CURRENT_CACHE).then((cache) => cache.match(request));

// добавить новый ресурс в кэш
const update = (request, fetchResponse) =>
  caches.open(CURRENT_CACHE).then((cache) => {
    cache.put(request, fetchResponse.clone());
    return fetchResponse;
  });

// пытамся загрузить ресурс из сети, если не получается, то из кэша
self.addEventListener('fetch', (ev) => {
  if (ev.request.method !== 'GET') {
    console.log('pass non GET request');
    return;
  }
  console.log(`fetch request for: ${ev.request.url}`);
  ev.respondWith(
    fromNetwork(ev.request, 5000).catch(() => fromCache(ev.request))
  );
  // evt.waitUntil(update(evt.request));
  // ev.respondWith(
  //   caches.match(ev.request).then((cacheRes) => {
  //     console.log(`find in cache: ${cacheRes}`);
  //     return (
  //       cacheRes ||
  //       fetch(ev.request).then((fetchResponse) => {
  //         console.log(`try to fetch: ${fetchResponse}`);
  //         return caches.open(CURRENT_CACHE).then((cache) => {
  //           cache.put(ev.request, fetchResponse.clone());
  //           return fetchResponse;
  //         });
  //       })
  //     );
  //   })
  // );
});
