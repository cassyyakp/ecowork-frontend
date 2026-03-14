import { useNavigate } from "react-router-dom";

function TableauUtilisateur({
  utilisateursFiltres,
  loading,
  handleDelete,
  search,
}) {
  const navigate = useNavigate();

  const filtered = utilisateursFiltres.filter((item) =>
    item.nom.toLowerCase().includes((search ?? "").toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-3">

      <div className="flex flex-col gap-3 md:hidden">
        {!loading && filtered.length === 0 && (
          <p className="text-center py-6 text-gray-400 text-sm">
            Aucun utilisateur trouvé
          </p>
        )}
        {filtered.map((u) => (
          <div
            key={u.id_utilisateur}
            className="bg-[#EFF7F6] border border-[#B2F7EF] rounded-2xl p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-[#3a3a3a] text-sm">
                  {u.nom} {u.prenoms}
                </p>
                <p className="text-xs text-gray-400">{u.email}</p>
                <p className="text-xs text-gray-400">{u.telephone}</p>
              </div>
              <span
                style={{
                  backgroundColor:
                    u.id_type_compte === 1 ? "#7BDFF2" : "#F7D6E0",
                  color: "#3a3a3a",
                }}
                className="px-3 py-1 rounded-full text-xs font-medium"
              >
                {u.id_type_compte === 1 ? "Admin" : "Utilisateur"}
              </span>
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() =>
                  navigate(`/admin/utilisateurs/${u.id_utilisateur}`)
                }
                className="flex-1 py-2 rounded-xl text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                Voir
              </button>
              <button
                onClick={() =>
                  navigate(`/admin/utilisateurs/${u.id_utilisateur}/edit`)
                }
                className="flex-1 py-2 rounded-xl text-xs font-medium bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(u.id_utilisateur)}
                className="flex-1 py-2 rounded-xl text-xs font-medium bg-[#F7D6E0] text-red-500 hover:bg-red-200 transition-all"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#B2F7EF] mt-2">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#EFF7F6] text-[#3a3a3a] font-semibold">
            <tr>
              <th className="px-6 py-3 font-medium">N°</th>
              <th className="px-6 py-3 font-medium">Nom</th>
              <th className="px-6 py-3 font-medium">Prénoms</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Téléphone</th>
              <th className="px-6 py-3 font-medium">Adresse</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
            {filtered.map((u, index) => (
              <tr key={u.id_utilisateur} className="border-b border-[#B2F7EF]">
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{u.nom}</td>
                <td className="px-6 py-4">{u.prenoms}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">
                  <span
                    style={{
                      backgroundColor:
                        u.id_type_compte === 1 ? "#7BDFF2" : "#F7D6E0",
                      color: "#3a3a3a",
                    }}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {u.id_type_compte === 1 ? "Admin" : "Utilisateur"}
                  </span>
                </td>
                <td className="px-6 py-4">{u.telephone}</td>
                <td className="px-6 py-4">{u.adresse}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/utilisateurs/${u.id_utilisateur}`)
                      }
                      className="flex-1 py-1.5 px-2 rounded-xl text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                    >
                      Voir
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/admin/utilisateurs/${u.id_utilisateur}/edit`)
                      }
                      className="flex-1 py-1.5 px-2 rounded-xl text-xs font-medium bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
                    >
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(u.id_utilisateur)}
                      className="flex-1 py-1.5 px-2 rounded-xl text-xs font-medium bg-[#F7D6E0] text-red-500 hover:bg-red-200 transition-all">
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableauUtilisateur;
