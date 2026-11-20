const CACHE='fre-haymanot-pwa-v2';
const SHELL=['./','./Student_ID_App_PWA.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const c=await caches.open(CACHE);for(const u of SHELL){try{await c.add(u)}catch(e){}}await self.skipWaiting()})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(req.mode==='navigate'){event.respondWith((async()=>{try{const fresh=await fetch(req);const c=await caches.open(CACHE);c.put('./Student_ID_App_PWA.html',fresh.clone());return fresh}catch(e){return (await caches.match(req))||(await caches.match('./Student_ID_App_PWA.html'))}})());return;}
 event.respondWith((async()=>{const cached=await caches.match(req);if(cached)return cached;try{const res=await fetch(req);if(res&&(res.ok||res.type==='opaque')){const c=await caches.open(CACHE);c.put(req,res.clone()).catch(()=>{});}return res}catch(e){return cached||Response.error()}})());
});
