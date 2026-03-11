import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "./routes/AppRoutes";

function App() {
  const router = createBrowserRouter(appRoutes);
  return <RouterProvider router={router} />;
}

export default App;
