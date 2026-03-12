import { CheckingRerenderGuiHelperBoxExample } from "../features/BoxExample/CheckingRerenderGuiHelperBoxExample";
import { SingleBoxExample } from "../features/BoxExample/DefaultBoxExample";
import { MultiBoxExample } from "../features/BoxExample/MultiBoxExample";
import { PreventUnnecessaryRerenderBoxExample } from "../features/BoxExample/PreventUnnecessaryRerenderBoxExample";

const BoxExamplePage = () => {
  return (
    <section className="flex min-h-screen flex-col bg-light-300">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-light-200 bg-white px-8 py-4 shadow-sm">
        <h1 className="text-20 font-semibold text-primary-000">
          📦 Box Example
        </h1>

        <span className="text-14 text-neutral-100">
          Three.js Basic Geometry
        </span>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col items-center justify-center p-10 gap-4">
        <SingleBoxExample />
        <MultiBoxExample />
        <PreventUnnecessaryRerenderBoxExample />
        <CheckingRerenderGuiHelperBoxExample />
      </main>
    </section>
  );
};

export default BoxExamplePage;
