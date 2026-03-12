import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ReservationListe({ search }) {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchReservations(currentPage);
  }, [currentPage]);

  const fetchReservations = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/reservations?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        },
      );
      const data = await response.json();
      setReservations(data.data);
      setLastPage(data.meta.last_page);
      setTotal(data.meta.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette réservation ?")) return;
    try {
      await fetch(`http://localhost:8000/api/reservations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      fetchReservations(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = reservations.filter((r) =>
    r.utilisateur?.toLowerCase().includes((search ?? "").toLowerCase()),
  );

  if (loading) return <p className="text-sm text-gray-400">Chargement...</p>;
  if (filtered.length === 0)
    return <p className="text-sm text-gray-400">Aucune réservation trouvée.</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-2xl border border-[#B2F7EF]">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#EFF7F6] text-[#3a3a3a] font-semibold">
            <tr>
              <th className="px-6 py-4">Utilisateur</th>
              <th className="px-6 py-4">Espace</th>
              <th className="px-6 py-4">Date début</th>
              <th className="px-6 py-4">Date fin</th>
              <th className="px-6 py-4">Prix total</th>
              <th className="px-6 py-4">Payé</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((reservation) => (
              <tr
                key={reservation.id_reservation}
                className="border-t border-[#B2F7EF] hover:bg-[#EFF7F6] transition-all"
              >
                <td className="px-6 py-4 font-medium text-[#3a3a3a]">
                  {reservation.utilisateur}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {reservation.espace}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {reservation.date_debut_reservation}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {reservation.date_fin_reservation}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {reservation.prix_total} FCFA
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      reservation.facture_acquittee
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {reservation.facture_acquittee ? "Oui" : "Non"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/reservations/show/${reservation.id_reservation}`,
                        )
                      }
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/reservations/update/${reservation.id_reservation}`,
                        )
                      }
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(reservation.id_reservation)}
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-[#F7D6E0] text-red-500 hover:bg-red-200 transition-all"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-gray-400">{total} réservation(s) au total</p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] disabled:opacity-40 transition-all"
          >
            ← Précédent
          </button>
          <span className="px-4 py-2 text-sm text-gray-400">
            {currentPage} / {lastPage}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
            disabled={currentPage === lastPage}
            className="px-4 py-2 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] disabled:opacity-40 transition-all"
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationListe;
