import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <section className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </section>
  );
};

export default Layout;
