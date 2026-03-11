import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-light-300">
      {/* title */}
      <h1 className="mb-12 text-32 font-bold text-primary-000">
        Three.js Examples
      </h1>

      {/* menu cards */}
      <div className="flex gap-6">
        <Link to="/box-example">
          <div className="flex h-[140px] w-[200px] cursor-pointer flex-col items-center justify-center rounded-xl bg-white shadow-google transition-all duration-200 hover:scale-102 hover:shadow-lg">
            <span className="text-20 font-semibold text-primary-000">
              Box Example
            </span>
            <span className="mt-2 text-14 text-neutral-100">
              기본 박스 렌더링
            </span>
          </div>
        </Link>

        <Link to="/box-example">
          <div className="flex h-[140px] w-[200px] cursor-pointer flex-col items-center justify-center rounded-xl bg-white shadow-google transition-all duration-200 hover:scale-102 hover:shadow-lg">
            <span className="text-20 font-semibold text-primary-000">
              More Example
            </span>
            <span className="mt-2 text-14 text-neutral-100">
              추가 예제 보기
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
