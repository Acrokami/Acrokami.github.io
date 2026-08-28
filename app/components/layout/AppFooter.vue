<template>
  <footer class="relative mt-auto">

    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

    <div class="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">


      <div class="flex items-center gap-2 font-mono text-xs text-space-600">
        <span class="text-emerald-500/80">❯</span>
        <span>exit 0</span>
      </div>


      <p class="text-space-600 text-sm font-light">
        © {{ new Date().getFullYear() }} Acrokami.
        
      </p>


      <div class="flex items-center gap-5">
        <a
          v-for="social in socials"
          :key="social.href"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-space-600 hover:text-emerald-400 transition-colors duration-300"
        >
          <Icon :name="social.icon" class="text-lg" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const socials = [
  { href: 'https://github.com/Acrokami', icon: 'mdi:github' },
  { href: 'https://t.me/Acrokami', icon: 'mdi:telegram' },
  { href: 'mailto:acrobtw@gmail.com', icon: 'heroicons:envelope' },
];
</script>
