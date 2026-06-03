"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ThreeModule = typeof import("three");
type Object3D = import("three").Object3D;

type InteractiveDeviceModelProps = {
  locale: "en" | "zh";
};

const STATIC_RENDER = "/renders/siriusception-device-transparent.webp";
const OPTIMIZED_MODEL = "/models/siriusception-device-optimized.glb";

function prefersStaticRender() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function mobileCanLoad3d() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches && !prefersStaticRender();
}

function getViewerPixelRatio() {
  if (typeof window === "undefined") return 1;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  return Math.min(window.devicePixelRatio || 1, isMobile ? 1.35 : 1.8);
}

function materialForMesh(THREE: ThreeModule, name: string, object: Object3D) {
  const n = name.toLowerCase();
  const mesh = object as import("three").Mesh;
  const geometry = mesh.geometry;
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  const size = new THREE.Vector3();
  box?.getSize(size);

  const shellLike =
    n.includes("shell") ||
    n.includes("case") ||
    n.includes("lid") ||
    n.includes("enclosure") ||
    n.includes("body") ||
    size.length() > 0.055;

  // Preserve the model's original inlay/logo geometry. We only recolor it.
  if (n === "o13" || n.includes("logo") || n.includes("text") || n.includes("mark") || n.includes("engrave")) {
    return new THREE.MeshStandardMaterial({
      color: 0x25282b,
      roughness: 0.74,
      metalness: 0.02,
      depthTest: true,
      depthWrite: true,
    });
  }

  if (shellLike && (n === "o11" || n === "o12" || n.includes("shell") || n.includes("case") || n.includes("lid") || n.includes("enclosure") || n.includes("body"))) {
    return new THREE.MeshPhysicalMaterial({
      color: 0xe7eeee,
      roughness: 0.62,
      metalness: 0.02,
      clearcoat: 0.16,
      clearcoatRoughness: 0.72,
      sheen: 0.18,
      sheenColor: new THREE.Color(0xb7ffff),
    });
  }

  if (n.includes("pcb") || n.includes("board")) {
    return new THREE.MeshStandardMaterial({ color: 0x063b35, roughness: 0.78, metalness: 0.03 });
  }

  if (n.includes("usb") || n.includes("connector") || n.includes("socket")) {
    return new THREE.MeshStandardMaterial({ color: 0xc8d3dc, roughness: 0.38, metalness: 0.62 });
  }

  if (n.includes("led")) {
    return new THREE.MeshStandardMaterial({
      color: 0xaaffd4,
      emissive: 0x40ffaa,
      emissiveIntensity: 2.5,
      roughness: 0.18,
    });
  }

  if (n.includes("sw") || n.includes("button")) {
    return new THREE.MeshStandardMaterial({ color: 0x252f3c, roughness: 0.76, metalness: 0.04 });
  }

  return new THREE.MeshStandardMaterial({ color: 0x7e8792, roughness: 0.62, metalness: 0.12 });
}

