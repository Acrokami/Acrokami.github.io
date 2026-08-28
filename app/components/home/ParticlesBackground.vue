<template>
  <div ref="containerRef" class="absolute inset-0 w-full h-full z-0 pointer-events-none" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const containerRef = ref<HTMLElement | null>(null);

let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let points: THREE.Points | null = null;
let geometry: THREE.BufferGeometry | null = null;
let material: THREE.PointsMaterial | null = null;
let animationFrameId = 0;
let resizeObserver: ResizeObserver | null = null;
let isAnimating = false;

const particleCount = 2500;
let shapes: Float32Array[] = [];
let baseColors: Float32Array;

let time = 0;
let shapeIndex = 0;
let nextShapeIndex = 1;
let shapeTimer = 0;

const SHAPE_DURATION = 14;
const TRANSITION_DURATION = 4;
const TOTAL_CYCLE = SHAPE_DURATION + TRANSITION_DURATION;

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getSeededRandom = (seed: number) => {
  let currentSeed = seed;
  return () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };
};

const normalizeShape = (positions: Float32Array) => {
  let maxDist = 0;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i]!;
    const y = positions[i + 1]!;
    const z = positions[i + 2]!;
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
      positions[i] = 0;
      positions[i + 1] = 0;
      positions[i + 2] = 0;
      continue;
    }
    const dist = Math.sqrt(x * x + y * y + z * z);
    if (dist > maxDist) maxDist = dist;
  }
  const targetScale = 2.4;
  const scale = maxDist > 0 ? targetScale / maxDist : 1;
  for (let i = 0; i < positions.length; i++) {
    const val = positions[i]!;
    positions[i] = isNaN(val) ? 0 : val * scale;
  }
  return positions;
};

const createHelix = () => {
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const t = (i / particleCount) * Math.PI * 8;
    const radius = 1.2;
    positions[i * 3] = radius * Math.cos(t);
    positions[i * 3 + 1] = (i / particleCount) * 4 - 2;
    positions[i * 3 + 2] = radius * Math.sin(t);
  }
  return normalizeShape(positions);
};

const createDNA = () => {
  const positions = new Float32Array(particleCount * 3);
  const seededRandom = getSeededRandom(33333);
  const rungCount = 70;
  const pointsPerRung = Math.floor(particleCount * 0.22 / rungCount);
  const strandPoints = particleCount - (rungCount * pointsPerRung);
  const pointsPerStrand = Math.floor(strandPoints / 2);
  let idx = 0;

  for (let s = 0; s < 2; s++) {
    for (let i = 0; i < pointsPerStrand; i++) {
      const t = seededRandom();
      const angle = t * Math.PI * 14 + (s * Math.PI);
      const y = t * 4.5 - 2.25;
      const radius = 0.9;
      positions[idx++] = radius * Math.cos(angle);
      positions[idx++] = y;
      positions[idx++] = radius * Math.sin(angle);
    }
  }

  for (let r = 0; r < rungCount; r++) {
    const t = r / rungCount;
    const angle = t * Math.PI * 14;
    const r1x = 0.9 * Math.cos(angle);
    const r1z = 0.9 * Math.sin(angle);
    const r2x = 0.9 * Math.cos(angle + Math.PI);
    const r2z = 0.9 * Math.sin(angle + Math.PI);
    for (let j = 0; j < pointsPerRung; j++) {
      const alpha = seededRandom();
      positions[idx++] = r1x + (r2x - r1x) * alpha;
      positions[idx++] = (t * 4.5 - 2.25) + (seededRandom() - 0.5) * 0.04;
      positions[idx++] = r1z + (r2z - r1z) * alpha;
    }
  }

  while (idx < particleCount * 3) {
    positions[idx++] = 0;
  }
  return normalizeShape(positions);
};

