import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HistoriqueReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);


  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/me/reservations",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );

        const data = await response.json();
        setReservations(data.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading)
    return (
      <p className="text-sm text-gray-400 text-center mt-20">Chargement...</p>
    );

  return (
    <div data-cy="page-mes-reservations" className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold text-[#3a3a3a] mb-2">
        Mes réservations
      </h2>
      <p className="text-sm text-gray-400 mb-8">
        Historique de toutes vos réservations
      </p>

      {reservations.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-sm mb-4">
            Aucune réservation trouvée.
          </p>
          <button
            onClick={() => navigate("/espaces")}
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
          >
            Réserver un espace
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reservations.map((r) => (
            <div
              key={r.id_reservation}
              data-cy="card-reservation"
              className="flex gap-4 bg-white border border-[#B2F7EF] rounded-2xl overflow-hidden hover:shadow-md transition-all"
            >
              {/* ESPACES */}
              <div className="w-36 h-36 flex-shrink-0 bg-[#B2F7EF] flex items-center justify-center">
                {r.espaces?.length > 0 ? (
                  <div className="text-xs text-center px-2">
                    {r.espaces.map((e) => e.nom).join(", ")}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">Aucun espace</span>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col justify-between py-4 pr-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#3a3a3a] text-base">
                      {r.espaces?.map((e) => e.nom).join(", ") || "—"}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Du {formatDate(r.date_debut_reservation)} au{" "}
                      {formatDate(r.date_fin_reservation)}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      r.statut_reservation === "solder"
                        ? "bg-green-100 text-green-600"
                        : r.statut_reservation === "annulée"
                          ? "bg-red-100 text-red-500"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {r.statut_reservation}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm font-bold text-[#7BDFF2]">
                    {Number(r.prix_total_reservation || 0).toLocaleString()} €
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/reservations/${r.id_reservation}`)
                    }
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#EFF7F6] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
                  >
                    Voir détail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoriqueReservations;
