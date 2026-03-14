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
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map((r) => (
          <div
            key={r.id_reservation}
            className="bg-[#EFF7F6] border border-[#B2F7EF] rounded-2xl p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-[#3a3a3a] text-sm">
                  {r.utilisateur}
                </p>
                <p className="text-xs text-gray-400">{r.espace}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  r.facture_acquittee
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {r.facture_acquittee ? "Payée" : "Non payée"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-400">
                {r.date_debut_reservation} → {r.date_fin_reservation}
              </p>
              <p className="text-sm font-bold text-[#7BDFF2]">
                {r.prix_total} €
              </p>
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() =>
                  navigate(`/admin/reservations/show/${r.id_reservation}`)
                }
                className="flex-1 py-2 rounded-xl text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                Voir
              </button>
              <button
                onClick={() =>
                  navigate(`/admin/reservations/update/${r.id_reservation}`)
                }
                className="flex-1 py-2 rounded-xl text-xs font-medium bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(r.id_reservation)}
                className="flex-1 py-2 rounded-xl text-xs font-medium bg-[#F7D6E0] text-red-500 hover:bg-red-200 transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#B2F7EF]">
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
            {filtered.map((r) => (
              <tr
                key={r.id_reservation}
                className="border-t border-[#B2F7EF] hover:bg-[#EFF7F6] transition-all"
              >
                <td className="px-6 py-4 font-medium text-[#3a3a3a]">
                  {r.utilisateur}
                </td>
                <td className="px-6 py-4 text-gray-500">{r.espace}</td>
                <td className="px-6 py-4 text-gray-500">
                  {r.date_debut_reservation}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {r.date_fin_reservation}
                </td>
                <td className="px-6 py-4 text-gray-500">{r.prix_total} €</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      r.facture_acquittee
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {r.facture_acquittee ? "Oui" : "Non"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/reservations/show/${r.id_reservation}`)
                      }
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/reservations/update/${r.id_reservation}`,
                        )
                      }
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(r.id_reservation)}
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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
        <p className="text-xs text-gray-400">{total} réservation(s) au total</p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 lg:px-4 py-2 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] disabled:opacity-40 transition-all"
          >
            Précédent
          </button>
          <span className="px-4 py-2 text-sm text-gray-400">
            {currentPage} / {lastPage}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
            disabled={currentPage === lastPage}
            className="px-3 lg:px-4 py-2 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] disabled:opacity-40 transition-all"
          >
            Suivant 
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationListe;
