<template>
  <section id="about" class="pt-20 pb-4 px-4 max-w-4xl mx-auto w-full scroll-mt-16">
    <h2
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="text-3xl md:text-4xl font-bold mb-10 text-center text-white"
    >
      whoami
    </h2>

    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
      class="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent"
    >
      <div class="absolute inset-0 bg-space-900/40 backdrop-blur-md rounded-3xl z-0"></div>

      <div class="group relative z-10 flex flex-col md:flex-row gap-10 p-8 md:p-10 rounded-[23px] bg-space-900/60 border border-white/5 shadow-2xl">

        <div class="flex flex-col gap-6 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
          <div>
            <span class="text-space-400 text-xs font-mono uppercase tracking-wider">Identity</span>
            <p class="text-white text-xl font-semibold mt-1">Nikita</p>
          </div>
          <div>
            <span class="text-space-400 text-xs font-mono uppercase tracking-wider">Location</span>
            <div class="flex items-center gap-2 mt-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p class="text-white text-lg">Kyiv, Ukraine</p>
            </div>
          </div>
          <div>
            <span class="text-space-400 text-xs font-mono uppercase tracking-wider">Role</span>
            <p class="text-white text-lg mt-1">Backend Developer</p>
          </div>
        </div>

        <div class="w-full md:w-2/3 flex flex-col justify-between">
          <p class="text-space-300 text-lg leading-relaxed mb-8 transition-all duration-500 transform origin-left group-hover:scale-[1.03] group-active:scale-[1.03] group-hover:text-space-50 cursor-default">
            I've been writing Java for about a year now, building a solid grip on the
            <span class="text-white font-medium">Spring ecosystem</span> —
            how Spring Boot, security, and the surrounding pieces fit together in real systems.
            I care about
            <span class="text-white font-medium">data structures and algorithms</span>
            as much as I care about clean, working code, and I'm comfortable with
            <span class="text-white font-medium">Git and Docker</span>
            in everyday development. I'm still early in my journey, but I already think in terms of
            <span class="text-white font-medium">architecture</span>
            — how services should be structured, where responsibilities belong, and how to keep a codebase easy to extend rather than just functional.
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="px-4 py-2 text-xs font-mono text-space-200 bg-space-800/50 border border-space-700/50 rounded-lg transition-colors group-hover:bg-space-700 group-hover:text-white cursor-default"
            >
              {{ tag }}
            </span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const tags = [
  'Java',
  'Spring Boot',
  'Algorithms & Data Structures',
  'Git',
  'Docker',
  'Software Architecture',
];
</script>
