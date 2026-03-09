import { Outlet } from "react-router-dom";
import Header from "./header/header";

function UtilisateurLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="px-1 py-1">
        <Outlet />
      </main>
    </div>
  );
}

export default UtilisateurLayout;
