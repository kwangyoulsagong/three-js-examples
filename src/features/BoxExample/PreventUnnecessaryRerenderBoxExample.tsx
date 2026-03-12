import { useEffect, useRef } from "react";
import {
  BoxGeometry,
  ColorRepresentation,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type MakeCubeInstanceType = {
  geometry: BoxGeometry;
  color: ColorRepresentation;
  x: number;
};

export const PreventUnnecessaryRerenderBoxExample = () => {
  const boxRenderContainerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);

  const fieldOfView = 75;
  const near = 0.1;
  const far = 5;

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  const lightColor = 0xffffff;
  const intensity = 3;

  const makeCubeInstance = ({ geometry, color, x }: MakeCubeInstanceType) => {
    const scene = sceneRef.current!;
    const material = new MeshPhongMaterial({ color });

    const cube = new Mesh(geometry, material);

    cube.position.x = x;

    scene.add(cube);

    return cube;
  };

  const resizeRendererToDisplaySize = () => {
    if (
      !boxRenderContainerRef.current ||
      !rendererRef.current ||
      !cameraRef.current
    )
      return;
    const container = boxRenderContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const renderer = rendererRef.current;
    const canvas = renderer.domElement;
    const camera = cameraRef.current;

    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  };

  useEffect(() => {
    if (!boxRenderContainerRef.current) return;
    const container = boxRenderContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new PerspectiveCamera(
      fieldOfView,
      width / height,
      near,
      far,
    );
    camera.position.z = 2;
    cameraRef.current = camera;

    const renderer = new WebGLRenderer({ antialias: true });
    const canvas = renderer.domElement;

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();
    controls.enableDamping = true;
    controlsRef.current = controls;

    const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

    const light = new DirectionalLight(lightColor, intensity);
    light.position.set(-1, 2, 4);

    const scene = new Scene();
    scene.add(light);
    sceneRef.current = scene;

    makeCubeInstance({ geometry, color: 0x44aa88, x: 0 });
    makeCubeInstance({ geometry, color: 0x8844aa, x: -2 });
    makeCubeInstance({ geometry, color: 0xaa8844, x: 2 });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

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
      !rendererRef.current ||
      !sceneRef.current ||
      !cameraRef.current ||
      !controlsRef.current
    )
      return;

    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    let renderRequest = false;

    const animate = () => {
      renderRequest = false;
      resizeRendererToDisplaySize();

      controls.update();
      renderer.render(scene, camera);
    };

    let rafId: number;
    const requestRenderIfNotRequested = () => {
      if (!renderRequest) {
        renderRequest = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    controls.addEventListener("change", requestRenderIfNotRequested);
    window.addEventListener("resize", requestRenderIfNotRequested);

    animate();

    return () => {
      controls.removeEventListener("change", requestRenderIfNotRequested);
      window.removeEventListener("resize", requestRenderIfNotRequested);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="flex h-[500px] max-w-[800px] w-full flex-col rounded-xl bg-white shadow-google">
      <div
        ref={boxRenderContainerRef}
        className="flex flex-1 items-center justify-center border-b border-light-200 overflow-hidden rounded-t-xl"
      />

      {/* 설명 */}
      <div className="p-4">
        <p className="text-14 text-neutral-50">
          불필요한 렌더링을 방지하는 Three.js 예제입니다.
        </p>
      </div>
    </div>
  );
};
