if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const a=e=>n(e,o),l={module:{uri:o},exports:c,require:a};i[o]=Promise.all(s.map((e=>l[e]||a(e)))).then((e=>(r(...e),c)))}}define(["./workbox-56a10583"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/Courgette-Regular-min-2359c176.woff2",revision:null},{url:"assets/external-2e5beca4.svg",revision:null},{url:"assets/index-22a7906d.js",revision:null},{url:"assets/index-cde04f42.css",revision:null},{url:"assets/twitch-6c582fd6.svg",revision:null},{url:"assets/up-62b27b4a.svg",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"assets/x-a8bb1f61.svg",revision:null},{url:"favicon/android-chrome-192x192.png",revision:"ed89ed5ec69774e8cbe08c1e7e4fe87c"},{url:"favicon/android-chrome-512x512-maskable.png",revision:"85fb5f881d09dafed2370b6382ec5107"},{url:"favicon/android-chrome-512x512.png",revision:"52ca151f5bbfb9f52e601a20a2f4fecd"},{url:"favicon/apple-touch-icon.png",revision:"c178cc53ae097da35072f083fe7bad3d"},{url:"favicon/icon.svg",revision:"58b778e208a68491360b08c44c4439fe"},{url:"index.html",revision:"22bcecc91a11e813c195af8f8f4123cc"},{url:"favicon/android-chrome-192x192.png",revision:"ed89ed5ec69774e8cbe08c1e7e4fe87c"},{url:"favicon/android-chrome-512x512.png",revision:"52ca151f5bbfb9f52e601a20a2f4fecd"},{url:"favicon/android-chrome-512x512-maskable.png",revision:"85fb5f881d09dafed2370b6382ec5107"},{url:"manifest.webmanifest",revision:"50017d1d6947b0709919991f3a86a749"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
