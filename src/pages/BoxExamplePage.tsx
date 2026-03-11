const BoxExamplePage = () => {
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
        <div className="flex h-[500px] w-[800px] flex-col rounded-xl bg-white shadow-google">
          {/* canvas area */}
          <div className="flex flex-1 items-center justify-center border-b border-light-200">
            <span className="text-neutral-100">Three.js Canvas Area</span>
          </div>

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
