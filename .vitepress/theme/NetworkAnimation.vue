<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let animId = null;
let width = 0;
let height = 0;
let dpr = 1;
let mouseX = 0.5;
let mouseY = 0.5;

// --- Config ---
const HUMAN_COUNT = 6;
const AI_COUNT = 6;
const CONNECT_DIST = 220;
const TASK_SPEED = 0.008;
const TASK_SPAWN_RATE = 0.012;

// Colors
const HUMAN_COLOR = { r: 234, g: 88, b: 12 };   // warm orange
const AI_COLOR = { r: 99, g: 102, b: 241 };      // indigo
const DONE_COLOR = { r: 16, g: 185, b: 129 };    // green

// Varied color palettes per type
const HUMAN_COLORS = [
    { r: 234, g: 88, b: 12 },   // orange
    { r: 239, g: 68, b: 68 },   // red
    { r: 245, g: 158, b: 11 },  // amber
    { r: 220, g: 38, b: 38 },   // deep red
    { r: 251, g: 146, b: 60 },  // light orange
];
const AI_COLORS = [
    { r: 99, g: 102, b: 241 },  // indigo
    { r: 139, g: 92, b: 246 },  // violet
    { r: 59, g: 130, b: 246 },  // blue
    { r: 79, g: 70, b: 229 },   // deep indigo
    { r: 167, g: 139, b: 250 }, // light purple
];

class Node {
    constructor(type) {
        this.type = type; // 'human' | 'ai'
        this.x = Math.random();
        this.y = Math.random();
        this.vx = (Math.random() - 0.5) * 0.0003;
        this.vy = (Math.random() - 0.5) * 0.0003;
        // Size variation: range 2.5 ~ 7
        const sizeRand = Math.random();
        this.baseRadius = type === "human"
            ? 3 + sizeRand * 4
            : 2.5 + sizeRand * 3.5;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.015 + Math.random() * 0.015;
        // Opacity variation: 0.4 ~ 0.9
        this.opacity = 0.4 + Math.random() * 0.5;
        // Pick a random color from palette
        const palette = type === "human" ? HUMAN_COLORS : AI_COLORS;
        this._color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
        // Mouse attraction: nodes drift toward cursor
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const attraction = distToMouse < 0.3 ? 0.0006 : 0.00015;
        this.x += this.vx + dx * attraction;
        this.y += this.vy + dy * attraction;
        this.pulse += this.pulseSpeed;
        // bounce
        if (this.x < 0.02 || this.x > 0.98) this.vx *= -1;
        if (this.y < 0.02 || this.y > 0.98) this.vy *= -1;
        this.x = Math.max(0.02, Math.min(0.98, this.x));
        this.y = Math.max(0.02, Math.min(0.98, this.y));
    }
    get radius() {
        return this.baseRadius + Math.sin(this.pulse) * (this.baseRadius * 0.25);
    }
    get color() {
        return this._color;
    }
}

class Task {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.progress = 0;
        this.done = false;
        this.doneAlpha = 1;
    }
    update() {
        if (!this.done) {
            this.progress += TASK_SPEED;
            if (this.progress >= 1) {
                this.done = true;
                this.progress = 1;
            }
        } else {
            this.doneAlpha -= 0.025;
        }
    }
    get alive() {
        return this.doneAlpha > 0;
    }
    get x() {
        return this.from.x + (this.to.x - this.from.x) * this.progress;
    }
    get y() {
        return this.from.y + (this.to.y - this.from.y) * this.progress;
    }
}

let nodes = [];
let tasks = [];
let connections = [];

function init() {
    nodes = [];
    tasks = [];
    for (let i = 0; i < HUMAN_COUNT; i++) nodes.push(new Node("human"));
    for (let i = 0; i < AI_COUNT; i++) nodes.push(new Node("ai"));
}

function findConnections() {
    connections = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = (nodes[i].x - nodes[j].x) * width;
            const dy = (nodes[i].y - nodes[j].y) * height;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DIST) {
                connections.push({
                    a: nodes[i],
                    b: nodes[j],
                    alpha: 1 - dist / CONNECT_DIST,
                });
            }
        }
    }
}

function spawnTasks() {
    if (connections.length === 0) return;
    if (Math.random() < TASK_SPAWN_RATE) {
        const conn = connections[Math.floor(Math.random() * connections.length)];
        // Task flows from human to AI or AI to human
        const from = Math.random() > 0.5 ? conn.a : conn.b;
        const to = from === conn.a ? conn.b : conn.a;
        tasks.push(new Task(from, to));
    }
}

function draw(ctx) {
    ctx.clearRect(0, 0, width * dpr, height * dpr);
    ctx.save();
    ctx.scale(dpr, dpr);

    // Connections
    for (const conn of connections) {
        ctx.beginPath();
        ctx.moveTo(conn.a.x * width, conn.a.y * height);
        ctx.lineTo(conn.b.x * width, conn.b.y * height);
        ctx.strokeStyle = `rgba(160, 160, 180, ${conn.alpha * 0.15})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }

    // Nodes
    for (const node of nodes) {
        const x = node.x * width;
        const y = node.y * height;
        const r = node.radius;
        const c = node.color;

        const o = node.opacity;

        // Glow (scaled by node opacity & size)
        const glowR = r * 5;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${0.2 * o})`);
        grad.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${o})`;
        ctx.fill();

        // Icon hint: human = tiny ring, AI = tiny square
        if (node.type === "human") {
            ctx.beginPath();
            ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.7 * o})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
        } else {
            const s = r * 0.45;
            ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * o})`;
            ctx.fillRect(x - s, y - s, s * 2, s * 2);
        }
    }

    // Tasks
    for (const task of tasks) {
        const x = task.x * width;
        const y = task.y * height;
        const alpha = task.done ? task.doneAlpha : 0.9;
        const c = task.done ? DONE_COLOR : { r: 255, g: 255, b: 255 };
        const r = task.done ? 3 + (1 - task.doneAlpha) * 8 : 2.5;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.8})`;
        ctx.fill();

        // Completion burst
        if (task.done && task.doneAlpha > 0.5) {
            const burstR = (1 - task.doneAlpha) * 2 * 20;
            const grad = ctx.createRadialGradient(x, y, 0, x, y, burstR);
            grad.addColorStop(0, `rgba(${DONE_COLOR.r}, ${DONE_COLOR.g}, ${DONE_COLOR.b}, ${(task.doneAlpha - 0.5) * 0.4})`);
            grad.addColorStop(1, `rgba(${DONE_COLOR.r}, ${DONE_COLOR.g}, ${DONE_COLOR.b}, 0)`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, burstR, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}

function frame() {
    if (!canvas.value) return;
    const ctx = canvas.value.getContext("2d");

    for (const node of nodes) node.update();
    findConnections();
    spawnTasks();
    for (const task of tasks) task.update();
    tasks = tasks.filter((t) => t.alive);

    draw(ctx);
    animId = requestAnimationFrame(frame);
}

function resize() {
    if (!canvas.value) return;
    const rect = canvas.value.parentElement.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    canvas.value.width = width * dpr;
    canvas.value.height = height * dpr;
    canvas.value.style.width = width + "px";
    canvas.value.style.height = height + "px";
}

function onMouse(e) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
}

onMounted(() => {
    init();
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    animId = requestAnimationFrame(frame);
});

onUnmounted(() => {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", onMouse);
});
</script>

<template>
    <canvas ref="canvas" class="network-canvas" />
</template>

<style scoped>
.network-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}
</style>
