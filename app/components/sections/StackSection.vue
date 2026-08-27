<template>
  <section id="stack" class="py-20 px-4 max-w-5xl mx-auto w-full scroll-mt-16">


    <div
      class="py-10 cursor-default"
      @mouseenter="isTitleHovered = true"
      @mouseleave="isTitleHovered = false"
    >
      <h2 class="text-3xl md:text-4xl font-bold text-center text-white transition-all duration-300"
          :class="isTitleHovered ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''">
        Stack
      </h2>
      <div
        class="h-[2px] bg-space-700 mx-auto mt-6 rounded-full transition-all duration-500"
        :class="isTitleHovered ? 'w-48 bg-space-500' : 'w-24'"
      ></div>
    </div>


    <div class="flex flex-wrap justify-center gap-x-20 md:gap-x-24 gap-y-24 mt-4">
      <div
        v-for="(skill, index) in skills"
        :key="skill.name"
        @mouseenter="hoveredSkill = skill.name"
        @mouseleave="hoveredSkill = null"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { duration: 500, delay: index * 50 }
        }"
        class="relative flex flex-col items-center justify-center w-20 h-20 cursor-default"
      >

        <div
          class="absolute inset-0 bg-space-700 rounded-2xl transition-all duration-300 z-0"
          :class="isActive(skill.name) ? 'opacity-100 -translate-x-2.5 -translate-y-2.5' : 'opacity-0'"
        ></div>


        <div
          class="absolute inset-0 bg-space-900 border border-space-600 rounded-2xl transition-all duration-300 z-10 shadow-2xl"
          :class="isActive(skill.name) ? 'opacity-100' : 'opacity-0'"
        ></div>


        <div
          class="relative z-20 flex items-center justify-center w-full h-full text-[3.5rem] transition-all duration-300"
          :class="isActive(skill.name) ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-70'"
        >
          <Icon :name="skill.icon" />
        </div>


        <div
          class="absolute -bottom-12 transition-all duration-300 z-30 pointer-events-none"
          :class="isActive(skill.name) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
        >
          <span class="px-3 py-1.5 text-xs font-bold tracking-wider text-space-100 bg-space-800 border border-space-600 rounded-lg shadow-lg whitespace-nowrap">
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TechSkill {
  name: string;
  icon: string;
}

const skills: TechSkill[] = [
  { name: 'Java', icon: 'skill-icons:java-dark' },
  { name: 'Spring Boot', icon: 'skill-icons:spring-dark' },
  { name: 'PostgreSQL', icon: 'skill-icons:postgresql-dark' },
  { name: 'Redis', icon: 'skill-icons:redis-dark' },
  { name: 'Apache Kafka', icon: 'skill-icons:kafka' },
  { name: 'RabbitMQ', icon: 'skill-icons:rabbitmq-dark' },
  { name: 'Docker', icon: 'skill-icons:docker' },
  { name: 'Vue 3', icon: 'skill-icons:vuejs-dark' },
  { name: 'TypeScript', icon: 'skill-icons:typescript' },
  { name: 'Git', icon: 'skill-icons:git' }
];


const isTitleHovered = ref(false);
const hoveredSkill = ref<string | null>(null);


const isActive = (skillName: string) => {
  return isTitleHovered.value || hoveredSkill.value === skillName;
};
</script>
