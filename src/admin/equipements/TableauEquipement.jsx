import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TableauEquipement({ refresh, search }) {
  const navigate = useNavigate();
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchEquipements(currentPage);
  }, [currentPage, refresh]);

  const fetchEquipements = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/equipementsalles?page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      setEquipements(data.data || []);
      setLastPage(data.meta?.last_page ?? 1);
      setTotal(data.meta?.total ?? 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet équipement ?"))
      return;
    try {
      await fetch(`http://localhost:8000/api/equipementsalles/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchEquipements(currentPage);
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = equipements.filter((item) =>
    item.nom.toLowerCase().includes((search ?? "").toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-2xl border border-[#B2F7EF] mt-4">
        <table className="w-full text-sm text-left min-w-[500px]">
          <thead className="bg-[#EFF7F6] text-[#3a3a3a] font-semibold">
            <tr>
              <th className="px-4 lg:px-6 py-3 font-medium">N°</th>
              <th className="px-4 lg:px-6 py-3 font-medium">Nom</th>
              <th className="px-4 lg:px-6 py-3 font-medium">Nombre</th>
              <th className="px-4 lg:px-6 py-3 font-medium hidden sm:table-cell">
                Espace
              </th>
              <th className="px-4 lg:px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  Chargement...
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  Aucun équipement trouvé
                </td>
              </tr>
            )}
            {filtered.map((equipement, index) => (
              <tr
                key={equipement.id_equipement}
                className="border-b border-[#B2F7EF]"
              >
                <td className="px-4 lg:px-6 py-4 font-medium">
                  {(currentPage - 1) * 10 + index + 1}
                </td>
                <td className="px-4 lg:px-6 py-4">{equipement.nom}</td>
                <td className="px-4 lg:px-6 py-4">{equipement.nombre}</td>
                <td className="px-4 lg:px-6 py-4 hidden sm:table-cell">
                  {equipement.espace?.nom || "-"}
                </td>
                <td className="px-4 lg:px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/equipements/${equipement.id_equipement}`,
                        )
                      }
                      className="flex-1 py-1.5 rounded-xl text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/equipements/${equipement.id_equipement}/edit`,
                        )
                      }
                      className="flex-1 py-1.5 rounded-xl text-xs font-medium bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(equipement.id_equipement)}
                      className="flex-1 py-1.5 rounded-xl text-xs font-medium bg-[#F7D6E0] text-red-500 hover:bg-red-200 transition-all"
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
        <p className="text-xs text-gray-400">{total} équipement(s) au total</p>
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
    </div >
  );
}

export default TableauEquipement;
