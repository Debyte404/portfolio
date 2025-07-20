// src/components/Sky.jsx

import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const SkyShaderMaterial = shaderMaterial(
  // Uniforms
  {
    time: 0,
    // Using two shades of blue for a dark, atmospheric sky
    skyColor: new THREE.Color('#2E4057'),      // A very dark navy blue for the top
    horizonColor: new THREE.Color('#7B8DAA'),   // A lighter, muted blue for the horizon
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 skyColor;
    uniform vec3 horizonColor;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float valueNoise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      // Create a gradient that is darker at the top (zenith) and lighter at the bottom (horizon)
      vec3 finalColor = mix(horizonColor, skyColor, vUv.y);
      
      // Animated black cloud noise
      vec2 cloudUv = vUv * vec2(4.0, 2.0) + vec2(time * -0.05, 0.0);
      float cloudNoise = valueNoise(cloudUv);
      float cloudAlpha = smoothstep(0.55, 0.7, cloudNoise);
      
      // Mix a black color for the clouds
      finalColor = mix(finalColor, vec3(0.0), cloudAlpha);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ SkyShaderMaterial });

export function Sky() {
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[500, 32, 32]} />
      <skyShaderMaterial ref={materialRef} side={THREE.BackSide} />
    </mesh>
  );
}
