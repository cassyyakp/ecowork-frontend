import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EspaceShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [espace, setEspace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEspace = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/espaces/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );
        const data = await response.json();
        setEspace(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEspace();
  }, [id]);

  if (loading) return <p className="text-sm text-gray-400">Chargement...</p>;
  if (!espace)
    return <p className="text-sm text-gray-400">Espace introuvable.</p>;

  return (
    <div className="max-w-lg mx-auto px-4 lg:px-0">
      <div className="bg-[#EFF7F6] p-6 lg:p-10 rounded-2xl shadow-sm border border-[#B2F7EF]">
        {espace.photo_salle ? (
          <img
            src={espace.photo_salle}
            alt={espace.nom}
            className="w-full h-48 lg:h-56 object-cover rounded-2xl mb-6"
          />
        ) : (
          <div className="w-full h-48 lg:h-56 bg-[#B2F7EF] rounded-2xl mb-6 flex items-center justify-center text-gray-400 text-sm">
            Aucune photo
          </div>
        )}
        <h2 className="text-lg lg:text-xl font-bold text-[#3a3a3a] mb-6">
          {espace.nom}
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Surface</span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {espace.surface} m²
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Prix réservation</span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {espace.prix_journalier} €
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">
              Frais réservation (15%)
            </span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {(espace.prix_journalier * 0.15).toFixed(2)} €
            </span>
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => navigate("/admin/espaces")}
            className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
          >
            Retour
          </button>
          <button
            onClick={() =>
              navigate(`/admin/espaces/update/${espace.id_espace}`)
            }
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}

export default EspaceShow;
