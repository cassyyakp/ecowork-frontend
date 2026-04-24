import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ReservationShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/reservations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );
        const data = await response.json();
        setReservation(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [id]);

  if (loading) return <p className="text-sm text-gray-400">Chargement...</p>;
  if (!reservation)
    return <p className="text-sm text-gray-400">Réservation introuvable.</p>;

  return (
    <div className="max-w-lg mx-auto px-4 lg:px-0">
      <div className="bg-[#EFF7F6] p-6 lg:p-10 rounded-2xl shadow-sm border border-[#B2F7EF]">
        <h2 className="text-xl font-bold text-[#3a3a3a] mb-6">
          Détail réservation
        </h2>

        {reservation.espaces?.[0]?.photo_salle ? (
          <img
            src={reservation.espaces[0].photo_salle}
            alt={reservation.espaces[0].nom}
            className="w-full h-48 object-cover rounded-2xl mb-6"
          />
        ) : (
          <div className="w-full h-48 bg-[#B2F7EF] rounded-2xl mb-6 flex items-center justify-center text-gray-400 text-sm">
            Aucune photo
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Espace(s)</span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {reservation.espaces?.map((e) => e.nom).join(", ") || "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Utilisateur</span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {reservation.utilisateur || "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Date début</span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {reservation.date_debut_reservation}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Date fin</span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {reservation.date_fin_reservation}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Frais</span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {reservation.frais_reservation} FCFA
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Prix total</span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {reservation.prix_total_reservation} FCFA
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Statut</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                reservation.statut_reservation === "solder"
                  ? "bg-green-100 text-green-600"
                  : reservation.statut_reservation === "annulée"
                    ? "bg-red-100 text-red-500"
                    : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {reservation.statut_reservation}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Facture</span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {reservation.facture || "—"}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => navigate("/admin/reservations")}
            className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
          >
            Retour
          </button>
          <button
            onClick={() =>
              navigate(
                `/admin/reservations/update/${reservation.id_reservation}`,
              )
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

export default ReservationShow;
