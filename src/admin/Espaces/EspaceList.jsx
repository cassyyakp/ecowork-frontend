import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EspaceList({ search }) {
  const navigate = useNavigate();
  const [espaces, setEspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEspaces = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/espaces", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setEspaces(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEspaces();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cet espace ?")) return;
    try {
      await fetch(`http://localhost:8000/api/espaces/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      setEspaces((prev) => prev.filter((e) => e.id_espace !== id));
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
    <div className="overflow-x-auto rounded-2xl border border-[#B2F7EF]">
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
                {espace.prix_reservation} FCFA
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
  );
}

export default EspaceList;
