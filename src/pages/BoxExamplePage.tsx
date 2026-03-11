import { useEffect, useRef } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three/src/Three.js";

const BoxExamplePage = () => {
  // Three.js canvas를 mount할 DOM 컨테이너
  const boxRenderContainerRef = useRef<HTMLDivElement>(null);

  // Three.js renderer 인스턴스 저장 (WebGL context 관리)
  const rendererRef = useRef<WebGLRenderer | null>(null);

  const sceneRef = useRef<Scene | null>(null);

  // Three.js scene을 렌더링할 시점을 결정하는 PerspectiveCamera(원근 카메라)
  const cameraRef = useRef<PerspectiveCamera | null>(null);

  // 시야각 수직면 75도
  const fieldOfView = 75;
  // canvas 가로 세로 비율

  // 카메라 앞에 공간 범위를 지정하는 요소
  const near = 0.1;
  const far = 5;

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  useEffect(() => {
    if (!boxRenderContainerRef.current) return;
    const container = boxRenderContainerRef.current;
    const width = container.clientWidth - 10;
    const height = container.clientHeight - 10;

    const camera = new PerspectiveCamera(
      fieldOfView,
      width / height,
      near,
      far,
    );
    camera.position.z = 2;
    cameraRef.current = camera;

    // 정육면체
    const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new MeshBasicMaterial({ color: 0x44aa88 });

    const cube = new Mesh(geometry, material);

    const scene = new Scene();
    scene.add(cube);
    sceneRef.current = scene;
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    return () => {
      renderer.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (
      !boxRenderContainerRef.current ||
      !sceneRef.current ||
      !rendererRef.current ||
      !cameraRef.current
    )
      return;

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const container = boxRenderContainerRef.current;

    let rafId: number;

    const animate = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height, false);

      camera.aspect = width / height;

      renderer.render(scene, camera);

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="flex min-h-screen flex-col bg-light-300">
      {/* header */}
      <header className="flex items-center justify-between border-b border-light-200 bg-white px-8 py-4 shadow-sm">
        <h1 className="text-20 font-semibold text-primary-000">
          📦 Box Example
        </h1>

        <span className="text-14 text-neutral-100">
          Three.js Basic Geometry
        </span>
      </header>

      {/* content */}
      <main className="flex flex-1 items-center justify-center p-10">
        <div className="flex h-[500px] max-w-[800px] w-full flex-col rounded-xl bg-white shadow-google">
          {/* canvas area */}
          <div
            ref={boxRenderContainerRef}
            className="flex flex-1 items-center justify-center border-b border-light-200"
          />

          {/* description */}
          <div className="p-4">
            <p className="text-14 text-neutral-50">
              기본 Box Geometry를 렌더링하는 Three.js 예제입니다.
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default BoxExamplePage;
