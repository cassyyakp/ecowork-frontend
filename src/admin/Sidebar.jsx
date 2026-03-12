import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Utilisateurs", path: "/admin/utilisateurs" },
  { label: "Espaces", path: "/admin/espaces" },
  { label: "Équipements", path: "/admin/equipements" },
  { label: "Réservations", path: "/admin/reservations" },
  { label: "Factures", path: "/admin/factures" },
];

function Sidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-[#EFF7F6] px-4 py-6 shadow-md">

      {/* Logo + bouton fermer sur mobile */}
      <div className="flex items-center justify-between py-6 border-b border-[#B2F7EF]">
        <img
          src="/images/logo-ecowork.png"
          alt="logo-ecowork"
          className="w-28 object-contain"
        />
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg hover:bg-[#B2F7EF] text-gray-400"
        >
          ✕
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 flex-1 py-6">
        {navLinks.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-[#7BDFF2] text-white"
                  : "text-[#3a3a3a] hover:bg-[#B2F7EF]"
                }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Déconnexion */}
      <div className="flex justify-center py-6 border-t border-[#B2F7EF]">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-3 rounded-xl text-sm font-medium border bg-[#F7D6E0] text-black hover:bg-[#7BDFF2] transition-all duration-200"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default Sidebar;