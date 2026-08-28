export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxt/icon'
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  
  build: {
    transpile: ['three']
  },
  vite: {
    optimizeDeps: {
      include: ['three']
    }
  }
})
