import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HistoriqueReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/reservations", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
  
        const mesReservations = (data.data ?? []).filter(
          (r) => r.id_utilisateur === user?.id_utilisateur
        );
        setReservations(mesReservations);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  if (loading) return <p className="text-sm text-gray-400 text-center mt-20">Chargement...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold text-[#3a3a3a] mb-2">Mes réservations</h2>
      <p className="text-sm text-gray-400 mb-8">Historique de toutes vos réservations</p>

      {reservations.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-sm mb-4">Aucune réservation trouvée.</p>
          <button
            onClick={() => navigate("/salles")}
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
              className="flex gap-4 bg-white border border-[#B2F7EF] rounded-2xl overflow-hidden hover:shadow-md transition-all"
            >
              {/* Photo */}
              <div className="w-36 h-36 flex-shrink-0">
                <img
                  src={r.photo_espace}
                  alt={r.espace}
                  className="w-full h-full object-cover"
                />
              </div>

  
              <div className="flex flex-1 flex-col justify-between py-4 pr-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-[#3a3a3a] text-base">{r.espace}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Du {r.date_debut_reservation} au {r.date_fin_reservation}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    r.facture_acquittee
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}>
                    {r.facture_acquittee ? "Payée" : "Non payée"}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm font-bold text-[#7BDFF2]">
                    {parseFloat(r.prix_total).toLocaleString()} €
                  </p>
                  <button
                    onClick={() => navigate(`/reservations/${r.id_reservation}`)}
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