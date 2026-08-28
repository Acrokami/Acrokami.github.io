<template>
  <section id="about" class="py-16 md:py-20 px-4 max-w-5xl mx-auto w-full scroll-mt-16">

    <h2
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-center text-space-100"
    >
      <span class="text-space-600 mr-1">~/</span>
      <span class="text-emerald-500 mr-2">$</span>whoami
    </h2>

    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: { duration: 600, delay: 150 }
      }"
      class="relative p-[1px] rounded-[28px] bg-gradient-to-b from-space-700/50 to-transparent mb-12 md:mb-14"
    >
      <div class="absolute inset-0 bg-space-950/65 backdrop-blur-xl rounded-[28px] z-0"></div>

      <div
        class="group relative z-10 flex flex-col lg:flex-row gap-6 md:gap-8 p-6 md:p-10 rounded-[27px] bg-space-900/40 shadow-2xl border border-space-800/80 items-center"
      >
        <div
          class="flex flex-col gap-5 md:gap-6 w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-space-800 pb-6 lg:pb-0 lg:pr-8"
        >
          <div>
            <span class="text-space-400 text-xs font-mono uppercase tracking-wider">Identity</span>
            <p class="text-space-100 text-xl font-semibold mt-1">Nikita (Nick)</p>
          </div>

          <div>
            <span class="text-space-400 text-xs font-mono uppercase tracking-wider">Location</span>
            <div class="flex items-center gap-2 mt-1">
              <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></span>
              <p class="text-space-100 text-lg">Kyiv, Ukraine</p>
            </div>
          </div>

          <div>
            <span class="text-space-400 text-xs font-mono uppercase tracking-wider">Role</span>
            <p class="text-space-100 text-lg mt-1">Backend Developer</p>
          </div>

          <div>
            <span class="text-space-400 text-xs font-mono uppercase tracking-wider">Focus</span>
            <p class="text-space-300 text-sm font-light mt-1">
              Spring Ecosystem, Distributed Systems & Algorithms
            </p>
          </div>

          <div class="pt-1 md:pt-2">
            <a
              href="https://leetcode.com/u/Acrokami/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-space-950 border border-space-800 text-space-300 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-space-900 transition-all duration-300 group/btn shadow-inner"
            >
              <Icon name="simple-icons:leetcode" class="text-lg text-space-400 group-hover/btn:text-emerald-400 transition-colors" />
              <span class="text-xs font-mono font-semibold tracking-wider">LeetCode Profile</span>
              <Icon name="heroicons:arrow-up-right-20-solid" class="text-sm opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

        <div class="w-full lg:w-2/3">
          <div
            @mouseenter="isTerminalHovered = true"
            @mouseleave="isTerminalHovered = false"
            @click="toggleTerminal"
            class="rounded-2xl bg-space-950/95 border backdrop-blur-2xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 transform-gpu"
            :class="
              isTerminalHovered || isTerminalActive
                ? 'border-emerald-500/60 md:scale-[1.02] shadow-[0_10px_35px_rgba(16,185,129,0.15)] bg-space-950'
                : 'border-space-800/80'
            "
          >
            <div class="flex items-center justify-between px-4 py-3 bg-space-900/60 border-b border-space-800/60">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div class="text-[11px] font-mono text-space-300 flex items-center gap-1.5">
                <span class="text-emerald-400">#</span>
                <span>bash — acrokami@backend:~</span>
              </div>
              <div class="w-12"></div>
            </div>

            <div
              class="p-4 sm:p-6 font-mono text-xs md:text-sm space-y-3 transition-colors duration-500"
              :class="isTerminalHovered || isTerminalActive ? 'text-space-100' : 'text-space-300'"
            >
              <div class="flex items-center gap-2 text-space-400">
                <span class="text-emerald-400">❯</span>
                <span class="text-space-200">cat profile.summary</span>
              </div>

              <p
                class="font-light leading-relaxed pl-3 sm:pl-4 transition-colors duration-500 text-[11px] sm:text-xs md:text-sm"
                :class="isTerminalHovered || isTerminalActive ? 'text-white' : 'text-space-300'"
              >
                I've been writing Java for about a year now, building a solid
                grip on the Spring ecosystem — how Spring Boot, security, and
                the surrounding pieces fit together in real systems. I care
                about data structures and algorithms as much as I care about
                clean, working code, and I'm comfortable with Git and Docker
                in everyday development. I'm still early in my journey, but I
                already think in terms of architecture — how services should
                be structured, where responsibilities belong, and how to keep
                a codebase easy to extend rather than just functional.
              </p>

              <div class="flex items-center gap-2 text-space-400 pt-2">
                <span class="text-emerald-400">❯</span>
                <span class="text-space-200">echo $FOCUS</span>
              </div>

              <p class="pl-3 sm:pl-4 text-space-300 leading-relaxed text-[11px] sm:text-xs md:text-sm">
                Spring Ecosystem
                <span class="text-space-600">·</span>
                Distributed Systems
                <span class="text-space-600">·</span>
                Algorithms
              </p>

              <div class="flex items-center gap-2 pt-1">
                <span class="text-emerald-400">❯</span>
                <span class="animate-pulse w-2 h-4 bg-emerald-400 inline-block align-middle"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: { duration: 600, delay: 300 }
      }"
    >
      <div class="flex items-center gap-3 mb-6 px-1 font-mono">
        <span class="text-emerald-400 text-sm">❯</span>
        <span class="text-space-200 text-sm">ls ~/stack</span>
        <span class="text-space-600 text-xs"># technologies I work with</span>
      </div>

      <div class="relative p-[1px] rounded-3xl bg-gradient-to-b from-space-700/50 to-transparent">
        <div class="absolute inset-0 bg-space-950/60 backdrop-blur-xl rounded-3xl"></div>

        <div class="relative z-10 rounded-[23px] bg-space-900/40 border border-space-800 p-4 sm:p-6 md:p-8">
          <div class="space-y-6 md:space-y-8">
            <div
              v-for="(category, catIndex) in skillCategories"
              :key="category.title"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{
                opacity: 1,
                y: 0,
                transition: { duration: 500, delay: 400 + catIndex * 100 }
              }"
            >
              <div class="flex items-center gap-3 mb-3 md:mb-4">
                <span class="text-[11px] md:text-xs font-mono uppercase tracking-widest text-space-500">
                  {{ category.title }}
                </span>
                <div class="h-px flex-1 bg-space-800/60"></div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
                <div
                  v-for="skill in category.skills"
                  :key="skill.name"
                  @mouseenter="activeSkill = skill.name"
                  @mouseleave="activeSkill = null"
                  @click="activeSkill = activeSkill === skill.name ? null : skill.name"
                  class="group flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-space-950/40 border border-space-800/60 hover:border-emerald-500/30 hover:bg-space-900/60 transition-all duration-300 cursor-pointer select-none"
                  :class="activeSkill === skill.name ? 'border-emerald-500/40 bg-space-900/70' : ''"
                >
                  <div
                    class="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl bg-space-900/80 border border-space-800 group-hover:border-emerald-500/20 group-hover:scale-110 transition-all duration-300"
                    :class="activeSkill === skill.name ? 'border-emerald-500/30 scale-110' : ''"
                  >
                    <Icon
                      :name="skill.icon"
                      class="text-xl sm:text-2xl text-space-400 group-hover:text-emerald-400 transition-colors duration-300"
                      :class="activeSkill === skill.name ? 'text-emerald-400' : ''"
                    />
                  </div>
                  <span
                    class="text-[11px] sm:text-xs font-mono font-medium text-space-400 group-hover:text-space-100 transition-colors duration-300 truncate"
                    :class="activeSkill === skill.name ? 'text-space-100' : ''"
                  >
                    {{ skill.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-6 px-4 py-3.5 rounded-xl bg-space-950/50 border border-space-800/60 font-mono text-xs md:text-sm min-h-[4rem] sm:min-h-[3rem] flex items-start sm:items-center gap-2 transition-all duration-300"
            :class="activeSkill ? 'border-emerald-500/20' : ''"
          >
            <span class="text-emerald-400 shrink-0 mt-0.5 sm:mt-0">❯</span>
            <div v-if="activeDetail" class="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span class="text-emerald-400 font-semibold">{{ activeSkill }}</span>
              <span class="text-space-600">·</span>
              <span class="text-space-500">{{ activeDetail.exp }}</span>
              <span class="text-space-600">·</span>
              <span class="text-space-300 text-[11px] sm:text-xs leading-relaxed">{{ activeDetail.desc }}</span>
            </div>
            <span v-else class="text-space-500 italic text-[11px] sm:text-xs">
              Tap or hover over a technology to see experience & details...
            </span>
          </div>

        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface TechSkill {
  name: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: TechSkill[];
}

interface SkillDetail {
  exp: string;
  desc: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Backend',
    skills: [
      { name: 'Java', icon: 'skill-icons:java-dark' },
      { name: 'Spring Boot', icon: 'skill-icons:spring-dark' },
    ]
  },
  {
    title: 'Data & Messaging',
    skills: [
      { name: 'PostgreSQL', icon: 'skill-icons:postgresql-dark' },
      { name: 'Redis', icon: 'skill-icons:redis-dark' },
      { name: 'Apache Kafka', icon: 'skill-icons:kafka' },
      { name: 'RabbitMQ', icon: 'skill-icons:rabbitmq-dark' },
    ]
  },
  {
    title: 'DevOps & Tools',
    skills: [
      { name: 'Docker', icon: 'skill-icons:docker' },
      { name: 'Git', icon: 'skill-icons:git' },
    ]
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'Vue 3', icon: 'skill-icons:vuejs-dark' },
      { name: 'TypeScript', icon: 'skill-icons:typescript' },
    ]
  }
];

