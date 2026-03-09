import { Outlet } from "react-router-dom";
import Header from "./header/header";

function UtilisateurLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default UtilisateurLayout;
