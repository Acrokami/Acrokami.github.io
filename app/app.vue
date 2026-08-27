<template>
  <div class="bg-space-900 min-h-screen text-space-50 font-sans relative flex flex-col">
    <AppHeader />
    <HeroSection />
    <TechMarquee />
    <AboutSection />
    <LeetCodeWidget />
    <StackSection />
    <ProjectSection />
    <ContactSection />
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
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
</style>
