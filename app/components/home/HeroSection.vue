<template>
  <section id="top" class="relative flex items-center justify-center min-h-[90vh] py-20 px-6 max-w-6xl mx-auto overflow-hidden scroll-mt-16">

    <ParticlesBackground />

    <div class="absolute inset-0 bg-gradient-to-r from-space-950 via-space-950/95 to-space-950/60 lg:to-transparent pointer-events-none z-[5]"></div>
    <div class="absolute inset-0 bg-space-950/20 pointer-events-none z-[5]"></div>

    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

      <div class="lg:col-span-8 xl:col-span-7 flex flex-col items-start text-left">

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="flex items-center gap-2 mb-7 font-mono text-xs md:text-sm bg-space-950/60 px-3.5 py-1.5 rounded-lg border border-space-800/80 backdrop-blur-md"
        >
          <span class="text-space-500">~/acrokami</span>
          <span class="text-emerald-500">❯</span>
          <span class="text-space-300">./start.sh</span>
          <span class="w-1.5 h-3.5 bg-emerald-500/80 animate-pulse ml-1"></span>
        </div>

        <h1
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }"
          class="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-space-100 mb-4 drop-shadow-md"
        >
          Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-space-100 to-space-400">Nick</span>
        </h1>

        <h2
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 220 } }"
          class="font-mono text-lg md:text-xl text-space-400 tracking-wide mb-6"
        >
          <span class="text-emerald-500">&lt;</span>
          Backend Developer
          <span class="text-emerald-500">/&gt;</span>
        </h2>

        <p
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 340 } }"
          class="text-space-300 max-w-lg text-lg md:text-xl leading-relaxed mb-10 font-light drop-shadow-md"
        >
          Crafting high-load backend systems with <span class="text-space-100 font-medium">Java</span> and the <span class="text-space-100 font-medium">Spring</span> ecosystem.
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 460 } }"
          class="flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            class="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-space-950 bg-space-200 hover:bg-white hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-black/20"
          >
            View Projects
            <Icon name="heroicons:arrow-right-20-solid" class="text-lg group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            class="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-space-300 border border-space-700 bg-space-900/60 backdrop-blur-md hover:bg-space-800/80 hover:text-white hover:border-space-500 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Icon name="heroicons:envelope" class="text-lg opacity-70 group-hover:opacity-100 transition-opacity" />
            Contact Me
          </a>
        </div>

        <!-- Live Status Pills -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 580 } }"
          class="mt-8 flex flex-wrap items-center gap-2.5 font-mono text-[11px] md:text-xs"
        >
          <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-space-950/60 border border-emerald-500/20 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.08)]">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Available for hire
          </span>

          <span class="px-3 py-1.5 rounded-full bg-space-950/50 border border-space-800/50 transition-colors duration-500" :class="latency < 30 ? 'text-emerald-400/80' : 'text-amber-400/80'">
            Response: ~{{ latency }}ms
          </span>

          <span class="px-3 py-1.5 rounded-full bg-space-950/50 border border-space-800/50 text-space-500">
            Kyiv, EEST · {{ currentTime }}
          </span>

          <span class="px-3 py-1.5 rounded-full bg-space-950/50 border border-space-800/50 text-space-600">
            Session: {{ sessionTime }}
          </span>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 700, delay: 700 } }"
          class="flex items-center gap-2 mt-6 font-mono text-xs text-space-500 bg-space-950/40 px-3 py-1 rounded-md border border-space-900"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_7px_rgba(52,211,153,0.7)]"></span>
          <span>available for backend opportunities</span>
        </div>

      </div>

      <div class="lg:col-span-4 xl:col-span-5 hidden lg:block pointer-events-none"></div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');
const sessionTime = ref('00:00');
const latency = ref(12);

let heroIntervals: ReturnType<typeof setInterval>[] = [];
let heroStart = Date.now();

const updateClock = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const updateSession = () => {
  const s = Math.floor((Date.now() - heroStart) / 1000);
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  sessionTime.value = `${m}:${sec}`;
};

onMounted(() => {
  updateClock();
  heroIntervals.push(setInterval(updateClock, 1000));
  heroIntervals.push(setInterval(updateSession, 1000));
  heroIntervals.push(setInterval(() => {
    latency.value = Math.floor(8 + Math.random() * 28);
  }, 2000));
});

onUnmounted(() => {
  heroIntervals.forEach(clearInterval);
});
</script>
