import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { useLowCarbon } from "../context/LowcarbonContext";

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
  const { logout } = useAuth();
  const { lowCarbon, toggle } = useLowCarbon();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`flex flex-col min-h-screen h-screen overflow-y-auto w-64 px-4 py-6 shadow-md ${lowCarbon ? "bg-gray-100" : "bg-[#EFF7F6]"}`}
    >
      <div
        className={`flex items-center justify-between py-6 border-b ${lowCarbon ? "border-gray-300" : "border-[#B2F7EF]"}`}
      >
        <img
          src="/images/logo-ecowork.png"
          alt="logo-ecowork"
          className="w-28 object-contain"
        />
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg hover:bg-gray-200 text-gray-400"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col gap-2 flex-1 py-6">
        {navLinks.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? lowCarbon
                      ? "bg-gray-400 text-white"
                      : "bg-[#7BDFF2] text-white"
                    : lowCarbon
                      ? "text-gray-600 hover:bg-gray-200"
                      : "text-[#3a3a3a] hover:bg-[#B2F7EF]"
                }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div
        className={`py-4 border-t ${lowCarbon ? "border-gray-300" : "border-[#B2F7EF]"}`}
      >
        <button
          onClick={toggle}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            lowCarbon
              ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
              : "bg-[#EFF7F6] text-[#3a3a3a] hover:bg-[#B2F7EF] border border-[#B2F7EF]"
          }`}
        >
          <img
            src="/images/low-carbon.webp"
            alt="low carbon"
            className="w-4 h-4 object-contain"
          />
          {lowCarbon ? "Mode normal" : "Mode low carbon"}
        </button>
      </div>

      <div
        className={`flex justify-center py-6 border-t ${lowCarbon ? "border-gray-300" : "border-[#B2F7EF]"}`}
      >
        <button
          onClick={handleLogout}
          className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
            lowCarbon
              ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
              : "bg-[#F7D6E0] text-black hover:bg-[#7BDFF2]"
          }`}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
