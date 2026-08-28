<template>
  <div class="bg-space-950 min-h-screen text-space-200 font-sans relative flex flex-col selection:bg-emerald-500/30 selection:text-emerald-100">
    <ScrollProgress />
    <DotGridOverlay />
    <AppHeader />
    <main class="flex-1 relative z-10">
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <ContactSection />
    </main>
    <AppFooter />

  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Acrokami — Backend Developer',
  description: 'Portfolio of Nick, a backend developer building scalable, secure, and robust server-side applications with Java, Spring Boot, PostgreSQL, and Kafka.',
  ogTitle: 'Acrokami — Backend Developer',
  ogDescription: 'Building scalable, secure, and robust server-side applications.',
  ogType: 'website',
  ogImage: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Acrokami — Backend Developer',
  twitterDescription: 'Building scalable, secure, and robust server-side applications.',
  twitterImage: '/og-image.png',
})
</script>

<style>
html {
  scroll-behavior: auto;
  background-color: #020617;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>
