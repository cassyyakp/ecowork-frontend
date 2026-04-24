import { useNavigate } from "react-router-dom";

function ProfilDropdown({ onClose }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const estConnecte = localStorage.getItem("token");


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onClose();
    navigate("/AuthPage");
  };

  const handleProfil = () => {
    if (estConnecte) {
      navigate("/profil");
    } else {
      navigate("/AuthPage");
    }
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#B2F7EF] rounded-2xl shadow-lg overflow-hidden z-50">

      {estConnecte && user && (
        <div className="px-4 py-3 border-b border-[#B2F7EF]">
          <p className="text-sm font-semibold text-[#3a3a3a]">
            {user?.nom}
          </p>
          <p className="text-sm font-semibold text-[#3a3a3a]">
            {user?.prenom}
          </p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
      )}

      <button
        onClick={handleProfil}
        className="w-full text-left px-4 py-3 text-sm text-[#3a3a3a] hover:bg-[#EFF7F6] transition-all"
      >
        {estConnecte ? "Mon profil" : "Se connecter"}
      </button>

      {/* Déconnexion seulement si connecté */}
      {estConnecte && (
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-50 transition-all"
        >
          Déconnexion
        </button>
      )}


    </div>
  );
}

export default ProfilDropdown;