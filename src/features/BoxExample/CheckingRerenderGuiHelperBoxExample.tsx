import { useRef } from "react";

export const CheckingRerenderGuiHelperBoxExample = () => {
  const boxRenderContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex h-[500px] max-w-[800px] w-full flex-col rounded-xl bg-white shadow-google">
      <div
        ref={boxRenderContainerRef}
        className="flex flex-1 items-center justify-center border-b border-light-200 overflow-hidden rounded-t-xl"
      />

      {/* 설명 */}
      <div className="p-4">
        <p className="text-14 text-neutral-50">
          불필요한 렌더링을 확인하기 위한 <strong>guiHelper</strong> Three.js
          예제입니다.
        </p>
      </div>
    </div>
  );
};
