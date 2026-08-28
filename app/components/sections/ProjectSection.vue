<template>
  <section id="projects" class="py-20 px-4 max-w-6xl mx-auto w-full scroll-mt-16">


    <div class="text-center mb-12">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-3xl md:text-4xl font-bold text-space-100 tracking-tight"
      >
        <span class="text-space-600 mr-1">~/</span>
        <span class="text-emerald-500 mr-2">$</span>ls ./projects
      </h2>
      <p class="text-space-400 text-sm font-mono mt-2">
        Production-ready backend services & distributed systems
      </p>
    </div>


    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
      class="flex flex-wrap justify-center gap-2.5 mb-14"
    >
      <button
        v-for="filter in filters"
        :key="filter"
        @click="activeFilter = filter"
        class="group flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 backdrop-blur-sm cursor-pointer"
        :class="
          activeFilter === filter
            ? 'bg-space-800/80 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10'
            : 'bg-space-900/30 border-space-700/50 text-space-400 hover:bg-space-800/60 hover:text-space-200 hover:border-space-600'
        "
      >
        <span
          v-if="filter !== 'All'"
          class="w-1.5 h-1.5 rounded-full transition-all duration-300"
          :class="[
            getLanguageColor(filter),
            activeFilter === filter
              ? 'scale-125 opacity-100'
              : 'opacity-40 group-hover:opacity-100'
          ]"
        ></span>
        {{ filter }}
      </button>
    </div>


    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <article
        v-for="(project, index) in filteredProjects"
        :key="project.title"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { duration: 500, delay: index * 100 }
        }"
        @mousemove="handleMouseMove($event, index)"
        @mouseleave="handleMouseLeave(index)"
        class="group relative flex flex-col rounded-3xl bg-gradient-to-b from-space-700/50 to-transparent p-[1px] transition-all duration-500 hover:-translate-y-1.5"
      >

        <div
          class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
          :style="spotlightStyles[index]"
        ></div>


        <div
          class="absolute inset-0 bg-space-950/60 backdrop-blur-xl rounded-3xl z-0 group-hover:bg-space-900/80 transition-colors duration-500"
        ></div>


        <div
          class="relative z-10 flex flex-col h-full rounded-[23px] bg-space-900/40 border border-space-800 group-hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
        >

          <div class="h-1 w-full" :class="project.gradient"></div>

          <div class="p-7 md:p-8 flex flex-col h-full">

            <div class="flex items-center justify-between mb-6 font-mono text-[11px]">
              <div class="flex items-center gap-2">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="
                    project.inDevelopment
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                  "
                ></span>
                <span class="text-space-500">status:</span>
                <span :class="project.inDevelopment ? 'text-amber-400' : 'text-emerald-400'">
                  {{ project.inDevelopment ? 'development' : 'running' }}
                </span>
                <span class="text-space-700">|</span>
                <span class="text-space-500">port:</span>
                <span class="text-space-300">{{ project.pid }}</span>
              </div>

              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-space-500 hover:text-white transition-colors duration-300 z-30 relative"
              >
                <Icon name="mdi:github" class="text-lg" />
                <span class="hidden sm:inline">source</span>
                <Icon name="heroicons:arrow-up-right-20-solid" class="text-xs" />
              </a>
            </div>


            <div class="flex-grow">
              <h3
                class="text-2xl font-bold text-space-100 group-hover:text-white transition-colors duration-300 tracking-tight mb-3"
              >
                {{ project.title }}
              </h3>
              <p class="text-space-400 leading-relaxed text-sm md:text-base font-light">
                {{ project.description }}
              </p>
            </div>

            
            <div class="flex flex-wrap gap-2 mt-6 mb-2">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium border transition-all duration-300"
                :class="getTechStyle(tech)"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>


    <div
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1, transition: { duration: 600, delay: 500 } }"
      class="flex items-center justify-center gap-2 mt-10 font-mono text-xs text-space-600"
    >
      <span class="text-emerald-500">❯</span>
      <span>{{ filteredProjects.length }} projects found</span>
      <span class="animate-pulse w-1.5 h-3 bg-emerald-500/70"></span>
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
  pid: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: 'Elei Gamification Platform',
    description:
      'High-load productivity platform transforming routine tasks into a structured gaming process with an XP system, dynamic leveling, and a secure internal economy based on DDD architecture.',
    techStack: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'Vue 3'],
    githubUrl: 'https://github.com/Acrokami/Elei',
    primaryLanguage: 'Java',
    pid: '8082',
    gradient: 'bg-gradient-to-r from-emerald-500/80 via-teal-500/60 to-emerald-500/40'
  },
  {
    title: 'FraudGuard System',
    description:
      'Financial fraud detection integration system utilizing message brokers for complex event processing. Implemented rigorous validation flows using Awaitility for asynchronous testing.',
    techStack: ['Java', 'Spring Boot', 'Apache Kafka', 'Integration Testing'],
    githubUrl: 'https://github.com/Acrokami',
    primaryLanguage: 'Java',
    inDevelopment: true,
    pid: '9090',
    gradient: 'bg-gradient-to-r from-amber-500/80 via-orange-500/60 to-amber-500/40'
  },
  {
    title: 'Real-time Messanger',
    description:
      'Full-stack messaging application featuring real-time bi-directional communication, custom WebSocket routing, and a responsive dark-themed UI built with modern frontend tooling.',
    techStack: ['Spring Boot', 'STOMP WebSockets', 'Vue 3', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Acrokami',
    primaryLanguage: 'TypeScript',
    inDevelopment: true,
    pid: '3000',
    gradient: 'bg-gradient-to-r from-violet-500/80 via-purple-500/60 to-fuchsia-500/40'
  }
];

