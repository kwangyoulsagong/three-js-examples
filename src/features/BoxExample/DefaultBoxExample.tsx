import { useEffect, useRef } from "react";
import {
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

export const SingleBoxExample = () => {
  // Three.js canvas가 mount될 DOM 컨테이너
  const boxRenderContainerRef = useRef<HTMLDivElement>(null);

  // WebGLRenderer 인스턴스 (GPU 렌더링 담당)
  const rendererRef = useRef<WebGLRenderer | null>(null);

  // Three.js Scene (3D 객체들이 들어가는 공간)
  const sceneRef = useRef<Scene | null>(null);

  // 카메라 (Scene을 바라보는 시점)
  const cameraRef = useRef<PerspectiveCamera | null>(null);

  // 큐브 Mesh (Geometry + Material)
  const cubeRef = useRef<Mesh | null>(null);

  // 카메라 설정
  const fieldOfView = 75; // 시야각
  const near = 0.1; // 카메라 시작 거리
  const far = 5; // 카메라 최대 거리

  // Box 크기
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  // 조명 설정
  const lightColor = 0xffffff;
  const intensity = 3;

  /**
   * Three.js 초기화
   *
   * Scene / Camera / Renderer / Mesh 생성
   */
  useEffect(() => {
    if (!boxRenderContainerRef.current) return;

    const container = boxRenderContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    /**
     * Camera 생성
     * PerspectiveCamera = 원근 카메라
     */
    const camera = new PerspectiveCamera(
      fieldOfView,
      width / height,
      near,
      far,
    );
    camera.position.z = 2;
    cameraRef.current = camera;

    /**
     * Geometry (3D 형태)
     */
    const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

    /**
     * Material (표면 재질)
     * PhongMaterial = 빛 반사 지원
     */
    const material = new MeshPhongMaterial({ color: 0x44aa88 });

    /**
     * Directional Light
     * 태양광 같은 평행광
     */
    const light = new DirectionalLight(lightColor, intensity);
    light.position.set(-1, 2, 4);

    /**
     * Mesh = Geometry + Material
     */
    const cube = new Mesh(geometry, material);
    cubeRef.current = cube;

    /**
     * Scene 생성
     */
    const scene = new Scene();

    scene.add(cube);
    scene.add(light);

    sceneRef.current = scene;

    /**
     * Renderer 생성
     * WebGL을 이용하여 Scene을 화면에 렌더링
     */
    const renderer = new WebGLRenderer({ antialias: true });

    renderer.setSize(width, height);

    /**
     * Canvas를 DOM에 mount
     */
    container.appendChild(renderer.domElement);

    rendererRef.current = renderer;

    /**
     * cleanup
     */
    return () => {
      renderer.dispose();

      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
    };
  }, []);

  /**
   * 애니메이션 루프
   * requestAnimationFrame을 이용한 render loop
   */
  useEffect(() => {
    if (
      !boxRenderContainerRef.current ||
      !sceneRef.current ||
      !rendererRef.current ||
      !cameraRef.current ||
      !cubeRef.current
    )
      return;

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const container = boxRenderContainerRef.current;
    const cube = cubeRef.current;

    let rafId: number;

    const animate = (time: number = 1) => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      const canvas = renderer.domElement;

      // time을 초 단위로 변환
      time *= 0.001;

      /**
       * cube 회전 애니메이션
       */
      cube.rotation.x = time;
      cube.rotation.y = time;

      /**
       * container 사이즈가 바뀌었으면
       * renderer와 camera 비율 업데이트
       */
      if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height);

        camera.aspect = width / height;
      }

      /**
       * Scene을 Camera 시점에서 렌더링
       */
      renderer.render(scene, camera);

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(rafId);
  }, []);
  return (
    <div className="flex h-[500px] max-w-[800px] w-full flex-col rounded-xl bg-white shadow-google">
      {/* Three.js Canvas 영역 */}
      <div
        ref={boxRenderContainerRef}
        className="flex flex-1 items-center justify-center border-b border-light-200 overflow-hidden rounded-t-xl"
      />

      {/* 설명 */}
      <div className="p-4">
        <p className="text-14 text-neutral-50">
          기본 Box Geometry를 렌더링하는 Three.js 예제입니다.
        </p>
      </div>
    </div>
  );
};
