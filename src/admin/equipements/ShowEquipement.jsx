import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ShowEquipement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipement, setEquipement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipement = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/equipements/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = await response.json();
        setEquipement(data.data || data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipement();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Chargement...</p>;
  if (!equipement)
    return (
      <p className="text-center mt-10 text-gray-400">Équipement introuvable</p>
    );

  return (
    <div className="px-4 lg:px-0">
      <h1 className="text-2xl lg:text-3xl text-font text-center mt-2">
        DÉTAIL ÉQUIPEMENT
      </h1>
      <div className="max-w-lg mx-auto mt-10 bg-[#EFF7F6] border border-[#B2F7EF] rounded-2xl p-6 space-y-4">
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="font-medium text-gray-500 text-sm">Nom</span>
          <span className="text-sm">{equipement.nom}</span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="font-medium text-gray-500 text-sm">Nombre</span>
          <span className="text-sm">{equipement.nombre}</span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="font-medium text-gray-500 text-sm">Espace</span>
          <span className="text-sm">{equipement.espace?.nom || "-"}</span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="font-medium text-gray-500 text-sm">Créé le</span>
          <span className="text-sm">{equipement.created_at}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500 text-sm">Modifié le</span>
          <span className="text-sm">{equipement.updated_at}</span>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate(`/admin/equipements/${id}/edit`)}
            className="flex-1 py-2 rounded-xl font-medium text-sm bg-[#7BDFF2] text-white"
          >
            Modifier
          </button>
          <button
            onClick={() => navigate("/admin/equipements")}
            className="flex-1 py-2 rounded-xl font-medium text-sm border-2 border-[#B2F7EF]"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowEquipement;
