<template>
  <section
    id="contact"
    class="py-20 px-4 max-w-6xl mx-auto w-full scroll-mt-16"
  >
    <div class="text-center mb-12">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { duration: 600 }
        }"
        class="text-3xl md:text-4xl font-bold mb-3 text-space-100 tracking-tight"
      >
        <span class="text-space-600 mr-1">~/</span>
        <span class="text-emerald-500 mr-2">$</span>contact --ping
      </h2>
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { duration: 600, delay: 100 }
        }"
        class="text-space-400 max-w-xl mx-auto font-light text-sm md:text-base"
      >
        Open to backend roles and interesting projects.
        Reach out on whichever channel works best for you.
      </p>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: { duration: 600, delay: 200 }
      }"
      class="relative p-[1px] rounded-3xl bg-gradient-to-b from-space-700/50 to-transparent"
    >

      <div class="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div
          class="absolute inset-0 opacity-30"
          style="
            background-image:
              linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px);
            background-size: 32px 32px;
          "
        ></div>
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse"
        ></div>
      </div>

      <div class="absolute inset-0 bg-space-950/60 backdrop-blur-xl rounded-3xl"></div>

      <div class="relative z-10 rounded-[23px] bg-space-900/40 border border-space-800 overflow-hidden">

        <div class="flex items-center justify-between px-5 py-3.5 bg-space-900/60 border-b border-space-800/60">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <div class="text-[11px] font-mono text-space-300 flex items-center gap-1.5">
            <span class="text-emerald-400">#</span>
            <span>contact — acrokami@backend</span>
          </div>
          <div class="w-12"></div>
        </div>

        
        <div class="p-5 md:p-7 font-mono">
          <div class="flex items-center gap-2 text-xs md:text-sm mb-5">
            <span class="text-emerald-400">❯</span>
            <span class="text-space-200">contact --ping</span>
            <span class="text-space-600 hidden sm:inline"># available channels</span>
          </div>

          <div class="space-y-1">
            <a
              v-for="(contact, index) in contacts"
              :key="contact.label"
              :href="contact.href"
              target="_blank"
              rel="noopener noreferrer"
              v-motion
              :initial="{ opacity: 0, x: -15 }"
              :enter="{
                opacity: 1,
                x: 0,
                transition: { duration: 400, delay: 300 + index * 80 }
              }"
              class="group flex items-center gap-3 md:gap-5 px-3 py-4 rounded-xl hover:bg-space-800/50 transition-all duration-300"
            >
              <span class="text-space-700 group-hover:text-emerald-500 transition-colors duration-300">
                ├─
              </span>

              <div class="flex items-center justify-center w-8 h-8 shrink-0">
                <Icon
                  :name="contact.icon"
                  class="text-xl text-space-500 group-hover:text-emerald-400 transition-colors duration-300"
                />
              </div>

              <div class="w-24 shrink-0">
                <span class="text-xs uppercase tracking-widest text-space-500 group-hover:text-space-300 transition-colors duration-300">
                  {{ contact.label }}
                </span>
              </div>

              <div class="flex-1 min-w-0">
                <span class="text-sm md:text-base text-space-300 group-hover:text-white transition-colors duration-300 truncate block">
                  {{ contact.value }}
                </span>
              </div>

              <div class="hidden sm:flex items-center gap-2 text-xs text-space-600 group-hover:text-emerald-400 transition-all duration-300">
                <span>./{{ contact.action }}</span>
                <Icon
                  name="heroicons:arrow-up-right-20-solid"
                  class="text-sm opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </div>
            </a>
          </div>

          <div class="flex items-center gap-2 mt-5 pt-4 border-t border-space-800/70 text-xs">
            <span class="text-emerald-400">❯</span>
            <span class="text-space-500">ping complete</span>
            <span class="text-emerald-500/70">✓</span>
            <span class="animate-pulse w-1.5 h-3 bg-emerald-500/70 ml-1"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Contact {
  label: string;
  value: string;
  href: string;
  icon: string;
  action: string;
}

const contacts: Contact[] = [
  {
    label: 'Telegram',
    value: '@Acrokami',
    href: 'https://t.me/Acrokami',
    icon: 'mdi:telegram',
    action: 'connect'
  },
  {
    label: 'GitHub',
    value: 'Acrokami',
    href: 'https://github.com/Acrokami',
    icon: 'mdi:github',
    action: 'explore'
  },
  {
    label: 'Email',
    value: 'acrobtw@gmail.com',
    href: 'mailto:acrobtw@gmail.com',
    icon: 'heroicons:envelope',
    action: 'send'
  }
];
</script>
