import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time / 4);
    meshRef.current.rotation.y = Math.cos(time / 2);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 15]} />
        <MeshDistortMaterial 
          color="#6EA8FF" 
          speed={3} 
          distort={0.4} 
          radius={1}
          emissive="#222"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function CinematicObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY / (document.body.scrollHeight - window.innerHeight));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 + scroll * 5;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 + scroll * 2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#0066FF"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#001133"
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#0066FF" />
        <CinematicObject />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