const createTrefoilKnot = () => {
  const positions = new Float32Array(particleCount * 3);
  const seededRandom = getSeededRandom(88888);
  for (let i = 0; i < particleCount; i++) {
    const t = seededRandom() * Math.PI * 2;
    const p = 2;
    const q = 3;
    const r = Math.cos(q * t) + 2;
    positions[i * 3] = r * Math.cos(p * t) * 0.75;
    positions[i * 3 + 1] = r * Math.sin(p * t) * 0.75;
    positions[i * 3 + 2] = -Math.sin(q * t) * 0.9;
  }
  return normalizeShape(positions);
};

const createTesseract = () => {
  const positions = new Float32Array(particleCount * 3);
  const vertices4D: number[][] = [];
  for (let i = 0; i < 16; i++) {
    vertices4D.push([
      (i & 1) ? 1 : -1,
      (i & 2) ? 1 : -1,
      (i & 4) ? 1 : -1,
      (i & 8) ? 1 : -1,
    ]);
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      let diff = 0;
      const vI = vertices4D[i];
      const vJ = vertices4D[j];
      if (vI && vJ) {
        for (let k = 0; k < 4; k++) if (vI[k] !== vJ[k]) diff++;
        if (diff === 1) edges.push([i, j]);
      }
    }
  }

  const pointsPerEdge = Math.floor(particleCount / (edges.length || 1));
  let idx = 0;

  const angle4D = Math.PI / 6;
  const cosA = Math.cos(angle4D);
  const sinA = Math.sin(angle4D);

  for (let e = 0; e < edges.length; e++) {
    const edge = edges[e];
    if (!edge) continue;
    const a = edge[0];
    const b = edge[1];
    const vA = vertices4D[a];
    const vB = vertices4D[b];
    if (!vA || !vB) continue;

    for (let p = 0; p < pointsPerEdge; p++) {
      const t = p / pointsPerEdge;
      let x = vA[0]! * (1 - t) + vB[0]! * t;
      let y = vA[1]! * (1 - t) + vB[1]! * t;
      let z = vA[2]! * (1 - t) + vB[2]! * t;
      let w = vA[3]! * (1 - t) + vB[3]! * t;

      const xNew = x * cosA - w * sinA;
      const wNew = x * sinA + w * cosA;
      x = xNew;
      w = wNew;

      const dist = 2.5;
      const scale = dist / (dist - w);
      positions[idx++] = x * scale * 1.1;
      positions[idx++] = y * scale * 1.1;
      positions[idx++] = z * scale * 1.1;
    }
  }

  while (idx < particleCount * 3) {
    positions[idx++] = 0;
  }
  return normalizeShape(positions);
};

