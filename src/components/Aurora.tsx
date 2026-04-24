import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

interface AuroraProps {
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
in vec2 vUv;
out vec4 fragColor;

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

float fbm(vec2 st){
  float v=0.,a=.5;
  vec2 shift=vec2(100.);
  mat2 rot=mat2(cos(.5),sin(.5),-sin(.5),cos(.5));
  for(int i=0;i<5;i++){
    v+=a*snoise(st);
    st=rot*st*2.+shift;
    a*=.5;
  }
  return v;
}

void main(){
  vec2 st=vUv;
  float ar=uResolution.x/uResolution.y;
  st.x*=ar;
  float t=uTime*.05;

  vec2 q=vec2(fbm(st+t),fbm(st+vec2(1.)));
  vec2 r=vec2(
    fbm(st+1.0*q+vec2(1.7,9.2)+.12*t),
    fbm(st+1.0*q+vec2(8.3,2.8)+.10*t)
  );
  float f=fbm(st+r);

  // warm cream base with soft orange/amber wisps
  vec3 base=vec3(1.0,0.98,0.95);
  vec3 col=mix(base, vec3(1.0,0.56,0.18), clamp(f*f*0.5,0.,0.28));
  col=mix(col, vec3(1.0,0.75,0.35), clamp(length(q)*0.18,0.,0.18));
  col=mix(col, vec3(1.0,0.85,0.55), clamp(r.x*0.12,0.,0.12));

  // very subtle — keep nearly white
  col=clamp(col,0.,1.);

  fragColor=vec4(col,0.55);
}`

export default function Aurora({ className = '' }: AuroraProps) {
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
        uTime: { value: 0 },
        uResolution: { value: [container.clientWidth, container.clientHeight] },
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
  }, [])

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`} />
  )
}
