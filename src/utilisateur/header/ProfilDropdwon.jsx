import { useNavigate } from "react-router-dom";

function ProfilDropdown({ onClose }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#B2F7EF] rounded-2xl shadow-lg overflow-hidden z-50">
      
      <div className="px-4 py-3 border-b border-[#B2F7EF]">
        <p className="text-sm font-semibold text-[#3a3a3a]">{user?.nom} {user?.prenoms}</p>
        <p className="text-xs text-gray-400">{user?.email}</p>
      </div>

      <button
        onClick={() => { navigate("/profil"); onClose(); }}
        className="w-full text-left px-4 py-3 text-sm text-[#3a3a3a] hover:bg-[#EFF7F6] transition-all"
      >
        Mon profil
      </button>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-50 transition-all"
      >
        Déconnexion
      </button>

    </div>
  );
}

export default  ProfilDropdown;