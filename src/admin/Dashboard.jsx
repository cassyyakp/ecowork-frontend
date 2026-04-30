import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    utilisateurs: 0,
    espaces: 0,
    equipements: 0,
    reservations: 0,
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
        const [resUsers, resEspaces, resEquipements, resReservations] =
          await Promise.all([
            fetch(`${import.meta.env.VITE_API_URL}/utilisateurs`, { headers }),
            fetch(`${import.meta.env.VITE_API_URL}/espaces`, { headers }),
            fetch(`${import.meta.env.VITE_API_URL}/equipements`, { headers }),
            fetch(`${import.meta.env.VITE_API_URL}/reservations`, { headers }),
          ]);

        const [dataUsers, dataEspaces, dataEquipements, dataReservations] =
          await Promise.all([
            resUsers.json(),
            resEspaces.json(),
            resEquipements.json(),
            resReservations.json(),
          ]);

        const getData = (res) => res?.data?.data || res?.data || [];

        const users = getData(dataUsers);
        const espaces = getData(dataEspaces);
        const equipements = getData(dataEquipements);
        const reservations = getData(dataReservations);

        const totalReservations = reservations.reduce(
          (acc, r) => acc + parseFloat(r.prix_total_reservation || 0),
          0,
        );

        setStats({
          utilisateurs: users.length,
          espaces: espaces.length,
          equipements: equipements.length,
          reservations: reservations.length,
          totalFactures: totalReservations.toLocaleString(),
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
      icon: "/images/user.webp",
      lien: "/admin/utilisateurs",
    },
    {
      label: "Espaces",
      value: stats.espaces,
      icon: "/images/espaces.webp",
      lien: "/admin/espaces",
    },
    {
      label: "Equipements",
      value: stats.equipements,
      icon: "/images/equipement.webp",
      lien: "/admin/equipements",
    },
    {
      label: "Réservations",
      value: stats.reservations,
      icon: "/images/reservation.webp",
      lien: "/admin/reservations",
    },
  ];

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#B2F7EF" }}>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/admin/profil")}
          className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-[#EFF7F6] transition-all"
        >
          <div className="w-9 h-9 rounded-full bg-[#F7D6E0] flex items-center justify-center">
            <img src="/images/user.webp" alt="user" className="h-4 w-4" />
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
            className="block bg-white rounded-2xl p-5 hover:shadow-md transition-all text-center"
          >
            <div className="flex justify-center mb-3">
              <img
                src={card.icon}
                alt={card.label}
                className="w-8 h-8 object-contain"
              />
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
          <div className="flex flex-col gap-3">
            {reservationsRecentes.map((r, index) => (
              <div
                key={index}
                className="bg-[#EFF7F6] rounded-xl p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#3a3a3a]">
                    #{index + 1}
                  </span>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor:
                        r.statut_reservation === "soldee"
                          ? "#B2F7EF"
                          : r.statut_reservation === "annulee"
                            ? "#F7D6E0"
                            : "#FFF3CD",
                      color: "#3a3a3a",
                    }}
                  >
                    {r.statut_reservation}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Début: {r.date_debut_reservation?.split(" ")[0]}</span>
                  <span>Fin: {r.date_fin_reservation?.split(" ")[0]}</span>
                </div>
                <div className="text-sm font-bold text-[#7BDFF2]">
                  {parseFloat(r.prix_total_reservation || 0).toLocaleString()} €
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
