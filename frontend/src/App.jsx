import router from "./routes/route";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
