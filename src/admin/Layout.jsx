import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-30 lg:static lg:block transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header mobile */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#EFF7F6] border-b border-[#B2F7EF]">
          <img
            src="/images/logo-ecowork.png"
            alt="logo"
            className="h-8 object-contain"
          />
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-white border border-[#B2F7EF]"
          >
            ☰
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-white">
          <Outlet />
        </main>
      </div>
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
