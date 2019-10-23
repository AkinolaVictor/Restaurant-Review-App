//this variable is created for names of the files to be cached
const staticCacheName = 'v1';
const ToCache = [
        '/',
        'index.html',
        'restaurant.html',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
    ];

    // installai of service worker using event listner
self.addEventListner('install', function(e){
	// processes for installation
	e.waitUntil(
			caches.open(staticCacheName).then(function(cache){
				return cache.addAll(ToCache);
			})
		);

});

//  fetch the events in service worker
self.addEventListner('fetch', function(e){
e.respondWith(
		caches.match(e.request).then(function(response){
			
			if(response){
				return response;
			}else{
				return fetch(e.request).then(function(response){
					caches.open('v1').then(function(cache){
						cache.put(e.request, clonedResponse);
					})
					return response;
				}).catch(function(err){
					console.error(err);
				});
				

			}
		})
	);
});
