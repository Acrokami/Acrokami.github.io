<template>
  <section id="projects" class="py-20 px-4 max-w-6xl mx-auto w-full scroll-mt-16">
    <h2
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
    >
      Featured Projects
    </h2>

    
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
      class="flex flex-wrap justify-center gap-3 mb-14"
    >
      <button
        v-for="filter in filters"
        :key="filter"
        @click="activeFilter = filter"
        :class="[
          'flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300',
          activeFilter === filter
            ? 'bg-space-800 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
            : 'bg-space-900/60 border-white/5 text-space-400 hover:bg-space-800/80 hover:text-space-200 hover:border-white/10'
        ]"
      >
        <span v-if="filter !== 'All'" :class="['w-2 h-2 rounded-full', getLanguageColor(filter)]"></span>
        {{ filter }}
      </button>
    </div>


    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <article
        v-for="(project, index) in filteredProjects"
        :key="project.title"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
        class="group relative flex flex-col p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
      >

        <div class="absolute inset-0 bg-space-900/80 backdrop-blur-md rounded-3xl z-0 group-hover:bg-space-800/90 transition-colors duration-500"></div>


        <div class="relative z-10 flex flex-col h-full p-8 rounded-[23px] bg-space-900/40 border border-white/5 group-hover:border-white/10 transition-all duration-500">

          <div class="flex justify-between items-start mb-8">
            <div class="flex items-center gap-4">
              <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-space-950 border border-space-800 group-hover:border-space-600 transition-all duration-500 shadow-inner">
                <Icon name="heroicons:server-stack" class="text-2xl text-space-400 group-hover:text-white transition-colors duration-300" />
              </div>


              <div v-if="project.inDevelopment" class="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-space-950/50 border border-space-800/80">
                <span class="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                <span class="text-xs font-mono font-bold text-space-300 uppercase tracking-widest">In Dev</span>
              </div>
            </div>

            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              class="flex items-center justify-center w-10 h-10 rounded-full bg-space-800/50 text-space-400 hover:bg-white hover:text-space-950 transition-all duration-300"
              title="View Source"
            >
              <Icon name="mdi:github" class="text-2xl" />
            </a>
          </div>

          <div class="flex-grow">
            <h3 class="text-2xl font-bold text-space-50 group-hover:text-white transition-colors duration-300 mb-3 tracking-tight">
              {{ project.title }}
            </h3>
            <p class="text-space-400 leading-relaxed text-sm md:text-base">
              {{ project.description }}
            </p>
          </div>

          <div class="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors duration-500">
            <span
              v-for="tech in project.techStack"
              :key="tech"
              class="px-3 py-1 text-xs font-mono font-medium text-space-300 bg-space-950/50 border border-space-800/80 rounded-md"
            >
              {{ tech }}
            </span>
          </div>

        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  primaryLanguage: string;
  inDevelopment?: boolean;
}

const projects: Project[] = [
  {
    title: 'Elei Gamification Platform',
    description: 'High-load productivity platform transforming routine tasks into a structured gaming process with an XP system, dynamic leveling, and a secure internal economy based on DDD architecture.',
    techStack: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'Vue 3'],
    githubUrl: 'https://github.com/Acrokami/Elei',
    primaryLanguage: 'Java'
  },
  {
    title: 'FraudGuard System',
    description: 'Financial fraud detection integration system utilizing message brokers for complex event processing. Implemented rigorous validation flows using Awaitility for asynchronous testing.',
    techStack: ['Java', 'Spring Boot', 'Apache Kafka', 'Integration Testing'],
    githubUrl: 'https://github.com/Acrokami',
    primaryLanguage: 'Java',
    inDevelopment: true
  },
  {
    title: 'Real-time Messanger',
    description: 'Full-stack messaging application featuring real-time bi-directional communication, custom WebSocket routing, and a responsive dark-themed UI built with modern frontend tooling.',
    techStack: ['Spring Boot', 'STOMP WebSockets', 'Vue 3', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Acrokami',
    primaryLanguage: 'TypeScript',
    inDevelopment: true
  }
];

const filters = ['All', 'Java', 'TypeScript', 'Vue 3'];
const activeFilter = ref('All');

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects;
  }
  return projects.filter(project => project.primaryLanguage.includes(activeFilter.value) || project.techStack.includes(activeFilter.value));
});

const getLanguageColor = (lang: string) => {
  switch (lang) {
    case 'Java': return 'bg-orange-500/80';
    case 'TypeScript': return 'bg-blue-400/80';
    case 'Vue 3': return 'bg-emerald-500/80';
    default: return 'bg-space-400';
  }
};
</script>
