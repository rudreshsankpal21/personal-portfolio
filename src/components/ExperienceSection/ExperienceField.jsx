import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const vertex = /* glsl */ `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// Animated topographic contour lines, bent by the cursor and scroll position.
const fragment = /* glsl */ `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uProgress;
uniform vec3 uColor;
in vec2 vUv;
out vec4 fragColor;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
  float t = uTime * 0.04;

  vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 - t + 3.1));
  float d = length(p - m);
  float lift = 0.35 * exp(-d * d * 5.0);
  float h = fbm(p * 1.1 + q * 1.7 + vec2(0.0, uProgress * 1.4)) + lift;

  float bands = h * 26.0;
  float w = fwidth(bands);
  float line = 1.0 - smoothstep(0.0, w * 1.4, abs(fract(bands) - 0.5) - 0.5 + w);
  float major = 1.0 - smoothstep(0.0, w * 5.0 * 1.4, abs(fract(bands / 5.0) - 0.5) - 0.5 + w * 5.0);

  float glow = exp(-d * d * 3.0);
  float edge = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
  float a = (line * 0.22 + major * 0.35 + glow * line * 0.9) * edge;

  vec3 col = mix(uColor, vec3(0.75, 0.85, 1.0), glow * 0.6);
  fragColor = vec4(col * a, a);
}`;

export default function ExperienceField({ className }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.5),
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!renderer.isWebgl2) return undefined;

    const { gl } = renderer;
    gl.clearColor(0, 0, 0, 0);
    host.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: [1, 1] },
        uMouse: { value: [0.5, 0.5] },
        uProgress: { value: 0 },
        uColor: { value: [0.231, 0.51, 0.965] },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(host.offsetWidth, host.offsetHeight);
      program.uniforms.uRes.value = [host.offsetWidth, host.offsetHeight];
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      mouse.tx = (event.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (event.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let visible = false;
    let raf = 0;
    const render = (time) => {
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const rect = host.getBoundingClientRect();
      const progress =
        (window.innerHeight - rect.top) / (rect.height + window.innerHeight);

      program.uniforms.uTime.value = time * 0.001;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      program.uniforms.uProgress.value = Math.min(1, Math.max(0, progress));
      renderer.render({ scene: mesh });

      if (visible && !reduceMotion) raf = requestAnimationFrame(render);
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(render);
    });
    intersection.observe(host);

    return () => {
      cancelAnimationFrame(raf);
      intersection.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, []);

  return <div className={className} ref={hostRef} aria-hidden="true" />;
}
