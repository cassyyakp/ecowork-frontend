import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ShowUtilisateur() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUtilisateur = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/utilisateurs/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = await response.json();
        setUtilisateur(data.data || data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUtilisateur();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Chargement...</p>;
  if (!utilisateur)
    return (
      <p className="text-center mt-10 text-gray-400">Utilisateur introuvable</p>
    );

  return (
    <>
      <h1 className="text-font text-center mt-2 text-3xl">
        DÉTAIL UTILISATEUR
      </h1>
      <div className="max-w-lg mx-auto px-4 lg:px-0 py-6">
        <div className="bg-[#EFF7F6] p-6 lg:p-10 rounded-2xl border border-[#B2F7EF]">
          <div className="flex justify-between border-b border-default pb-3">
            <span className="font-medium text-gray-500">Nom</span>
            <span>{utilisateur.nom}</span>
          </div>
          <div className="flex justify-between border-b border-default pb-3">
            <span className="font-medium text-gray-500">Prénoms</span>
            <span>{utilisateur.prenoms}</span>
          </div>
          <div className="flex justify-between border-b border-default pb-3">
            <span className="font-medium text-gray-500">Email</span>
            <span>{utilisateur.email}</span>
          </div>
          <div className="flex justify-between border-b border-default pb-3">
            <span className="font-medium text-gray-500">Type de compte</span>
            <span
              style={{
                backgroundColor:
                  utilisateur.id_type_compte === 1 ? "#7BDFF2" : "#F7D6E0",
                color: "#3a3a3a",
              }}
              className="px-3 py-1 rounded-full text-xs font-medium"
            >
              {utilisateur.id_type_compte === 1 ? "Admin" : "Utilisateur"}
            </span>
          </div>
          <div className="flex justify-between border-b border-default pb-3">
            <span className="font-medium text-gray-500">Téléphone</span>
            <span>{utilisateur.telephone}</span>
          </div>
          <div className="flex justify-between border-b border-default pb-3">
            <span className="font-medium text-gray-500">Adresse</span>
            <span>{utilisateur.adresse}</span>
          </div>
          <div className="flex justify-between border-b border-default pb-3">
            <span className="font-medium text-gray-500">Créé le</span>
            <span>{utilisateur.created_at}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Modifié le</span>
            <span>{utilisateur.updated_at}</span>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate(`/admin/utilisateurs/${id}/edit`)}
              style={{ backgroundColor: "#7BDFF2", color: "#3a3a3a" }}
              className="flex-1 py-2 rounded-xl font-medium text-sm"
            >
              Modifier
            </button>
            <button
              onClick={() => navigate("/admin/utilisateurs")}
              style={{ backgroundColor: "#EFF7F6", borderColor: "#B2F7EF" }}
              className="flex-1 py-2 rounded-xl font-medium text-sm border-2"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowUtilisateur;
