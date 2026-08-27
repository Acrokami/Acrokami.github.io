<template>
  <section class="pt-4 pb-20 px-4 max-w-4xl mx-auto w-full">
    <a
      href="https://leetcode.com/u/Acrokami/"
      target="_blank"
      rel="noopener noreferrer"
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      class="group relative flex items-center justify-between p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent transition-all duration-500 overflow-hidden cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]"
    >
      <div class="absolute inset-0 bg-space-900/40 backdrop-blur-md rounded-3xl z-0 group-hover:bg-space-800/40 transition-colors duration-500"></div>

      <div class="relative z-10 flex flex-col md:flex-row items-center justify-between w-full p-6 md:p-8 rounded-[23px] bg-space-900/80 border border-white/5 group-hover:border-white/10 transition-all duration-500">

        <div class="flex items-center gap-6 mb-6 md:mb-0">
          <div class="relative flex items-center justify-center w-14 h-14 rounded-xl bg-space-950 border border-space-800 group-hover:border-space-600 transition-all duration-500">
            <div class="absolute inset-0 bg-white/5 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Icon name="simple-icons:leetcode" class="text-3xl text-space-500 group-hover:text-space-200 transition-colors duration-500 relative z-10" />
          </div>
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h3 class="text-xl font-bold text-space-100 group-hover:text-white transition-colors duration-300">
                LeetCode Profile
              </h3>
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-space-800/50 text-space-400 border border-space-700/50">
                Acrokami
              </span>
            </div>
            <p class="text-sm text-space-400/80">
              Data Structures, Algorithms & Problem Solving
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 text-space-400 font-medium group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
          <span class="text-sm uppercase tracking-wider font-bold">View Profile</span>
          <Icon name="heroicons:arrow-right-20-solid" class="text-xl" />
        </div>

      </div>
    </a>
  </section>
</template>
