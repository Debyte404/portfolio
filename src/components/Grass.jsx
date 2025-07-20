// src/components/Grass.jsx

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

// --- SHADER FOR THE GRASS BLADES (Unchanged Logic, New Colors) ---
const BladeVertexShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  // snoise function...
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vec3 instancePos = instanceMatrix[3].xyz;
    float wind = snoise(instancePos * 0.5 - time * 0.8) * position.y * 1.5;
    vec3 animatedPos = position;
    animatedPos.x += wind;
    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(animatedPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    vUv = uv;
    vNormal = normalize(normalMatrix * (instanceMatrix * vec4(normal, 0.0)).xyz);
    vViewPosition = -viewPosition.xyz;
  }
`;

const BladeFragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    float outlineStrength = 1.0 - smoothstep(0.0, 0.25, dot(vNormal, normalize(vViewPosition)));
    
    // --- Lighter, yellowish colors ---
    vec3 topColor = vec3(0.8, 0.8, 0.3); // Bright yellow-green
    vec3 bottomColor = vec3(0.3, 0.4, 0.1); // Darker olive
    vec3 grassColor = mix(bottomColor, topColor, vUv.y);
    
    vec3 outlineColor = vec3(0.05, 0.05, 0.0); // Dark brown outline
    vec3 finalColor = mix(grassColor, outlineColor, outlineStrength);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const GrassMaterial = shaderMaterial({ time: 0 }, BladeVertexShader, BladeFragmentShader);
extend({ GrassMaterial });

// --- GROUND COMPONENT FOR BUMPY TERRAIN ---
function Ground() {
  const groundRef = useRef();
  useFrame(({ clock }) => {
    // This can be used to animate the ground bumps if desired
  });
  
  return (
    <mesh ref={groundRef} rotation-x={-Math.PI / 2}>
      {/* Plane with many segments for smooth deformation */}
      <planeGeometry args={[100, 100, 128, 128]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
        }}
        vertexShader={`
          uniform float time;
          varying vec3 vPos;
          // Include snoise function again here...
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g; vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx; vec3 x2 = x0 - i2 + C.yyy; vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857; vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy; vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0) * 2.0 + 1.0; vec4 s1 = floor(b1) * 2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x); vec3 p1 = vec3(a0.zw, h.y); vec3 p2 = vec3(a1.xy, h.z); vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
          }
          void main() {
            vec3 pos = position;
            // Use noise to displace the z-axis (which is "up" after rotation)
            float bump = snoise(pos * 0.1) * 2.0;
            pos.z += bump;
            vPos = pos;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vPos;
          void main() {
            // Color the ground based on its height for a bit of variation
            vec3 highColor = vec3(0.4, 0.5, 0.2);
            vec3 lowColor = vec3(0.2, 0.25, 0.1);
            gl_FragColor = vec4(mix(lowColor, highColor, smoothstep(-2.0, 2.0, vPos.z)), 1.0);
          }
        `}
      />
    </mesh>
  );
}

// --- MAIN GRASS COMPONENT ---
export function Grass(props) {
  const meshRef = useRef();
  const materialRef = useRef();
  const count = 40000;
  const bladeGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(0.15, 1.5, 1, 4);
    geometry.translate(0, 0.75, 0);
    return geometry;
  }, []);
  
  useEffect(() => {
    const dummy = new THREE.Object3D();
    const radius = 50;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * Math.sqrt(Math.random());
      dummy.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.scale.setScalar(0.7 + Math.random() * 0.6);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame(({ clock }) => {
    materialRef.current.time = clock.getElapsedTime();
  });

  return (
    <group {...props}>
      <Ground />
      <instancedMesh ref={meshRef} args={[bladeGeometry, null, count]}>
        <grassMaterial ref={materialRef} side={THREE.DoubleSide} />
      </instancedMesh>
    </group>
  );
}
