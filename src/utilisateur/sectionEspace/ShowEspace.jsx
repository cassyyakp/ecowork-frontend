import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ShowEspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [espace, setEspace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEspace = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/espaces/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
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

  if (loading) return <p className="text-sm text-gray-400 text-center mt-20">Chargement...</p>;
  if (!espace) return <p className="text-sm text-gray-400 text-center mt-20">Espace introuvable.</p>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">

  
      {espace.photo_salle ? (
        <img
          src={espace.photo_salle}
          alt={espace.nom}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />
      ) : (
        <div className="w-full h-64 bg-[#B2F7EF] rounded-2xl mb-6 flex items-center justify-center text-gray-400">
          Aucune photo
        </div>
      )}


      <h1 className="text-2xl font-bold text-[#3a3a3a] mb-2">{espace.nom}</h1>
      <p className="text-sm text-gray-400 mb-6">{espace.surface} m²</p>


      <div className="flex flex-col gap-4 bg-[#EFF7F6] rounded-2xl p-6 border border-[#B2F7EF] mb-6">
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">Prix / jour</span>
          <span className="text-sm font-semibold text-[#7BDFF2]">
            {parseFloat(espace.prix_reservation).toLocaleString()} €
          </span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">Frais de réservation</span>
          <span className="text-sm font-medium text-[#3a3a3a]">
            {parseFloat(espace.frais_reservation).toLocaleString()} €
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">Surface</span>
          <span className="text-sm font-medium text-[#3a3a3a]">{espace.surface} m²</span>
        </div>
      </div>


      <div className="flex gap-3">
        <button
          onClick={() => navigate("/espaces")}
          className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
        >
          Retour
        </button>
        <button
          onClick={() => navigate(`/reservations/create/${espace.id_espace}`)}
          className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
        >
          Réserver
        </button>
      </div>

    </div>
  );
}

export default ShowEspace;