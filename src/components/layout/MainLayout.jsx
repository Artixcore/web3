import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
