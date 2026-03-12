import { useEffect, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

export type MakeCubeInstanceType = {
  geometry: BoxGeometry;
  color: ColorRepresentation;
  x: number;
};

class ColorGUIHelper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any;
  prop: string;

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any,
    prop: string,
  ) {
    this.object = object;
    this.prop = prop;
  }

  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }

  set value(hex: string) {
    this.object[this.prop].set(hex);
  }
}

const sceneCode = `const scene = new Scene();
scene.add(light);`;

const cameraCode = `const camera = new PerspectiveCamera(
  75,
  width / height,
  0.1,
  5
);`;

const animateCode = `const animate = (time = 0) => {
time *= 0.001;

cube.rotation.x = time;
cube.rotation.y = time;

renderer.render(scene, camera);

requestAnimationFrame(animate);
};`;

const fullCode = `// full demo code here (example)
export const CheckingRerenderGuiHelperBoxExample = () => {
  const boxRenderContainerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cubesRef = useRef<Mesh[]>([]);
  const guiRef = useRef<GUI | null>(null);

  const [open, setOpen] = useState(false);

  const fieldOfView = 75;
  const near = 0.1;
  const far = 5;

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  const lightColor = 0xffffff;
  const intensity = 3;

  let renderRequested = false;

  const requestRenderIfNotRequested = () => {
    if (!renderRequested) {
      renderRequested = true;

      requestAnimationFrame(() => {
        renderRequested = false;

        const renderer = rendererRef.current!;
        const scene = sceneRef.current!;
        const camera = cameraRef.current!;
        const controls = controlsRef.current!;

        resizeRendererToDisplaySize();
        controls.update();
        renderer.render(scene, camera);
      });
    }
  };

  const initContainer = () => {
    if (!boxRenderContainerRef.current) return;
    const container = boxRenderContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    return { width, height, container };
  };

  const initCamera = ({ width, height }: { width: number; height: number }) => {
    const camera = new PerspectiveCamera(
      fieldOfView,
      width / height,
      near,
      far,
    );

    camera.position.z = 2;
    cameraRef.current = camera;
  };

  const initScene = (light: DirectionalLight) => {
    const scene = new Scene();
    scene.add(light);
    sceneRef.current = scene;
  };

  const makeCubeInstance = ({ geometry, color, x }: MakeCubeInstanceType) => {
    const scene = sceneRef.current!;
    const gui = guiRef.current!;

    const material = new MeshPhongMaterial({ color });

    const cube = new Mesh(geometry, material);

    cube.position.x = x;

    const folder = gui.addFolder('Cube ' + x);

    folder
      .addColor(new ColorGUIHelper(material, "color"), "value")
      .name("color")
      .onChange(requestRenderIfNotRequested);

    folder
      .add(cube.scale, "x", 0.1, 1.5)
      .name("scaleX")
      .onChange(requestRenderIfNotRequested);

    folder.open();

    scene.add(cube);

    return cube;
  };

  useEffect(() => {
    const gui = new GUI();
    guiRef.current = gui;

    return () => gui.destroy();
  }, []);

  const initRenderer = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    rendererRef.current = renderer;

    return renderer;
  };

  const initControls = () => {
    if (!cameraRef.current || !rendererRef.current) return;
    const camera = cameraRef.current;
    const canvas = rendererRef.current.domElement;

    const controls = new OrbitControls(camera, canvas);
    controls.update();
    controls.enableDamping = true;

    controls.addEventListener("change", requestRenderIfNotRequested);

    controlsRef.current = controls;
  };

  const resizeRendererToDisplaySize = () => {
    if (
      !boxRenderContainerRef.current ||
      !cameraRef.current ||
      !rendererRef.current
    )
      return;

    const container = boxRenderContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const renderer = rendererRef.current;
    const canvas = renderer.domElement;
    const camera = cameraRef.current;

    const needSize = canvas.width !== width || canvas.height !== height;

    if (needSize) {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  };
  useEffect(() => {
    const containerValue = initContainer();
    if (!containerValue) return;
    const { width, height, container } = containerValue;

    initCamera({ width, height });

    const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

    const light = new DirectionalLight(lightColor, intensity);
    light.position.set(-1, 2, 4);

    initScene(light);
    const cubes = [
      makeCubeInstance({ geometry, color: 0x44aa88, x: 0 }),
      makeCubeInstance({ geometry, color: 0x8844aa, x: -2 }),
      makeCubeInstance({ geometry, color: 0xaa8844, x: 2 }),
    ];

    cubesRef.current = cubes;

    const renderer = initRenderer({ width, height });
    if (!renderer) return;
    initControls();
    container.appendChild(renderer.domElement);

    return () => {
      cubes.forEach((cube) => {
        cube?.geometry.dispose();
        (cube?.material as MeshPhongMaterial).dispose();
      });
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

    let rafId: number;

    const animate = (time: number = 0) => {
      time *= 0.001;

      cubesRef.current.forEach((cube, idx) => {
        const speed = 1 + idx * 0.1;
        const rotate = time * speed;

        cube.rotation.x = rotate;
        cube.rotation.y = rotate;
      });

      resizeRendererToDisplaySize();
      controls.update();
      renderer.render(scene, camera);

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(rafId);
  }, []);
  return (
    <div className="flex h-[600px] max-w-[1200px] w-full bg-white rounded-xl overflow-hidden shadow-google">
      <div className="flex-1 border-r border-neutral-200">
        <div ref={boxRenderContainerRef} className="h-full w-full" />
      </div>

      {/* 설명 */}
      <div className="w-[420px]">
        <Explanation onOpen={() => setOpen(true)} />
      </div>

      <CodeModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
`;

