<template>

  <section class="relative w-full py-10 overflow-hidden flex flex-col justify-center select-none" aria-hidden="true">

    
    <div class="w-full [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">

      <div class="flex w-max animate-marquee hover:[animation-play-state:paused]">

        <div class="flex gap-16 px-8 items-center whitespace-nowrap">
          <template v-for="(tech, index) in technologies" :key="`first-${index}`">

            <span class="text-5xl md:text-7xl font-black uppercase tracking-widest text-transparent stroke-text hover:text-space-200 transition-colors duration-500 cursor-default">
              {{ tech }}
            </span>

            <div class="w-3 h-3 rounded-full bg-space-700/50"></div>
          </template>
        </div>

        <div class="flex gap-16 px-8 items-center whitespace-nowrap">
          <template v-for="(tech, index) in technologies" :key="`second-${index}`">
            <span class="text-5xl md:text-7xl font-black uppercase tracking-widest text-transparent stroke-text hover:text-space-200 transition-colors duration-500 cursor-default">
              {{ tech }}
            </span>
            <div class="w-3 h-3 rounded-full bg-space-700/50"></div>
          </template>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const technologies = [
  'Java', 'Spring Boot', 'PostgreSQL',
  'Kafka', 'RabbitMQ', 'Vue 3',
  'Docker', 'TypeScript', 'Redis'
];
</script>

<style scoped>

.stroke-text {
  -webkit-text-stroke: 1px rgba(113, 113, 122, 0.6);
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {

  animation: scroll 35s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
</style>
