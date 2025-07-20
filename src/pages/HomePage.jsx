// src/pages/HomePage.jsx

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "../components/Chainsawmangrave";
import { Grass } from "../components/Grass";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { CameraUpdater } from "../components/CameraUpdater"; // Import the new component
import { useScreenWidth } from "../hooks/useScreenWidth";
import { AmbientSound } from "../components/AmbientSound";
import { Sky } from "../components/Sky";

import TerminalTitle from "../components/TerminalTitle";

import SocialLinksBar from "../components/SocialLinkBar";

import AboutSection from "../components/sections/AboutSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import AchievementsSection from "../components/sections/Achievements";
import InfoSection from "../components/sections/PersonalSection";

import LoadingScreen from "../components/LoadingScreen";

function Fog() {
  return <fog attach="fog" args={["#7B8DAA", 25, 60]} />;
}

export default function HomePage() {
  // 1. Get the live screen width
  const screenWidth = useScreenWidth();
  // Camera position chosen to frame the scene's origin effectively
  const cameraProps = useMemo(
    () => ({
      position: [-6.78, 15.15, 29.65], //-0.47, 19.15, 30.69
      fov: 30,
    }),
    []
  );

  // 2. Define two different camera targets
  const desktopTarget = useMemo(() => new THREE.Vector3(6.98, 7.93, 1.34), []);
  // For mobile, look further to the left (X-coordinate is decreased)
  const mobileTarget = useMemo(() => new THREE.Vector3(0.21, 8.06, 0.36), []);

  // 3. Choose which target to use based on the screen width
  const cameraTarget = screenWidth < 1200 ? mobileTarget : desktopTarget;

  return (
    <div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#7B8DAA",
        }}
      >
        {/* 2. Add the invisible AmbientSound component */}
        <AmbientSound src="assets/wind.mp3" volume={0.25} />

        <AmbientSound src="assets/chainsaw.mp3" volume={0.1} />

        <Canvas
          camera={cameraProps}
          style={{ background: "transparent", zIndex: 1 }}
          // onCreated={({ camera }) => {
          //   camera.lookAt(cameraTarget);
          //   camera.updateProjectionMatrix();
          // }}
        >
          <Fog />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={1} position={[16, 50, 6]} />
          <CameraUpdater target={cameraTarget} />
          <Suspense fallback={null}>
            {/* 
            Positioning both the model and grass at the scene's origin
            for a stable and predictable layout.
          */}
            {/* 2. Add the Sky component to your scene */}
            {/* <Environment files="/assets/sky4k.exr" background intensity={0.1} /> */}
            <Sky />
            <Model
              position={[0, -0.5, 0]}
              scale={0.7}
              rotation-y={Math.PI * 0.15}
            />
            <Grass position={[0, -0.5, 0]} />
          </Suspense>

          {/* <OrbitControls 
          target={cameraTarget}
          onChange={(event) => {
            const camera = event.target.object;
            const target = event.target.target; // Now we can also see the target
            console.log(`Camera Position: [${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}]`);
            console.log(`Controls Target: [${target.x.toFixed(2)}, ${target.y.toFixed(2)}, ${target.z.toFixed(2)}]`);
          }}
        /> */}
        </Canvas>
        {/* Container for the Title (Stays at the top) */}
        <div
          style={{
            position: "absolute",
            top: "2rem", // Stays fixed at the top
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            textAlign: "center",
            //   background: 'pink',
            width: "90%",
          }}
        >
          <TerminalTitle />
        </div>

        {/* Container for the Social Links (Moves on smaller screens) */}
        <div
          style={{
            position: "absolute",
            // *** THIS IS THE CHANGE ***
            // On mobile, it's near the bottom. On desktop, it's below the title.
            top: screenWidth < 1200 ? "85%" : "9rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <SocialLinksBar />
        </div>
        {/* --- THIS IS THE NEW GRADIENT OVERLAY --- */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "30px", // Adjust height to control the fade distance
            background:
              "linear-gradient(to top, rgba(30, 2, 2, 1), transparent)",
            zIndex: 2, // Ensures it's above the canvas but below UI elements
          }}
        />
        {/* --- END OF NEW GRADIENT OVERLAY --- */}
      </div>
      <LoadingScreen />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "100%",
          width: "100%",
          height: "100%",
          backgroundColor: "#7B8DAA",
        }}
      >
        <AboutSection />
       
        <div style={{ position: "relative" }}>
            {/* --- THIS IS THE NEW GRADIENT OVERLAY --- */}
        <div
          style={{
            position: "absolute",
            // bottom: 0,
            top: -20,
            left: 0,
            width: "100%",
            height: "30px", // Adjust height to control the fade distance
            background:
              "linear-gradient(to top, rgba(30, 2, 2, 1), transparent)",
            zIndex: 2, // Ensures it's above the canvas but below UI elements
          }}
        />
        {/* --- END OF NEW GRADIENT OVERLAY --- */}
          <ExperienceSection />
        </div>

        <div style={{ position: "relative" }}>
            {/* --- THIS IS THE NEW GRADIENT OVERLAY --- */}
        <div
          style={{
            position: "absolute",
            // bottom: 0,
            top: -20,
            left: 0,
            width: "100%",
            height: "30px", // Adjust height to control the fade distance
            background:
              "linear-gradient(to top, rgba(30, 2, 2, 1), transparent)",
            zIndex: 2, // Ensures it's above the canvas but below UI elements
          }}
        />
        {/* --- END OF NEW GRADIENT OVERLAY --- */}
          <ProjectsSection />
        </div>

        <div
          style={{
            position: "absolute",
            // bottom: 0,
            top: -20,
            left: 0,
            width: "100%",
            height: "30px", // Adjust height to control the fade distance
            background:
              "linear-gradient(to top, rgba(30, 2, 2, 1), transparent)",
            zIndex: 2, // Ensures it's above the canvas but below UI elements
          }}
        />
        {/* --- END OF NEW GRADIENT OVERLAY --- */}
          <AchievementsSection />
        
        <InfoSection />
        
        {/* <div
          style={{
            position: "absolute",
            // bottom: 0,
            top: -20,
            left: 0,
            width: "100%",
            height: "30px", // Adjust height to control the fade distance
            background:
              "linear-gradient(to top, rgba(30, 2, 2, 1), transparent)",
            zIndex: 2, // Ensures it's above the canvas but below UI elements
          }}
        />
        <InfoSection />
        // </div> */}
        </div>
    </div>
  );
}
