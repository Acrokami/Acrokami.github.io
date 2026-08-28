<template>
  <header
    class="sticky top-0 z-50 w-full border-b transition-all duration-500"
    :class="scrolled
      ? 'bg-space-950/80 backdrop-blur-xl border-space-800 shadow-2xl shadow-black/50'
      : 'bg-transparent border-transparent'"
  >
    <nav class="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
      <a
        href="#top"
        class="font-mono text-xl font-bold tracking-tight text-white hover:text-emerald-400 transition-colors duration-300 flex items-center gap-1"
      >
        <span class="text-emerald-500/90">&lt;</span>Acrokami <span class="text-emerald-500/90">/&gt;</span>
      </a>

      <ul class="hidden md:flex items-center gap-8 text-sm font-medium text-space-200">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="hover:text-emerald-400 transition-colors duration-300 relative group"
          >
            {{ link.label }}
            <span class="absolute -bottom-1 left-0 w-0 h-px bg-emerald-500/60 group-hover:w-full transition-all duration-300"></span>
          </a>
        </li>
      </ul>

      <a
        href="#contact"
        class="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white border border-space-600 bg-transparent hover:bg-space-800/60 hover:border-space-500 transition-all duration-300"
      >
        Get in touch
      </a>

      <button
        class="md:hidden text-space-200 hover:text-emerald-400 p-2 transition-colors duration-300"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
      >
        <Icon :name="menuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="text-2xl" />
      </button>
    </nav>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <ul
        v-if="menuOpen"
        class="md:hidden flex flex-col px-6 pb-6 pt-2 bg-space-950/95 backdrop-blur-xl border-b border-space-800 absolute w-full shadow-2xl"
      >
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            @click="menuOpen = false"
            class="block py-4 text-space-200 hover:text-emerald-400 text-lg transition-colors duration-300 border-b border-space-800/50"
          >
            {{ link.label }}
          </a>
        </li>
        <li class="pt-6">
          <a
            href="#contact"
            @click="menuOpen = false"
            class="flex justify-center items-center py-3.5 rounded-xl font-medium text-white border border-space-600 bg-transparent hover:bg-space-800/60 transition-all duration-300"
          >
            Get in touch
          </a>
        </li>
      </ul>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const menuOpen = ref(false);
const scrolled = ref(false);

const onScroll = () => {
  scrolled.value = window.scrollY > 20;
};

onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>
