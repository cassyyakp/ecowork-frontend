import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./Footer";

function UtilisateurLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="px-1 py-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default UtilisateurLayout;
