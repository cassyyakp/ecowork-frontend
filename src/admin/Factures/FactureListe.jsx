import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FactureListe({ search }) {
  const navigate = useNavigate();
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchFactures(currentPage);
  }, [currentPage]);

  const fetchFactures = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/factures?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        },
      );
      const data = await response.json();
      setFactures(data.data);
      setLastPage(data.meta?.last_page ?? 1);
      setTotal(data.meta?.total ?? 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = factures.filter((f) =>
    f.utilisateur?.toLowerCase().includes((search ?? "").toLowerCase()),
  );

  if (loading) return <p className="text-sm text-gray-400">Chargement...</p>;
  if (filtered.length === 0)
    return <p className="text-sm text-gray-400">Aucune facture trouvée.</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-2xl border border-[#B2F7EF]">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#EFF7F6] text-[#3a3a3a] font-semibold">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Utilisateur</th>
              <th className="px-6 py-4">Espace</th>
              <th className="px-6 py-4">Prix total</th>
              <th className="px-6 py-4">Acquittée</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((facture) => (
              <tr
                key={facture.id_facture}
                className="border-t border-[#B2F7EF] hover:bg-[#EFF7F6] transition-all"
              >
                <td className="px-6 py-4 text-gray-500">{facture.date}</td>
                <td className="px-6 py-4 font-medium text-[#3a3a3a]">
                  {facture.utilisateur}
                </td>
                <td className="px-6 py-4 text-gray-500">{facture.espace}</td>
                <td className="px-6 py-4 text-gray-500">
                  {facture.prix_total} FCFA
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      facture.facture_acquittee
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {facture.facture_acquittee ? "Oui" : "Non"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/factures/show/${facture.id_facture}`)
                    }
                    className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                  >
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-gray-400">{total} facture(s) au total</p>
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

export default FactureListe;
