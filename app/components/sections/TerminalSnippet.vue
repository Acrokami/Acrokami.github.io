<template>
  <section class="max-w-3xl mx-auto px-6 mb-16 relative z-20">
    <div class="rounded-2xl bg-space-950/90 border border-space-800/80 backdrop-blur-xl shadow-2xl overflow-hidden shadow-black/50">


      <div class="flex items-center justify-between px-4 py-3 bg-space-900/60 border-b border-space-800/60">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div class="text-[11px] font-mono text-space-400">bash — acrokami@server:~</div>
        <div class="w-12"></div>
      </div>

      
      <div class="p-5 font-mono text-xs md:text-sm text-space-300 space-y-2">
        <div class="flex items-center gap-2 text-space-400">
          <span class="text-emerald-400">❯</span>
          <span>acrokami --stack</span>
        </div>
        <div class="text-space-200 pl-4 space-y-1">
          <p><span class="text-emerald-400">Primary:</span> Java 21, Spring Boot, Spring Security</p>
          <p><span class="text-violet-400">Brokers:</span> Apache Kafka, RabbitMQ, WebSockets</p>
          <p><span class="text-cyan-400">Data & Ops:</span> PostgreSQL, Redis, Docker, Linux</p>
        </div>
        <div class="flex items-center gap-2 pt-2">
          <span class="text-emerald-400">❯</span>
          <span class="animate-pulse w-2 h-4 bg-emerald-400 inline-block align-middle"></span>
        </div>
      </div>

    </div>
  </section>
</template>
