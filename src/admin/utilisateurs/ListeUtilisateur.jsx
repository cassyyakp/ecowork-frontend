import { useState, useEffect } from "react";
import FiltreUtilisateur from "./FiltreUtilisateur";
import BoutonAjoutAdmin from "./BoutonAjoutAdmin";
import TableauUtilisateur from "./TableauUtilisateur";
import SearchUtilisateur from "./SearchUtilisateur";

function ListeUtilisateur() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState("tous");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchUtilisateurs(currentPage);
  }, [currentPage]);

  const fetchUtilisateurs = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/utilisateurs?page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      setUtilisateurs(data.data || []);
      setLastPage(data.meta?.last_page ?? 1);
      setTotal(data.meta?.total ?? 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?"))
      return;
    try {
      await fetch(`http://localhost:8000/api/utilisateurs/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUtilisateurs(currentPage);
    } catch (err) {
      console.log(err);
    }
  };

  const utilisateursFiltres = utilisateurs.filter((u) => {
    const matchFiltre =
      filtre === "admin"
        ? u.id_type_compte === 1
        : filtre === "utilisateur"
          ? u.id_type_compte === 2
          : true;
    const matchSearch = search
      ? u.nom?.toLowerCase().includes(search.toLowerCase()) ||
        u.prenoms?.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchFiltre && matchSearch;
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl lg:text-3xl text-font">LISTE DES UTILISATEURS</h1>

      {/* Search + bouton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SearchUtilisateur
          value={search}
          onChange={setSearch}
          placeholder="Rechercher un utilisateur..."
        />
        <BoutonAjoutAdmin />
      </div>


      <FiltreUtilisateur filtre={filtre} setFiltre={setFiltre} />

      {loading && (
        <p className="text-center mt-10 text-gray-400">Chargement...</p>
      )}

      <TableauUtilisateur
        utilisateursFiltres={utilisateursFiltres}
        loading={loading}
        handleDelete={handleDelete}
        search={search}
      />

 
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 mt-2">
        <p className="text-xs text-gray-400">{total} utilisateur(s) au total</p>
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

export default ListeUtilisateur;
