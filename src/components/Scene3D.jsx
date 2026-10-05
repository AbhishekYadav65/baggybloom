import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * One persistent WebGL layer behind the page (pointer-events none). The camera follows scroll 1:1 with the
 * document, so 3D objects stay attached to DOM positions while depth (z) gives real parallax.
 * Tier A = desktop (full), Tier B = phones/tablets (fewer objects, lower DPR, demand rendering after intro).
 */
const FOV = 35;
const DIST = 10;
const UNIT = 2 * DIST * Math.tan(THREE.MathUtils.degToRad(FOV / 2)); // visible world height at z = 0
const input = { mx: 0, my: 0 };
const PAL = ['#F4C9CF', '#F8D2B8', '#D6CBE6', '#F7E7B4'];

function measure() {
  const e = document.getElementById('depth');
  if (!e) return null;
  const b = e.getBoundingClientRect();
  return { hero: { x: b.left + b.width / 2, y: b.top + scrollY + b.height / 2, w: b.width, h: b.height }, W: innerWidth, H: document.body.offsetHeight };
}

/** Clay blob: icosahedron displaced by smooth pseudo-noise, matte. */
function Clay({ r, pos, color }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1, 4);
    const p = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      const n = 1 + 0.16 * Math.sin(v.x * 2.7 + v.y * 1.9) * Math.cos(v.z * 2.3 + v.x * 1.3) + 0.06 * Math.sin(v.y * 6 + v.z * 5);
      p.setXYZ(i, v.x * n, v.y * n, v.z * n);
    }
    g.computeVertexNormals();
    return g;
  }, []);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });
  return (
    <mesh ref={ref} geometry={geo} position={pos} scale={r}>
      <meshStandardMaterial color={color} roughness={0.95} metalness={0} />
    </mesh>
  );
}

/** Acrylic ring: glossy, translucent. */
function GlassRing({ r, pos }) {
  const ref = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    ref.current.rotation.x = 0.9 + Math.sin(t * 0.4) * 0.25;
    ref.current.rotation.y = t * 0.35;
  });
  return (
    <mesh ref={ref} position={pos}>
      <torusGeometry args={[r, r * 0.17, 24, 72]} />
      <meshPhysicalMaterial color="#CFE0EE" roughness={0.12} clearcoat={1} transparent opacity={0.72} />
    </mesh>
  );
}

