import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float, Lathe } from "@react-three/drei";
import * as THREE from "three";

// Procedural premium plastic bottle built from a lathe profile.
const BottleMesh = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.25;
  });

  // Bottle silhouette (in metres). Y goes from 0 (base) up.
  const profile: THREE.Vector2[] = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.55, 0.0),
    new THREE.Vector2(0.6, 0.05),
    new THREE.Vector2(0.62, 0.15),
    new THREE.Vector2(0.6, 0.4),
    new THREE.Vector2(0.6, 1.5),
    new THREE.Vector2(0.58, 1.7),
    new THREE.Vector2(0.5, 1.85),
    new THREE.Vector2(0.35, 1.95),
    new THREE.Vector2(0.22, 2.05),
    new THREE.Vector2(0.2, 2.2),
  ];

  return (
    <group ref={groupRef} position={[0, -1.05, 0]}>
      {/* Glass-like body */}
      <Lathe args={[profile, 64]}>
        <meshPhysicalMaterial
          color="#eaf6ff"
          transmission={0.92}
          thickness={0.5}
          roughness={0.08}
          metalness={0}
          ior={1.45}
          attenuationColor="#cfe7ff"
          attenuationDistance={1.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
        />
      </Lathe>

      {/* Water level inside — subtle blue volume */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 1.6, 48, 1, false]} />
        <meshPhysicalMaterial
          color="#9fd8ff"
          transmission={0.7}
          thickness={1}
          roughness={0.05}
          ior={1.33}
          attenuationColor="#7ec8ff"
          attenuationDistance={0.6}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Gold cap */}
      <mesh position={[0, 2.27, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.18, 48]} />
        <meshStandardMaterial color="#d4a857" metalness={1} roughness={0.18} />
      </mesh>

      {/* Label band */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.605, 0.605, 0.55, 48, 1, true]} />
        <meshStandardMaterial color="#0b0b10" metalness={0.4} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const BottleShowcase3D = () => {
  return (
    <div className="relative w-full h-[460px] sm:h-[560px]">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 4.2], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.4} />
        <spotLight position={[3, 6, 4]} intensity={40} angle={0.5} penumbra={1} castShadow />
        <spotLight position={[-4, 3, -2]} intensity={20} color="#7ec8ff" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
            <BottleMesh />
          </Float>
          <ContactShadows position={[0, -1.05, 0]} opacity={0.55} scale={6} blur={2.4} far={3} />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.7} />
      </Canvas>

      {/* Hint */}
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-body pointer-events-none">
        Drag to rotate
      </p>
    </div>
  );
};
