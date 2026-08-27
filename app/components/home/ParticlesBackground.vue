<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;
let shapeTimerId: number | null = null;
let particlesArray: Particle[] = [];
let resizeObserver: ResizeObserver | null = null;

const SHAPES = ['fibonacci', 'dna', 'sphere', 'infinity', 'mobius', 'vortex'];
let currentShapeIndex = 0;
let PARTICLE_COUNT = 600;
let globalTime = 0;

class Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  targetX: number;
  targetY: number;
  size: number;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  morphSpeed: number;
  colorAlpha: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.baseX = this.x;
    this.baseY = this.y;
    this.targetX = this.x;
    this.targetY = this.y;

    this.size = Math.random() * 2.5 + 0.8;
    this.colorAlpha = Math.min(0.75, this.size / 3);

    this.angle = Math.random() * Math.PI * 2;
    this.orbitRadius = Math.random() * 2 + 0.5;
    // Замедлено базовое вращение частиц
    this.orbitSpeed = (Math.random() * 0.006) - 0.003;
    // Замедлено перестроение между формами
    this.morphSpeed = Math.random() * 0.02 + 0.008;
  }

  setTarget(tx: number, ty: number) {
    this.targetX = tx;
    this.targetY = ty;
  }

  update() {
    this.baseX += (this.targetX - this.baseX) * this.morphSpeed;
    this.baseY += (this.targetY - this.baseY) * this.morphSpeed;
    this.angle += this.orbitSpeed;
    this.x = this.baseX + Math.cos(this.angle) * this.orbitRadius;
    this.y = this.baseY + Math.sin(this.angle) * this.orbitRadius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(210, 210, 220, ${this.colorAlpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const morphTo = (shape: string, w: number, h: number, time: number) => {
  const cx = w / 2;
  const cy = h / 2 + 60;
  const scale = Math.min(w, h);
  const n = particlesArray.length;

  particlesArray.forEach((p, i) => {
    let tx = cx;
    let ty = cy;

    switch (shape) {
      case 'fibonacci': {
        const phi = (1 + Math.sqrt(5)) / 2;
        const angle = i * Math.PI * 2 * phi + time * 0.5;
        const r = Math.sqrt(i) * (scale * 0.012);
        tx = cx + Math.cos(angle) * r;
        ty = cy + Math.sin(angle) * r;
        break;
      }

      case 'dna': {
        const half = Math.floor(n / 2);
        const isSecondStrand = i >= half;
        const index = isSecondStrand ? i - half : i;
        const t = (index / half) * Math.PI * 3;
        const R = scale * 0.12;
        const height = scale * 0.7;
        const yBase = cy - height / 2 + (index / half) * height;
        const phase = isSecondStrand ? Math.PI : 0;

        tx = cx + Math.cos(t + phase + time * 2) * R;
        ty = yBase;
        break;
      }

      case 'sphere': {
        const phi = Math.acos(1 - 2 * (i + 0.5) / n);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i + time * 0.8;
        const R = scale * 0.22;
        tx = cx + Math.sin(phi) * Math.cos(theta) * R;
        ty = cy + Math.cos(phi) * R;
        break;
      }

      case 'infinity': {
        const t = (i / n) * Math.PI * 2 + time * 0.5;
        const R = scale * 0.3;
        tx = cx + (R * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2));
        ty = cy + (R * Math.sin(t) * Math.cos(t)) / (1 + Math.pow(Math.sin(t), 2));
        break;
      }

      case 'mobius': {
        const t = (i / n) * Math.PI * 2 + time * 0.4;
        const R = scale * 0.25;
        tx = cx + R * Math.cos(t) * (1 + 0.5 * Math.cos(3 * t));
        ty = cy + R * Math.sin(t) * (1 + 0.5 * Math.cos(3 * t));
        break;
      }

      case 'vortex': {
        const t = (i / n) * Math.PI * 12 + time * 1.5;
        const R = scale * 0.35 * Math.pow(i / n, 0.6);
        tx = cx + R * Math.cos(t);
        ty = cy + R * Math.sin(t);
        break;
      }
    }

    p.setTarget(tx, ty);
  });
};

const nextShape = () => {
  currentShapeIndex = (currentShapeIndex + 1) % SHAPES.length;
};

const startTimer = () => {
  if (!shapeTimerId) {
    shapeTimerId = window.setInterval(nextShape, 8000);
  }
};

const stopTimer = () => {
  if (shapeTimerId) {
    window.clearInterval(shapeTimerId);
    shapeTimerId = null;
  }
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopTimer();
  } else {
    startTimer();
  }
};

const init = () => {
  const cvs = canvas.value;
  if (!cvs) return;

  PARTICLE_COUNT = window.innerWidth < 768 ? 250 : 600;

  particlesArray = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particlesArray.push(new Particle(cvs.width, cvs.height));
  }
};

const animate = () => {
  const cvs = canvas.value;
  if (!cvs || !ctx) return;

  
  globalTime += 0.001;

  ctx.clearRect(0, 0, cvs.width, cvs.height);

  morphTo(SHAPES[currentShapeIndex]!, cvs.width, cvs.height, globalTime);

  for (const particle of particlesArray) {
    particle.update();
    particle.draw(ctx);
  }
  animationFrameId = requestAnimationFrame(animate);
};

const handleResize = () => {
  const cvs = canvas.value;
  if (!cvs) return;
  cvs.width = cvs.offsetWidth;
  cvs.height = cvs.offsetHeight;

  if (particlesArray.length === 0) {
    init();
  }
};

onMounted(() => {
  const cvs = canvas.value;
  if (cvs) {
    ctx = cvs.getContext('2d');
    handleResize();

    resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(cvs);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate();
    startTimer();
  }
});

onUnmounted(() => {
  if (resizeObserver && canvas.value) {
    resizeObserver.unobserve(canvas.value);
  }
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  cancelAnimationFrame(animationFrameId);
  stopTimer();
});
</script>