const filters = ['All', 'Java', 'TypeScript', 'Vue 3'];
const activeFilter = ref('All');

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects;
  return projects.filter(
    p =>
      p.primaryLanguage.includes(activeFilter.value) ||
      p.techStack.includes(activeFilter.value)
  );
});


const spotlightStyles = ref<Record<number, any>>({});

const handleMouseMove = (e: MouseEvent, index: number) => {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  spotlightStyles.value[index] = {
    background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(16,185,129,0.12), transparent 40%)`
  };
};

const handleMouseLeave = (index: number) => {
  spotlightStyles.value[index] = {};
};

const getLanguageColor = (lang: string) => {
  switch (lang) {
    case 'Java':
      return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]';
    case 'TypeScript':
      return 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]';
    case 'Vue 3':
      return 'bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.7)]';
    default:
      return 'bg-space-400';
  }
};

const getTechStyle = (tech: string) => {
  const map: Record<string, string> = {
    'Java': 'border-orange-500/30 text-orange-400 bg-orange-500/10',
    'Spring Boot': 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    'Apache Kafka': 'border-purple-400/30 text-purple-400 bg-purple-400/10',
    'Kafka': 'border-purple-400/30 text-purple-400 bg-purple-400/10',
    'PostgreSQL': 'border-blue-400/30 text-blue-400 bg-blue-400/10',
    'Redis': 'border-red-400/30 text-red-400 bg-red-400/10',
    'Vue 3': 'border-emerald-400/30 text-emerald-400 bg-emerald-400/10',
    'TypeScript': 'border-blue-400/30 text-blue-400 bg-blue-400/10',
    'Docker': 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    'Git': 'border-orange-400/30 text-orange-400 bg-orange-400/10',
    'STOMP WebSockets': 'border-purple-400/30 text-purple-400 bg-purple-400/10',
    'Tailwind CSS': 'border-cyan-400/30 text-cyan-400 bg-cyan-400/10',
    'Integration Testing': 'border-amber-400/30 text-amber-400 bg-amber-400/10',
  };
  return map[tech] || 'border-space-600/30 text-space-400 bg-space-600/10';
};
</script>