export function InteractiveDeviceModel({ locale }: InteractiveDeviceModelProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad3d, setShouldLoad3d] = useState(false);
  const [staticOnly, setStaticOnly] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!prefersStaticRender()) {
      setShouldLoad3d(true);
    }
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateStaticMode = () => {
      const nextStaticOnly = prefersStaticRender();
      setStaticOnly(nextStaticOnly);
      if (nextStaticOnly) {
        setShouldLoad3d(false);
      }
    };

    updateStaticMode();
    mediaQuery.addEventListener("change", updateStaticMode);

    if (!mediaQuery.matches) {
      let didRequest3d = false;
      const loadWhenNearViewport = () => {
        if (didRequest3d || prefersStaticRender()) return;
        const rect = shell.getBoundingClientRect();
        const margin = mobileCanLoad3d() ? 420 : 280;
        const nearViewport = rect.top < window.innerHeight + margin && rect.bottom > -margin;
        if (nearViewport) {
          didRequest3d = true;
          setShouldLoad3d(true);
          window.removeEventListener("scroll", loadWhenNearViewport);
          window.removeEventListener("resize", loadWhenNearViewport);
        }
      };

      window.addEventListener("scroll", loadWhenNearViewport, { passive: true });
      window.addEventListener("resize", loadWhenNearViewport);
      loadWhenNearViewport();

      return () => {
        mediaQuery.removeEventListener("change", updateStaticMode);
        window.removeEventListener("scroll", loadWhenNearViewport);
        window.removeEventListener("resize", loadWhenNearViewport);
      };
    }

    return () => mediaQuery.removeEventListener("change", updateStaticMode);
  }, []);

  useEffect(() => {
    if (!shouldLoad3d || staticOnly) return;

    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let animationFrame = 0;
    let resizeObserver: ResizeObserver | null = null;
    let cleanupThree: (() => void) | null = null;

    async function init() {
      try {
        const [THREE, { RoomEnvironment }, { GLTFLoader }, { OrbitControls }, { MeshoptDecoder }] = await Promise.all([
          import("three"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
          import("three/examples/jsm/loaders/GLTFLoader.js"),
          import("three/examples/jsm/controls/OrbitControls.js"),
          import("three/examples/jsm/libs/meshopt_decoder.module.js"),
        ]);

        if (disposed || !host) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(33, 1, 0.001, 10);
        camera.position.set(0.0, 0.018, 0.23);

        const renderer = new THREE.WebGLRenderer({ antialias: !mobileCanLoad3d(), alpha: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(getViewerPixelRatio());
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.82;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.className = "interactive-device-canvas";
        host.appendChild(renderer.domElement);

        const pmrem = new THREE.PMREMGenerator(renderer);
        const environment = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;
        scene.environment = environment;

        scene.add(new THREE.HemisphereLight(0xe1fdff, 0x152442, 1.1));

        const key = new THREE.DirectionalLight(0xf8fbff, 2.0);
        key.position.set(-0.1, -0.14, 0.18);
        key.castShadow = true;
        scene.add(key);

        const cyanRim = new THREE.DirectionalLight(0x2fb8ff, 4.3);
        cyanRim.position.set(0.13, 0.06, 0.08);
        scene.add(cyanRim);

        const magentaRim = new THREE.DirectionalLight(0x8f5cff, 1.9);
        magentaRim.position.set(-0.06, 0.12, 0.07);
        scene.add(magentaRim);

        const logoPop = new THREE.PointLight(0x4dffef, 1.1, 0.18);
        logoPop.position.set(0.02, -0.035, 0.032);
        scene.add(logoPop);

        const frontSoft = new THREE.PointLight(0xe8fbff, 0.5, 0.42);
        frontSoft.position.copy(camera.position);
        scene.add(frontSoft);

        const modelRoot = new THREE.Group();
        scene.add(modelRoot);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.minDistance = 0.12;
        controls.maxDistance = 0.42;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.75;
        controls.target.set(0, 0, 0.002);
        controls.update();

        const fit = () => {
          const rect = host.getBoundingClientRect();
          const width = Math.max(1, Math.floor(rect.width));
          const height = Math.max(1, Math.floor(rect.height));
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        };

        resizeObserver = new ResizeObserver(fit);
        resizeObserver.observe(host);
        fit();

        const loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        loader.load(
          OPTIMIZED_MODEL,
          (gltf) => {
            if (disposed) return;
            const model = gltf.scene;

            model.traverse((object) => {
              if (!(object instanceof THREE.Mesh)) return;
              object.castShadow = true;
              object.receiveShadow = true;
              object.material = materialForMesh(THREE, object.name, object);

              if (object.name === "o11" || object.name === "o12") {
                const edgeGeo = new THREE.EdgesGeometry(object.geometry, 32);
                const edgeMat = new THREE.LineBasicMaterial({
                  color: 0xdfe7e6,
                  transparent: true,
                  opacity: 0.26,
                  depthWrite: false,
                  blending: THREE.AdditiveBlending,
                });
                const edges = new THREE.LineSegments(edgeGeo, edgeMat);
                edges.renderOrder = 12;
                object.add(edges);
              }
            });

            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            model.position.sub(center);

            const scale = 0.055 / Math.max(size.x, size.y, size.z);
            model.scale.setScalar(scale);

            // Initial pose: text face is readable, then OrbitControls auto-rotates slowly.
            // Keep the model visually centered in the viewer window after fitting its bounds.
            model.rotation.set(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(-4), THREE.MathUtils.degToRad(270));
            model.position.x -= 0.014;
            model.position.y += 0.052;

            modelRoot.add(model);
            setLoaded(true);
          },
          undefined,
          (error) => {
            console.error("Failed to load SiriusCeption GLB", error);
            setFailed(true);
          }
        );

        const animate = () => {
          controls.update();
          renderer.render(scene, camera);
          animationFrame = window.requestAnimationFrame(animate);
        };
        animate();

        cleanupThree = () => {
          window.cancelAnimationFrame(animationFrame);
          resizeObserver?.disconnect();
          controls.dispose();
          environment.dispose();
          pmrem.dispose();
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              const materials = Array.isArray(object.material) ? object.material : [object.material];
              materials.forEach((material) => material.dispose());
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (error) {
        console.error("Failed to initialize SiriusCeption 3D viewer", error);
        setFailed(true);
      }
    }

    init();

    return () => {
      disposed = true;
      cleanupThree?.();
    };
  }, [shouldLoad3d, staticOnly]);

  return (
    <div
      className={`interactive-device-shell ${loaded ? "is-loaded" : ""} ${staticOnly ? "is-static" : ""}`}
      ref={shellRef}
    >
      <Image
        className="interactive-device-static"
        src={STATIC_RENDER}
        alt="SiriusCeption device"
        width={860}
        height={763}
        priority
        sizes="(max-width: 767px) 92vw, 620px"
      />
      <div className="interactive-device-stage" ref={hostRef} aria-label="Interactive SiriusCeption 3D product model" />
      {shouldLoad3d && !loaded && !failed ? (
        <div className="interactive-device-status">{locale === "en" ? "Loading 3D product…" : "正在加载 3D 产品…"}</div>
      ) : null}
      {failed ? (
        <Image
          className="interactive-device-fallback"
          src={STATIC_RENDER}
          alt="SiriusCeption device"
          width={860}
          height={763}
          sizes="620px"
        />
      ) : null}
      {!staticOnly && !failed ? (
        <div className="interactive-device-hint">{locale === "en" ? "Drag to rotate · Scroll to zoom" : "拖拽旋转 · 滚轮缩放"}</div>
      ) : null}
    </div>
  );
}
