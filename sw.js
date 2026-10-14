/* Optional: upload next to Iron-Plan.html when hosting, to make the app work offline. */
var V='ironplan-v1';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url),same=u.origin===location.origin,fonts=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if(!same&&!fonts)return;
  e.respondWith(fetch(r).then(function(res){
    if(res&&(res.ok||res.type==='opaque')){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)})}
    return res;
  }).catch(function(){
    return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match(self.registration.scope)});
  }));
});
