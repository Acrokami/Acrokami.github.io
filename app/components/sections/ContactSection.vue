<template>
  <section id="contact" class="py-20 px-4 max-w-6xl mx-auto w-full scroll-mt-16">
    <h2
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="text-3xl md:text-4xl font-bold mb-3 text-center text-white"
    >
      Let's Connect
    </h2>
    <p
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
      class="text-space-400 text-center max-w-xl mx-auto mb-12"
    >
      Open to backend roles and interesting projects. Reach out on whichever channel works best for you.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <a
        v-for="(contact, index) in contacts"
        :key="contact.label"
        :href="contact.href"
        target="_blank"
        rel="noopener noreferrer"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
        class="group relative flex flex-col p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
      >
        
        <div class="absolute inset-0 bg-space-900/80 backdrop-blur-md rounded-3xl z-0 group-hover:bg-space-800/90 transition-colors duration-500"></div>


        <div class="relative z-10 flex flex-col items-center text-center gap-5 w-full p-8 rounded-[23px] bg-space-900/40 border border-white/5 group-hover:border-white/10 transition-all duration-500">


          <div class="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-space-950 border border-space-800 group-hover:border-space-600 transition-all duration-500 shadow-inner">
            <div class="absolute inset-0 bg-white/5 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Icon :name="contact.icon" class="text-3xl text-space-400 group-hover:text-white transition-colors duration-500 relative z-10" />
          </div>

          <div>
            <h3 class="text-lg font-bold text-space-100 group-hover:text-white transition-colors duration-300">
              {{ contact.label }}
            </h3>
            <p class="text-sm font-mono text-space-500 group-hover:text-space-400 transition-colors duration-300 mt-1.5">
              {{ contact.value }}
            </p>
          </div>


          <div class="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-space-300">
            <span class="text-[10px] uppercase tracking-widest font-bold">{{ contact.action }}</span>
            <Icon name="heroicons:arrow-up-right-20-solid" class="text-sm" />
          </div>

        </div>
      </a>
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
    action: 'Message'
  },
  {
    label: 'GitHub',
    value: 'Acrokami',
    href: 'https://github.com/Acrokami',
    icon: 'mdi:github',
    action: 'View Profile'
  },
  {
    label: 'Email',
    value: 'acrobtw@gmail.com',
    href: 'mailto:acrobtw@gmail.com',
    icon: 'heroicons:envelope',
    action: 'Send Mail'
  },
];
</script>
