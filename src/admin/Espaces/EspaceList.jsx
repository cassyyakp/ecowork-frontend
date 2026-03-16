import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";

function EspaceList({ search }) {
  const navigate = useNavigate();
  const [espaces, setEspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchEspaces(currentPage);
  }, [currentPage]);

  const fetchEspaces = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/espaces?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        },
      );
      const data = await response.json();
      setEspaces(data.data);
      setLastPage(data.meta?.last_page ?? 1);
      setTotal(data.meta?.total ?? 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cet espace ?")) return;
    try {
      await fetch(`${API_URL}/api/espaces/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      fetchEspaces(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = espaces.filter((e) =>
    e.nom.toLowerCase().includes((search ?? "").toLowerCase()),
  );

  if (loading) return <p className="text-sm text-gray-400">Chargement...</p>;
  if (filtered.length === 0)
    return <p className="text-sm text-gray-400">Aucun espace trouvé.</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:hidden">
        {filtered.map((espace) => (
          <div
            key={espace.id_espace}
            className="bg-[#EFF7F6] border border-[#B2F7EF] rounded-2xl p-4 flex gap-3"
          >
            {espace.photo_salle ? (
              <img
                src={espace.photo_salle}
                alt={espace.nom}
                className="w-20 h-16 object-cover rounded-xl flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-16 bg-[#B2F7EF] rounded-xl flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
                Aucune
              </div>
            )}
            <div className="flex flex-col flex-1 gap-1">
              <p className="font-semibold text-[#3a3a3a] text-sm">
                {espace.nom}
              </p>
              <p className="text-xs text-gray-400">
                {espace.surface} m² — {espace.prix_reservation} €
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() =>
                    navigate(`/admin/espaces/show/${espace.id_espace}`)
                  }
                  className="flex-1 py-1.5 rounded-xl text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                >
                  Voir
                </button>
                <button
                  onClick={() =>
                    navigate(`/admin/espaces/update/${espace.id_espace}`)
                  }
                  className="flex-1 py-1.5 rounded-xl text-xs font-medium bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(espace.id_espace)}
                  className="flex-1 py-1.5 rounded-xl text-xs font-medium bg-[#F7D6E0] text-red-500 hover:bg-red-200 transition-all"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#B2F7EF]">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#EFF7F6] text-[#3a3a3a] font-semibold">
            <tr>
              <th className="px-6 py-4">Photo</th>
              <th className="px-6 py-4">Nom</th>
              <th className="px-6 py-4">Surface</th>
              <th className="px-6 py-4">Prix réservation</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((espace) => (
              <tr
                key={espace.id_espace}
                className="border-t border-[#B2F7EF] hover:bg-[#EFF7F6] transition-all"
              >
                <td className="px-6 py-4">
                  {espace.photo_salle ? (
                    <img
                      src={espace.photo_salle}
                      alt={espace.nom}
                      className="w-16 h-12 object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-16 h-12 bg-[#B2F7EF] rounded-xl flex items-center justify-center text-xs text-gray-400">
                      Aucune
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-[#3a3a3a]">
                  {espace.nom}
                </td>
                <td className="px-6 py-4 text-gray-500">{espace.surface} m²</td>
                <td className="px-6 py-4 text-gray-500">
                  {espace.prix_reservation} €
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/espaces/show/${espace.id_espace}`)
                      }
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/espaces/update/${espace.id_espace}`)
                      }
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(espace.id_espace)}
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
        <p className="text-xs text-gray-400">{total} espace(s) au total</p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 lg:px-4 py-2 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] disabled:opacity-40 transition-all"
          >
            ← Précédent
          </button>
          <span className="px-4 py-2 text-sm text-gray-400">
            {currentPage} / {lastPage}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
            disabled={currentPage === lastPage}
            className="px-3 lg:px-4 py-2 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] disabled:opacity-40 transition-all"
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  );
}

export default EspaceList;