/* ------------------------------ Code Block ------------------------------ */

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <div className="rounded-md overflow-hidden border border-neutral-200 mt-3">
      <SyntaxHighlighter
        language="tsx"
        style={vscDarkPlus}
        customStyle={{ margin: 0, fontSize: 13 }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

/* ------------------------------ Modal ------------------------------ */

const CodeModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[900px] max-h-[80vh] bg-white rounded-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold">전체 코드</h2>
          <button onClick={onClose}>닫기</button>
        </div>

        <div className="overflow-auto">
          <SyntaxHighlighter
            language="tsx"
            style={vscDarkPlus}
            customStyle={{ margin: 0 }}
          >
            {fullCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Explanation ------------------------------ */

const Explanation = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="relative h-full overflow-y-auto p-6 space-y-8 text-[14px]">
      <section>
        <h3 className="font-bold text-[16px] mb-2">Scene</h3>
        <p>Three.js에서 Scene은 모든 3D 객체가 배치되는 공간입니다.</p>
        <CodeBlock code={sceneCode} />
      </section>

      <section>
        <h3 className="font-bold text-[16px] mb-2">Camera</h3>
        <p>PerspectiveCamera는 원근감을 가지는 카메라입니다.</p>
        <CodeBlock code={cameraCode} />
      </section>

      <section>
        <h3 className="font-bold text-[16px] mb-2">Animation Loop</h3>
        <p>requestAnimationFrame을 사용해 매 프레임 렌더링합니다.</p>
        <CodeBlock code={animateCode} />
      </section>

      {/* floating button */}

      <button
        onClick={onOpen}
        className="fixed bottom-8 right-8 bg-black text-white px-4 py-2 rounded-lg shadow-lg"
      >
        전체 코드 보기
      </button>
    </div>
  );
};

