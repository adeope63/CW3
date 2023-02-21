const cacheName = 'after-school-lesson'
const cacheFiles = [
  'index.html',
  'cw2.webmanifest',
  'style.css',
  'js/lessonData.js',
  'assets/computer.png',
  'assets/dance.png',
  'assets/english.png',
  'assets/FMS2.png',
  'assets/FMS.png',
  'assets/math.png',
  'assets/music.png'
]

// CACHING THE FILES IN THE SERVICE WORKER (cacheFiles)
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install')
  e.waitUntil (caches.open(cacheName).then((cache) => {
    console.log('[Service Worker] Caching all files')
    return cache.addAll(cacheFiles)
  }))
})

// CACHING NEW FILES
self.addEventListener('fetch', function (e) {
  e.respondWith(caches.match(e.request).then(function (r) {
    // Download the file if it is not available in the cache
    return r || fetch(e.request).then(function (response) {
      // add the new file to cache
      return caches.open(cacheName).then(function (cache) {
        cache.put(e.request, response.clone())
        return response;
      })
    })
  }))
})