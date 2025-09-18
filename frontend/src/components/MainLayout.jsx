// frontend/src/components/MainLayout.jsx

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-8 bg-gray-100 h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