const skillDetails: Record<string, SkillDetail> = {
  'Java': { exp: '1+ year', desc: 'Core platform. OOP, collections, streams, concurrency, JVM internals' },
  'Spring Boot': { exp: '1 year', desc: 'REST APIs, security, data JPA, Kafka integration, microservices' },
  'PostgreSQL': { exp: '8 months', desc: 'Schema design, query optimization, indexing, transactions' },
  'Redis': { exp: '6 months', desc: 'Caching, session storage, rate limiting, pub/sub patterns' },
  'Apache Kafka': { exp: '6 months', desc: 'Event-driven architecture, stream processing, producers/consumers' },
  'RabbitMQ': { exp: '4 months', desc: 'Message queuing, dead letter queues, retry policies' },
  'Docker': { exp: '8 months', desc: 'Containerization, multi-stage builds, compose, CI/CD pipelines' },
  'Vue 3': { exp: '6 months', desc: 'Component architecture, Composition API, Pinia state management' },
  'TypeScript': { exp: '6 months', desc: 'Type safety, generics, utility types, full-stack type sharing' },
  'Git': { exp: '1+ year', desc: 'Branching strategies, rebasing, hooks, monorepo workflows' },
};

const activeSkill = ref<string | null>(null);
const activeDetail = computed(() => (activeSkill.value ? skillDetails[activeSkill.value] ?? null : null));

const isTerminalHovered = ref(false);
const isTerminalActive = ref(false);

const toggleTerminal = () => {
  isTerminalActive.value = !isTerminalActive.value;
};
</script>
