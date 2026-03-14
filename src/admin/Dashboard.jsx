import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    utilisateurs: 0,
    espaces: 0,
    equipements: 0,
    reservations: 0,
    factures: 0,
    totalFactures: 0,
  });
  const [reservationsRecentes, setReservationsRecentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const fetchStats = async () => {
      try {
        const [
          resUsers,
          resEspaces,
          resEquipements,
          resReservations,
          resFactures,
        ] = await Promise.all([
          fetch("http://localhost:8000/api/utilisateurs", { headers }),
          fetch("http://localhost:8000/api/espaces", { headers }),
          fetch("http://localhost:8000/api/equipementsalles", { headers }),
          fetch("http://localhost:8000/api/reservations", { headers }),
          fetch("http://localhost:8000/api/factures", { headers }),
        ]);

        const [
          dataUsers,
          dataEspaces,
          dataEquipements,
          dataReservations,
          dataFactures,
        ] = await Promise.all([
          resUsers.json(),
          resEspaces.json(),
          resEquipements.json(),
          resReservations.json(),
          resFactures.json(),
        ]);

        const reservations = dataReservations.data || dataReservations;
        const factures = dataFactures.data || dataFactures;
        const totalFactures = factures.reduce(
          (acc, f) => acc + parseFloat(f.montant_total || 0),
          0,
        );

        setStats({
          utilisateurs: (dataUsers.data || dataUsers).length,
          espaces: (dataEspaces.data || dataEspaces).length,
          equipements: (dataEquipements.data || dataEquipements).length,
          reservations: reservations.length,
          factures: factures.length,
          totalFactures: totalFactures.toLocaleString(),
        });

        setReservationsRecentes(reservations.slice(0, 5));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Utilisateurs",
      value: stats.utilisateurs,
      icon: "/images/user.png",
      isImage: true,
      lien: "/admin/utilisateurs",
    },
    {
      label: "Espaces",
      value: stats.espaces,
      icon: "/images/espaces.png",
      isImage: true,
      lien: "/admin/espaces",
    },
    {
      label: "Equipements",
      value: stats.equipements,
      icon: "/images/equipement.png",
      isImage: true,
      lien: "/admin/equipements",
    },
    {
      label: "Réservations",
      value: stats.reservations,
      icon: "/images/reservation.png",
      isImage: true,
      lien: "/admin/reservations",
    },
    {
      label: "Factures",
      value: stats.factures,
      icon: "/images/facture.png",
      isImage: true,
    },
  ];

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#B2F7EF" }}>
      {/* Profil */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/admin/profil")}
          className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-[#EFF7F6] transition-all"
        >
          <div className="w-9 h-9 rounded-full bg-[#F7D6E0] flex items-center justify-center">
            <img src="/images/user.png" alt="user" className="h-4 w-4" />
          </div>
          <span className="text-xs text-gray-400">▼</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8 text-[#3a3a3a]">
        DASHBOARD ADMINISTRATEUR
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {cards.map((card, index) => (
          <a
            href={card.lien}
            key={index}
            className="block bg-white rounded-2xl p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              {card.isImage ? (
                <img
                  src={card.icon}
                  alt={card.label}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-2xl">{card.icon}</span>
              )}
            </div>
            <p className="text-sm font-medium text-[#3a3a3a]">{card.label}</p>
            <p className="text-4xl font-bold mt-2 text-[#3a3a3a]">
              {loading ? "..." : card.value}
            </p>
          </a>
        ))}
      </div>

      <div className="rounded-2xl p-6" style={{ backgroundColor: "#ffffff" }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: "#3a3a3a" }}>
          Dernières réservations
        </h2>
        {loading ? (
          <p className="text-gray-400 text-sm">Chargement...</p>
        ) : reservationsRecentes.length === 0 ? (
          <p className="text-gray-400 text-sm">Aucune réservation</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "2px solid #B2F7EF" }}>
                <th className="text-left py-2 px-3">ID</th>
                <th className="text-left py-2 px-3">Début</th>
                <th className="text-left py-2 px-3">Fin</th>
                <th className="text-left py-2 px-3">Prix total</th>
                <th className="text-left py-2 px-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {reservationsRecentes.map((r) => (
                <tr
                  key={r.id_reservation}
                  style={{ borderBottom: "1px solid #B2F7EF" }}
                >
                  <td className="py-2 px-3">#{r.id_reservation}</td>
                  <td className="py-2 px-3">{r.date_debut_reservation}</td>
                  <td className="py-2 px-3">{r.date_fin_reservation}</td>
                  <td className="py-2 px-3">
                    {parseFloat(r.prix_total || 0).toLocaleString()} €
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: r.facture_acquittee
                          ? "#B2F7EF"
                          : "#F7D6E0",
                        color: "#3a3a3a",
                      }}
                    >
                      {r.facture_acquittee ? "Payée" : "En attente"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
