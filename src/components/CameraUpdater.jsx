import { useFrame } from '@react-three/fiber';

export function CameraUpdater({ target }) {
  // This hook runs on every rendered frame
  useFrame(({ camera }) => {
    // Tell the camera to continuously look at the provided target
    camera.lookAt(target);
  });
  
  // This component doesn't render anything itself
  return null;
}
