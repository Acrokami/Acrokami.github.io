<template>
  <div class="grid-lines" aria-hidden="true"></div>
</template>

<style scoped>
.grid-lines {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(16,185,129,0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(16,185,129,0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}
</style>
