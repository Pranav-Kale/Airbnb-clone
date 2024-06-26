import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className=" flex flex-col min-h-screen h-screen">
      <Header />
      <div className="mt-20 flex-grow bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