export const CheckingRerenderGuiHelperBoxExample = () => {
  const boxRenderContainerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cubesRef = useRef<Mesh[]>([]);
  const guiRef = useRef<GUI | null>(null);

  const [open, setOpen] = useState(false);

  const fieldOfView = 75;
  const near = 0.1;
  const far = 5;

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  const lightColor = 0xffffff;
  const intensity = 3;

  let renderRequested = false;

  const requestRenderIfNotRequested = () => {
    if (!renderRequested) {
      renderRequested = true;

      requestAnimationFrame(() => {
        renderRequested = false;

        const renderer = rendererRef.current!;
        const scene = sceneRef.current!;
        const camera = cameraRef.current!;
        const controls = controlsRef.current!;

        resizeRendererToDisplaySize();
        controls.update();
        renderer.render(scene, camera);
      });
    }
  };

  const initContainer = () => {
    if (!boxRenderContainerRef.current) return;
    const container = boxRenderContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    return { width, height, container };
  };

  const initCamera = ({ width, height }: { width: number; height: number }) => {
    const camera = new PerspectiveCamera(
      fieldOfView,
      width / height,
      near,
      far,
    );

    camera.position.z = 2;
    cameraRef.current = camera;
  };

  const initScene = (light: DirectionalLight) => {
    const scene = new Scene();
    scene.add(light);
    sceneRef.current = scene;
  };

  const makeCubeInstance = ({ geometry, color, x }: MakeCubeInstanceType) => {
    const scene = sceneRef.current!;
    const gui = guiRef.current!;

    const material = new MeshPhongMaterial({ color });

    const cube = new Mesh(geometry, material);

    cube.position.x = x;

    const folder = gui.addFolder(`Cube ${x}`);

    folder
      .addColor(new ColorGUIHelper(material, "color"), "value")
      .name("color")
      .onChange(requestRenderIfNotRequested);

    folder
      .add(cube.scale, "x", 0.1, 1.5)
      .name("scaleX")
      .onChange(requestRenderIfNotRequested);

    folder.open();

    scene.add(cube);

    return cube;
  };

  useEffect(() => {
    const gui = new GUI();
    guiRef.current = gui;

    return () => gui.destroy();
  }, []);

  const initRenderer = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    rendererRef.current = renderer;

    return renderer;
  };

  const initControls = () => {
    if (!cameraRef.current || !rendererRef.current) return;
    const camera = cameraRef.current;
    const canvas = rendererRef.current.domElement;

    const controls = new OrbitControls(camera, canvas);
    controls.update();
    controls.enableDamping = true;

    controls.addEventListener("change", requestRenderIfNotRequested);

    controlsRef.current = controls;
  };

  const resizeRendererToDisplaySize = () => {
    if (
      !boxRenderContainerRef.current ||
      !cameraRef.current ||
      !rendererRef.current
    )
      return;

    const container = boxRenderContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const renderer = rendererRef.current;
    const canvas = renderer.domElement;
    const camera = cameraRef.current;

    const needSize = canvas.width !== width || canvas.height !== height;

    if (needSize) {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  };
  useEffect(() => {
    const containerValue = initContainer();
    if (!containerValue) return;
    const { width, height, container } = containerValue;

    initCamera({ width, height });

    const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

    const light = new DirectionalLight(lightColor, intensity);
    light.position.set(-1, 2, 4);

    initScene(light);
    const cubes = [
      makeCubeInstance({ geometry, color: 0x44aa88, x: 0 }),
      makeCubeInstance({ geometry, color: 0x8844aa, x: -2 }),
      makeCubeInstance({ geometry, color: 0xaa8844, x: 2 }),
    ];

    cubesRef.current = cubes;

    const renderer = initRenderer({ width, height });
    if (!renderer) return;
    initControls();
    container.appendChild(renderer.domElement);

    return () => {
      cubes.forEach((cube) => {
        cube?.geometry.dispose();
        (cube?.material as MeshPhongMaterial).dispose();
      });
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

    let rafId: number;

    const animate = (time: number = 0) => {
      time *= 0.001;

      cubesRef.current.forEach((cube, idx) => {
        const speed = 1 + idx * 0.1;
        const rotate = time * speed;

        cube.rotation.x = rotate;
        cube.rotation.y = rotate;
      });

      resizeRendererToDisplaySize();
      controls.update();
      renderer.render(scene, camera);

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(rafId);
  }, []);
  return (
    <div className="flex h-[600px] max-w-[1200px] w-full bg-white rounded-xl overflow-hidden shadow-google">
      <div className="flex-1 border-r border-neutral-200">
        <div ref={boxRenderContainerRef} className="h-full w-full" />
      </div>

      {/* 설명 */}
      <div className="w-[420px]">
        <Explanation onOpen={() => setOpen(true)} />
      </div>

      <CodeModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
