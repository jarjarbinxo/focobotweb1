import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

interface GalaxyProps {
  speed?: number
  swirl?: number
  amplitude?: number
  starDensity?: number
  className?: string
}

const VERT = /* glsl */ `#version 300 es
in vec2 uv;
in vec3 position;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}`

const FRAG = /* glsl */ `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uSwirl;
uniform float uAmplitude;
uniform float uStarDensity;
in vec2 vUv;
out vec4 fragColor;

// ── Simplex noise helpers (verbatim from Aurora.tsx) ─────────────────────────
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}

float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;
  x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m;m=m*m;
  vec3 x2=2.*fract(p*C.www)-1.;
  vec3 h=abs(x2)-.5;
  vec3 ox=floor(x2+.5);
  vec3 a0=x2-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}

// ── 3-octave FBM ─────────────────────────────────────────────────────────────
float fbm3(vec2 st){
  float v=0., a=0.5;
  mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));
  for(int i=0;i<3;i++){
    v+=a*snoise(st);
    st=rot*st*2.+vec2(100.);
    a*=0.5;
  }
  return v;
}

// ── Hash helpers for stars ────────────────────────────────────────────────────
float hash21(vec2 p){
  p=fract(p*vec2(127.1,311.7));
  p+=dot(p,p+45.32);
  return fract(p.x*p.y);
}

void main(){
  vec2 st = vUv;
  float ar = uResolution.x / uResolution.y;
  st.x *= ar;

  // ── 1. Deep-space background with vignette ──────────────────────────────────
  vec2 centered = st - vec2(0.5 * ar, 0.5);
  float vignette = 1.0 - smoothstep(0.3, 1.1, length(centered));
  vec3 col = vec3(0.04, 0.04, 0.06) * (0.6 + 0.4 * vignette);

  // ── 2. FBM nebula clouds ────────────────────────────────────────────────────
  float t = uTime * 0.05;
  vec2 nebulaUv = st * 1.2 + vec2(t * 0.4, t * 0.2);
  float nebula = fbm3(nebulaUv) * 0.5 + 0.5;   // remap to [0,1]
  nebula *= uAmplitude;

  vec3 darkPurpleBlue = vec3(0.07, 0.04, 0.15);
  vec3 brandOrange    = vec3(1.0,  0.48, 0.1);
  vec3 nebulaCol = mix(darkPurpleBlue, brandOrange, clamp(nebula * 0.9, 0.0, 1.0));
  col = mix(col, nebulaCol, clamp(nebula * 0.45 * uAmplitude, 0.0, 0.55));

  // ── 3. Spiral arms ──────────────────────────────────────────────────────────
  float r     = length(centered) * 2.0;          // 0 at centre
  float angle = atan(centered.y, centered.x);

  // Two arms: cos modulation in polar space with swirl offset
  float arms = cos(angle * 2.0 + r * uSwirl - uTime * uSpeed * 0.5);
  arms = smoothstep(0.35, 1.0, arms);            // sharpen bands
  float radialFalloff = exp(-r * 1.8);
  float armStrength = arms * radialFalloff * uAmplitude;

  vec3 armCol = mix(vec3(0.2, 0.08, 0.35), brandOrange, clamp(armStrength * 1.2, 0.0, 1.0));
  col = mix(col, armCol, clamp(armStrength * 0.7, 0.0, 0.7));

  // ── 4. Galactic core glow ───────────────────────────────────────────────────
  float dist = length(centered);
  float core = exp(-dist * 12.0);
  vec3 coreCol = mix(vec3(1.0, 0.7, 0.3), vec3(1.0, 1.0, 0.95), core);
  col = mix(col, coreCol, core * 0.85);

  // ── 5. Stars (3 density passes) ────────────────────────────────────────────
  vec2 fragNorm = gl_FragCoord.xy / uResolution;

  // Pass 1 — dense fine stars
  {
    vec2 grid = floor(gl_FragCoord.xy / 1.0);
    float h = hash21(grid * 1.0);
    if(h > (1.0 - 0.004 * uStarDensity)){
      float twinkle = 0.6 + 0.4 * sin(uTime * 3.0 + h * 6.28318);
      float sz = fract(h * 13.7) * 0.8 + 0.2;
      col += vec3(twinkle * sz * 0.9);
    }
  }

  // Pass 2 — medium stars, sparser
  {
    vec2 grid = floor(gl_FragCoord.xy / 3.0);
    float h = hash21(grid * 3.0);
    if(h > (1.0 - 0.002 * uStarDensity)){
      float twinkle = 0.5 + 0.5 * sin(uTime * 2.1 + h * 9.42);
      vec3 starTint = mix(vec3(0.8, 0.85, 1.0), vec3(1.0, 0.85, 0.6), fract(h * 7.3));
      col += starTint * twinkle * 0.7;
    }
  }

  // Pass 3 — rare bright stars
  {
    vec2 grid = floor(gl_FragCoord.xy / 7.0);
    float h = hash21(grid * 7.0);
    if(h > (1.0 - 0.0008 * uStarDensity)){
      float twinkle = 0.4 + 0.6 * sin(uTime * 1.3 + h * 12.56);
      col += vec3(1.0, 0.95, 0.8) * twinkle * 1.2;
    }
  }

  col = clamp(col, 0.0, 1.0);

  fragColor = vec4(col, 0.85);
}`

export default function Galaxy({
  speed = 0.3,
  swirl = 1.4,
  amplitude = 1.0,
  starDensity = 1.0,
  className,
}: GalaxyProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)

    // Style canvas to fill container
    const canvas = gl.canvas as HTMLCanvasElement
    canvas.style.position = 'absolute'
    canvas.style.inset = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    container.appendChild(canvas)

    const geometry = new Triangle(gl)

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime:        { value: 0 },
        uResolution:  { value: [container.clientWidth, container.clientHeight] },
        uSpeed:       { value: speed },
        uSwirl:       { value: swirl },
        uAmplitude:   { value: amplitude },
        uStarDensity: { value: starDensity },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })

    let rafId: number

    const render = (t: number) => {
      rafId = requestAnimationFrame(render)
      program.uniforms.uTime.value = t * 0.001
      renderer.render({ scene: mesh })
    }

    rafId = requestAnimationFrame(render)

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        renderer.setSize(width, height)
        program.uniforms.uResolution.value = [width, height]
      }
    })
    observer.observe(container)

    // Initial size
    renderer.setSize(container.clientWidth, container.clientHeight)
    program.uniforms.uResolution.value = [container.clientWidth, container.clientHeight]

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [speed, swirl, amplitude, starDensity])

  return (
    <div ref={containerRef} className={className} />
  )
}
