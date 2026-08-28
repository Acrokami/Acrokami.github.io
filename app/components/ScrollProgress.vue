<template>
  <div
    class="fixed top-0 left-0 h-[2px] bg-emerald-500 z-[60] transition-[width] duration-100 ease-out shadow-[0_0_12px_rgba(16,185,129,0.6)]"
    :style="{ width: progress + '%' }"
  ></div>
</template>

<script setup lang="ts">
const progress = ref(0);

const onScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>
