import { fileURLToPath, URL } from "url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { VitePWA } from "vite-plugin-pwa"
import vueI18n from "@intlify/vite-plugin-vue-i18n"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueI18n({
            include: path.resolve(__dirname, "./src/locales/**"),
        }),
        VitePWA({
            registerType: "autoUpdate",
            workbox: {
                cleanupOutdatedCaches: false,
                sourcemap: true,
                globPatterns: [
                    "**/*.{woff2,ttf,eot,woff,svg,css,js,jpg,ico,png,webp,html,json,txt}",
                ],
            },
            manifest: {
                name: "streaming-list",
                short_name: "streaming-list",
                display: "standalone",
                theme_color: "#343a40",
                background_color: "#343a40",
                icons: [
                    {
                        src: "img/android-chrome-36x36.png",
                        sizes: "36x36",
                        type: "image/png",
                    },
                    {
                        src: "img/android-chrome-48x48.png",
                        sizes: "48x48",
                        type: "image/png",
                    },
                    {
                        src: "img/android-chrome-72x72.png",
                        sizes: "72x72",
                        type: "image/png",
                    },
                    {
                        src: "img/android-chrome-96x96.png",
                        sizes: "96x96",
                        type: "image/png",
                    },
                    {
                        src: "img/android-chrome-144x144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "img/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "img/android-chrome-256x256.png",
                        sizes: "256x256",
                        type: "image/png",
                    },
                    {
                        src: "img/android-chrome-384x384.png",
                        sizes: "384x384",
                        type: "image/png",
                    },
                    {
                        src: "img/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "img/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "vue-i18n": "vue-i18n/dist/vue-i18n.runtime.esm-bundler.js",
        },
    },
    build: {
        manifest: false,
        minify: true,
        ssrManifest: true,
    },
    server: {
        host: "127.0.0.1",
        port: 3000
    }
})