const createInfinity = () => {
  const positions = new Float32Array(particleCount * 3);
  const seededRandom = getSeededRandom(11111);
  for (let i = 0; i < particleCount; i++) {
    const t = seededRandom() * Math.PI * 2;
    const a = 1.6;
    const denom = 1 + Math.sin(t) * Math.sin(t);
    const x = a * Math.cos(t) / denom;
    const y = a * Math.sin(t) * Math.cos(t) / denom;
    const z = a * Math.sin(2 * t) * 0.35;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return normalizeShape(positions);
};

const createAtom = () => {
  const positions = new Float32Array(particleCount * 3);
  const seededRandom = getSeededRandom(66666);
  let idx = 0;

  const nucleusCount = 300;
  for (let i = 0; i < nucleusCount; i++) {
    const theta = seededRandom() * Math.PI * 2;
    const phi = Math.acos(2 * seededRandom() - 1);
    const r = seededRandom() * 0.35;
    positions[idx++] = r * Math.sin(phi) * Math.cos(theta);
    positions[idx++] = r * Math.sin(phi) * Math.sin(theta);
    positions[idx++] = r * Math.cos(phi);
  }

  const orbitals = [
    { rx: 1, ry: 1, rz: 0.15, rotX: 0, rotY: 0 },
    { rx: 1.3, ry: 1.3, rz: 0.2, rotX: Math.PI / 3, rotY: Math.PI / 6 },
    { rx: 0.8, ry: 0.8, rz: 0.1, rotX: Math.PI / 4, rotY: -Math.PI / 3 },
  ];

  const pointsPerOrbital = Math.floor((particleCount - nucleusCount) / orbitals.length);

  for (const orb of orbitals) {
    for (let i = 0; i < pointsPerOrbital; i++) {
      const t = seededRandom() * Math.PI * 2;
      const x = orb.rx * Math.cos(t);
      const y = orb.ry * Math.sin(t);
      const z = orb.rz * Math.sin(t * 3) * 0.5;

      const y1 = y * Math.cos(orb.rotX) - z * Math.sin(orb.rotX);
      const z1 = y * Math.sin(orb.rotX) + z * Math.cos(orb.rotX);
      const x1 = x * Math.cos(orb.rotY) - z1 * Math.sin(orb.rotY);
      const z2 = x * Math.sin(orb.rotY) + z1 * Math.cos(orb.rotY);

      positions[idx++] = x1;
      positions[idx++] = y1;
      positions[idx++] = z2;
    }
  }

  while (idx < particleCount * 3) {
    positions[idx++] = 0;
  }
  return normalizeShape(positions);
};

const createButterfly = () => {
  const positions = new Float32Array(particleCount * 3);
  const seededRandom = getSeededRandom(55555);
  for (let i = 0; i < particleCount; i++) {
    const t = seededRandom() * Math.PI * 12;
    const expCos = Math.exp(Math.cos(t));
    const cos4t = Math.cos(4 * t);
    const sin5 = Math.pow(Math.sin(t / 12), 5);

    const r = expCos - 2 * cos4t - sin5;
    const x = r * Math.sin(t);
    const y = r * Math.cos(t);
    const z = Math.sin(t * 3) * 0.6 + Math.cos(t * 2) * 0.3;

    positions[i * 3] = x * 0.35;
    positions[i * 3 + 1] = y * 0.35;
    positions[i * 3 + 2] = z * 0.35;
  }
  return normalizeShape(positions);
};

const createHyperboloid = () => {
  const positions = new Float32Array(particleCount * 3);
  const seededRandom = getSeededRandom(99999);
  for (let i = 0; i < particleCount; i++) {
    const u = (seededRandom() - 0.5) * 3;
    const v = seededRandom() * Math.PI * 2;
    const x = 0.7 * Math.cosh(u) * Math.cos(v);
    const y = 1.2 * Math.sinh(u);
    const z = 0.7 * Math.cosh(u) * Math.sin(v);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return normalizeShape(positions);
};

const SHAPE_RADIUS = 2.7;
const DESIRED_OFFSET_X = 2.8;

const computeSafeOffsetX = (): number => {
  if (!camera || !containerRef.value) return 0;
  const isMobile = containerRef.value.clientWidth < 768;
  if (isMobile) return 0;

  const vFOV = (camera.fov * Math.PI) / 180;
  const halfHeight = Math.tan(vFOV / 2) * camera.position.z;
  const halfWidth = halfHeight * camera.aspect;
  const maxSafeOffset = Math.max(0, halfWidth - SHAPE_RADIUS);
  return Math.min(DESIRED_OFFSET_X, maxSafeOffset);
};

const updatePointsOffset = () => {
  if (!points) return;
  points.position.x = computeSafeOffsetX();
};

const handleResize = () => {
  if (!containerRef.value || !camera || !renderer) return;
  const w = containerRef.value.clientWidth;
  const h = containerRef.value.clientHeight;
  if (w === 0 || h === 0) return;

  const isMobile = w < 768;
  camera.position.z = isMobile ? 15 : 12;
  if (material) {
    material.size = isMobile ? 0.055 : 0.08;
  }

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  updatePointsOffset();
};

const animate = () => {
  if (!isAnimating) return;
  animationFrameId = requestAnimationFrame(animate);

  time += 0.016;
  shapeTimer += 0.016;

  if (points) {
    points.rotation.y = time * 0.04;
  }

  if (shapeTimer >= TOTAL_CYCLE) {
    shapeTimer -= TOTAL_CYCLE;
    shapeIndex = nextShapeIndex;
    nextShapeIndex = (shapeIndex + 1) % shapes.length;
  }

  let t = 0;
  if (shapeTimer > SHAPE_DURATION) {
    const progress = (shapeTimer - SHAPE_DURATION) / TRANSITION_DURATION;
    t = Math.min(progress, 1);
    t = t * t * (3 - 2 * t);
  }

  if (shapes.length > 0 && geometry && baseColors) {
    const currentShape = shapes[shapeIndex];
    const nextShape = shapes[nextShapeIndex];

    if (currentShape && nextShape) {
      const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
      if (positionAttr) {
        const positions = positionAttr.array as Float32Array;
        for (let i = 0; i < positions.length / 3; i++) {
          const i3 = i * 3;
          const x1 = currentShape[i3]!;
          const y1 = currentShape[i3 + 1]!;
          const z1 = currentShape[i3 + 2]!;

          const x2 = nextShape[i3]!;
          const y2 = nextShape[i3 + 1]!;
          const z2 = nextShape[i3 + 2]!;

          const nx = x1 * (1 - t) + x2 * t;
          const ny = y1 * (1 - t) + y2 * t;
          const nz = z1 * (1 - t) + z2 * t;

          positions[i3] = isNaN(nx) ? 0 : nx;
          positions[i3 + 1] = isNaN(ny) ? 0 : ny;
          positions[i3 + 2] = isNaN(nz) ? 0 : nz;
        }
        positionAttr.needsUpdate = true;
      }
    }

    const colorAttr = geometry.getAttribute("color") as THREE.BufferAttribute | undefined;
    if (colorAttr) {
      const colorArray = colorAttr.array as Float32Array;
      for (let i = 0; i < colorArray.length; i += 3) {
        const brightness = 0.85 + Math.sin(time * 0.3 + i * 0.01) * 0.15;
        colorArray[i] = baseColors[i]! * brightness;
        colorArray[i + 1] = baseColors[i + 1]! * brightness;
        colorArray[i + 2] = baseColors[i + 2]! * brightness;
      }
      colorAttr.needsUpdate = true;
    }
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
};

const stopAnimation = () => {
  isAnimating = false;
  cancelAnimationFrame(animationFrameId);
};

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAnimation();
  } else {
    isAnimating = true;
    animate();
  }
};

onMounted(() => {
  const container = containerRef.value;
  if (!container) return;

  const isMobile = container.clientWidth < 768;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = isMobile ? 15 : 12;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  shapes = [
    createHelix(),
    createDNA(),
    createTrefoilKnot(),
    createTesseract(),
    createInfinity(),
    createAtom(),
    createButterfly(),
    createHyperboloid(),
  ];

  shapeIndex = 0;
  nextShapeIndex = 1;
  shapeTimer = 0;

  baseColors = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    baseColors[i * 3] = 1.0;
    baseColors[i * 3 + 1] = 1.0;
    baseColors[i * 3 + 2] = 1.0;
  }

  const dynamicColors = new Float32Array(baseColors);

  geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(shapes[0]!), 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(dynamicColors, 3));

  material = new THREE.PointsMaterial({
    size: isMobile ? 0.055 : 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);

  resizeObserver = new ResizeObserver(() => handleResize());
  resizeObserver.observe(container);

  updatePointsOffset();

  if (prefersReducedMotion) {
    renderer.render(scene, camera);
  } else {
    isAnimating = true;
    animate();
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }
});

onUnmounted(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  stopAnimation();

  if (scene && points) {
    scene.remove(points);
  }

  geometry?.dispose();
  material?.dispose();
  renderer?.dispose();

  if (containerRef.value && renderer?.domElement && containerRef.value.contains(renderer.domElement)) {
    containerRef.value.removeChild(renderer.domElement);
  }

  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>
