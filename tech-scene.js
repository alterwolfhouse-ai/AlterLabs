import * as THREE from "https://unpkg.com/three@0.164.1/build/three.module.js";

const mountedScenes = new WeakMap();

function cssVar(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function makeColor(name, fallback) {
  return new THREE.Color(cssVar(name, fallback));
}

function setMatrix(mesh, index, position, scale) {
  const matrix = new THREE.Matrix4();
  matrix.compose(position, new THREE.Quaternion(), new THREE.Vector3(scale, scale, scale));
  mesh.setMatrixAt(index, matrix);
}

function createNodePositions(count) {
  const positions = [];
  const rings = [2.3, 3.5, 4.8, 6.1];

  for (let i = 0; i < count; i += 1) {
    const ring = rings[i % rings.length];
    const angle = i * 2.399963 + (i % 7) * 0.08;
    const y = Math.sin(i * 0.53) * 1.9 + Math.cos(i * 0.21) * 0.6;
    const zDrift = Math.sin(i * 0.37) * 1.2;
    positions.push(new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring + zDrift
    ));
  }

  return positions;
}

function connectNodes(positions) {
  const values = [];

  for (let i = 0; i < positions.length; i += 1) {
    const a = positions[i];
    const b = positions[(i + 1) % positions.length];
    const c = positions[(i + 5) % positions.length];
    values.push(a.x, a.y, a.z, b.x, b.y, b.z);
    if (i % 2 === 0) values.push(a.x, a.y, a.z, c.x, c.y, c.z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(values, 3));
  return geometry;
}

function createParticles(count) {
  const positions = [];
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 7 + Math.random() * 13;
    positions.push(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 12,
      Math.sin(angle) * radius - 4
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

export function mountScene(container) {
  if (!container || mountedScenes.has(container)) return mountedScenes.get(container);

  let width = Math.max(320, container.clientWidth);
  let height = Math.max(360, container.clientHeight);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 2.6, 12.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = "tech-canvas";
  container.appendChild(renderer.domElement);
  container.classList.add("is-mounted");

  const accent = makeColor("--accent", "#b45cff");
  const electric = makeColor("--electric", "#7c5cff");
  const signal = makeColor("--signal", "#ff4fd8");
  const copper = makeColor("--copper", "#5f6cff");

  scene.add(new THREE.AmbientLight(0x9fb3ff, 0.35));
  const key = new THREE.PointLight(electric, 4.5, 28);
  key.position.set(-3, 5, 7);
  scene.add(key);
  const side = new THREE.PointLight(copper, 2.8, 22);
  side.position.set(6, -2, 3);
  scene.add(side);

  const root = new THREE.Group();
  root.position.set(1.35, 0.35, -0.8);
  scene.add(root);

  const nodeCount = window.matchMedia("(max-width: 720px)").matches ? 46 : 78;
  const positions = createNodePositions(nodeCount);

  const nodeGeometry = new THREE.SphereGeometry(0.08, 18, 18);
  const nodeMaterial = new THREE.MeshStandardMaterial({
    color: accent,
    emissive: accent,
    emissiveIntensity: 1.2,
    roughness: 0.35,
    metalness: 0.25
  });
  const nodeMesh = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, positions.length);
  positions.forEach((position, index) => {
    setMatrix(nodeMesh, index, position, index % 9 === 0 ? 1.9 : 1);
  });
  root.add(nodeMesh);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: electric,
    transparent: true,
    opacity: 0.35
  });
  const lines = new THREE.LineSegments(connectNodes(positions), lineMaterial);
  root.add(lines);

  const ringGroup = new THREE.Group();
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: signal,
    transparent: true,
    opacity: 0.42,
    wireframe: true
  });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.012, 8, 120), ringMaterial);
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(3.45, 0.01, 8, 140), ringMaterial.clone());
  const ringC = new THREE.Mesh(new THREE.TorusGeometry(4.75, 0.008, 8, 160), ringMaterial.clone());
  ringB.rotation.x = Math.PI / 2.8;
  ringC.rotation.y = Math.PI / 2.6;
  ringGroup.add(ringA, ringB, ringC);
  root.add(ringGroup);

  const coreMaterial = new THREE.MeshStandardMaterial({
    color: "#f9fff8",
    emissive: accent,
    emissiveIntensity: 1.9,
    roughness: 0.2,
    metalness: 0.4
  });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.58, 1), coreMaterial);
  root.add(core);

  const particleMaterial = new THREE.PointsMaterial({
    color: "#dbe8ff",
    size: 0.025,
    transparent: true,
    opacity: 0.5,
    depthWrite: false
  });
  const particles = new THREE.Points(createParticles(window.matchMedia("(max-width: 720px)").matches ? 240 : 520), particleMaterial);
  scene.add(particles);

  const grid = new THREE.GridHelper(18, 24, 0xb45cff, 0x29153d);
  grid.position.set(1.2, -4.25, -1.4);
  grid.material.transparent = true;
  grid.material.opacity = 0.18;
  scene.add(grid);

  const pointer = { x: 0, y: 0 };
  const onPointerMove = (event) => {
    const rect = container.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  };
  container.addEventListener("pointermove", onPointerMove, { passive: true });

  const resize = () => {
    width = Math.max(320, container.clientWidth);
    height = Math.max(360, container.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  let frame = 0;
  let running = true;
  const clock = new THREE.Clock();

  const render = () => {
    if (!running) return;
    const elapsed = clock.getElapsedTime();
    const tempo = reducedMotion ? 0.14 : 1;

    root.rotation.y = elapsed * 0.09 * tempo + pointer.x * 0.18;
    root.rotation.x = -0.12 + pointer.y * 0.08 + Math.sin(elapsed * 0.3) * 0.03 * tempo;
    ringGroup.rotation.z = elapsed * 0.13 * tempo;
    ringGroup.rotation.y = elapsed * 0.07 * tempo;
    core.rotation.x = elapsed * 0.4 * tempo;
    core.rotation.y = elapsed * 0.53 * tempo;
    particles.rotation.y = elapsed * 0.015 * tempo;
    grid.position.z = -1.4 + Math.sin(elapsed * 0.45) * 0.12 * tempo;
    camera.position.x += (pointer.x * 0.45 - camera.position.x) * 0.035;
    camera.position.y += (2.6 - pointer.y * 0.2 - camera.position.y) * 0.035;
    camera.lookAt(0.6, 0, 0);
    lineMaterial.opacity = 0.27 + Math.sin(elapsed * 1.6) * 0.08;
    nodeMaterial.emissiveIntensity = 1.05 + Math.sin(elapsed * 2.2) * 0.24;

    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };

  render();

  const cleanup = () => {
    running = false;
    cancelAnimationFrame(frame);
    observer.disconnect();
    container.removeEventListener("pointermove", onPointerMove);
    container.classList.remove("is-mounted");
    renderer.domElement.remove();
    renderer.dispose();
    nodeGeometry.dispose();
    nodeMaterial.dispose();
    lines.geometry.dispose();
    lineMaterial.dispose();
    ringA.geometry.dispose();
    ringB.geometry.dispose();
    ringC.geometry.dispose();
    ringMaterial.dispose();
    ringB.material.dispose();
    ringC.material.dispose();
    core.geometry.dispose();
    coreMaterial.dispose();
    particles.geometry.dispose();
    particleMaterial.dispose();
    grid.geometry.dispose();
    grid.material.dispose();
    mountedScenes.delete(container);
  };

  mountedScenes.set(container, cleanup);
  return cleanup;
}

window.AlterLabsTech = { mountScene };
