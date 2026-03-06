// src/Layout/MainLayout.jsx
import Footer from "./footer";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <main className="flex-1 p-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;