function Pearls({ u, pos }) {
  return (
    <group position={pos}>
      {[[0, 0, 0, 1], [0.9, -0.5, 0.3, 0.7], [-0.6, -0.9, 0.1, 0.5]].map(([x, y, z, s], i) => (
        <mesh key={i} position={[x * u * 0.05, y * u * 0.05, z * u * 0.05]} scale={u * 0.028 * s}>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial color="#fff4ec" roughness={0.25} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/** The Golden Thread in 3D: a satin tube drawn progressively, looping around the hero bag and tightening on scroll. */
function ThreadLoop({ s, pos }) {
  const g = useRef();
  const geo = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const a = t * Math.PI * 2 * 1.35 - Math.PI * 0.6;
      const r = 0.5 + 0.1 * Math.sin(t * 9);
      pts.push(new THREE.Vector3(Math.cos(a) * r * 0.9, Math.sin(a) * r * 1.05 - t * 0.15, Math.sin(a * 1.7) * 0.35));
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 260, 0.011, 8, false);
  }, []);
  useFrame((st) => {
    const e = st.clock.elapsedTime;
    const sc = Math.min(1, scrollY / innerHeight);
    const n = geo.index.count;
    geo.setDrawRange(0, Math.floor((n * Math.min(1, e / 2.4)) / 3) * 3);
    g.current.scale.setScalar(s * (1 - 0.4 * sc));
    g.current.rotation.z = e * 0.02 + sc * 0.8;
  });
  return (
    <group ref={g} position={pos}>
      <mesh geometry={geo}>
        <meshStandardMaterial color="#D6A445" metalness={0.65} roughness={0.35} />
      </mesh>
    </group>
  );
}

function Hero3D({ h, k }) {
  const g = useRef();
  const A = useThree((s) => s.size.width) >= 1024;
  const wx = (h.x - innerWidth / 2) * k, wy = -h.y * k, w = h.w * k, hh = h.h * k;
  useFrame((s) => {
    g.current.position.y = wy + Math.sin(s.clock.elapsedTime * 0.9) * hh * 0.012;
    if (A) {
      g.current.rotation.y += (input.mx * 0.45 - g.current.rotation.y) * 0.05;
      g.current.rotation.x += (input.my * 0.3 - g.current.rotation.x) * 0.05;
    }
  });
  return (
    <group ref={g} position={[wx, wy, 0]}>
      <Clay r={hh * 0.15} pos={[-w * 0.276, hh * 0.277, -hh * 0.1]} color="#D6CBE6" />
      <GlassRing r={hh * 0.1} pos={[w * 0.327, hh * 0.358, -hh * 0.05]} />
      <Pearls u={hh} pos={[w * 0.3, -hh * 0.3, hh * 0.05]} />
      <ThreadLoop s={hh * 0.9} pos={[w * 0.02, 0, hh * 0.02]} />
    </group>
  );
}

/** Instanced petals drifting down the whole page. */
function Petals({ n, W, H, k }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(
    () => Array.from({ length: n }, (_, i) => ({ x: (Math.random() - 0.5) * W * k, y: -(120 + Math.random() * Math.max(200, H - 500)) * k, z: -2.5 + Math.random() * 3.6, s: (8 + Math.random() * 9) * k, ph: Math.random() * 6.28, sp: 0.2 + Math.random() * 0.4, c: PAL[i % 4] })),
    [n, W, H, k],
  );
  useEffect(() => {
    const c = new THREE.Color();
    data.forEach((d, i) => mesh.current.setColorAt(i, c.set(d.c)));
    mesh.current.instanceColor.needsUpdate = true;
  }, [data]);
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    data.forEach((d, i) => {
      dummy.position.set(d.x + Math.sin(t * d.sp + d.ph) * d.s * 3, d.y + Math.cos(t * d.sp * 0.7 + d.ph) * d.s * 2, d.z);
      dummy.rotation.set(t * d.sp + d.ph, t * d.sp * 0.6, d.ph);
      dummy.scale.set(d.s, d.s * 0.14, d.s * 0.62);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={mesh} args={[null, null, n]}>
      <sphereGeometry args={[1, 10, 8]} />
      <meshStandardMaterial roughness={0.8} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

export function World({ tier }) {
  const { camera, invalidate, size } = useThree();
  const [m, setM] = useState(measure);
  const k = UNIT / size.height; // world units per CSS pixel at z = 0

  useEffect(() => {
    const ro = new ResizeObserver(() => setM(measure()));
    ro.observe(document.body);
    const pm = (e) => {
      input.mx = e.clientX / innerWidth - 0.5;
      input.my = e.clientY / innerHeight - 0.5;
    };
    const sc = () => invalidate();
    if (tier === 'A') addEventListener('pointermove', pm, { passive: true });
    addEventListener('scroll', sc, { passive: true });
    return () => {
      ro.disconnect();
      removeEventListener('pointermove', pm);
      removeEventListener('scroll', sc);
    };
  }, [tier, invalidate]);

  useFrame(() => {
    const t = Math.min(1, scrollY / size.height);
    camera.position.set(0, -(scrollY + size.height / 2) * k, DIST - 1.6 * t); // scroll-driven camera dolly
  });

  return (
    <>
      <hemisphereLight args={['#fff6ea', '#e8c9cf', 0.9]} />
      <directionalLight position={[3, 5, 6]} intensity={1.6} color="#ffe6c4" />
      <directionalLight position={[-4, 1, 3]} intensity={0.5} color="#cfe0ff" />
      {m?.hero && <Hero3D h={m.hero} k={k} />}
      {m && <Petals n={tier === 'A' ? 46 : 18} W={m.W} H={m.H} k={k} />}
    </>
  );
}

export default function Scene3D({ tier, onReady }) {
  const [loop, setLoop] = useState('always');
  useEffect(() => {
    if (tier === 'A') return undefined;
    const t = setTimeout(() => setLoop('demand'), 3600); // let the thread finish drawing, then render on demand
    return () => clearTimeout(t);
  }, [tier]);
  return (
    <Canvas
      frameloop={loop}
      dpr={[1, tier === 'A' ? 1.5 : 1.25]}
      camera={{ fov: FOV, position: [0, 0, DIST], near: 0.1, far: 80 }}
      gl={{ alpha: true, antialias: tier === 'A', powerPreference: 'high-performance' }}
      onCreated={() => onReady?.()}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <World tier={tier} />
    </Canvas>
  );
}
