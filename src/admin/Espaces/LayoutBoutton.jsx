import { useNavigate } from "react-router-dom";

function LayoutBoutton({ onSearch }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Rechercher un espace..."
        className="w-full sm:max-w-sm border-2 border-[#B2F7EF] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-400 bg-white"
      />
      <button
        onClick={() => navigate("/admin/espaces/ajout")}
        className="w-full sm:w-auto bg-[#7BDFF2] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-cyan-400 transition-all whitespace-nowrap"
      >
        + Ajouter un espace
      </button>
    </div>
  );
}

export default LayoutBoutton