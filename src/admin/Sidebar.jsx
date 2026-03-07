import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Utilisateurs", path: "/admin/utilisateurs" },
  { label: "Salles", path: "/admin/salles" },
  { label: "Équipements", path: "/admin/equipements" },
  { label: "Réservations", path: "/admin/reservations" },
  { label: "Factures", path: "/admin/factures" },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-[#EFF7F6] px-4 py-6 shadow-md">
      {/* Logo */}
      <div className="flex items-center justify-center mb-10">
        <img
          src="/images/logo-ecowork.png"
          alt="logo-ecowork"
          className="w-28 object-contain"
        />
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 flex-1 mt-24">
        {navLinks.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  isActive
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
      <div className="flex justify-center">
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
