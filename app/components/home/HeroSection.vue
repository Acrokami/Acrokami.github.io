<template>
  <section id="top" class="relative flex flex-col items-center justify-center min-h-[85vh] py-16 text-center px-4 overflow-hidden scroll-mt-16">

    <ParticlesBackground />

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[800px] h-[450px] bg-space-900/90 blur-[80px] rounded-full pointer-events-none z-[5]"></div>

    <div class="relative z-10 flex flex-col items-center">

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-space-900/60 text-xs font-mono uppercase tracking-widest text-space-400 mb-8 backdrop-blur-sm"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Open to backend roles
      </div>

      <h1
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }"
        class="text-5xl md:text-7xl font-bold tracking-tight text-space-50 mb-3"
      >
        Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-space-200 to-space-500">Nick</span>
      </h1>

      <h2
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 220 } }"
        class="font-mono text-lg md:text-xl text-violet-400 tracking-wide mb-8"
      >
        &lt;backend_developer /&gt;
      </h2>

      <p
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 340 } }"
        class="text-space-400 max-w-2xl text-xl leading-relaxed mb-10"
      >
        Building scalable, secure, and robust server-side applications.
      </p>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 460 } }"
        class="flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#projects"
          class="px-6 py-3 rounded-xl font-semibold text-space-950 bg-violet-400 hover:bg-violet-300 hover:-translate-y-0.5 transition-all duration-300"
        >
          View Projects
        </a>
        <a
          href="#contact"
          class="px-6 py-3 rounded-xl font-semibold text-space-100 border border-white/10 bg-space-900/40 backdrop-blur-md hover:bg-space-800/60 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300"
        >
          Contact Me
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
