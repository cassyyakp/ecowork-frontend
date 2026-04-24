import { useNavigate } from "react-router-dom";
import { usePanier } from "../../context/PanierContext";

function CardEspace({ espace }) {
  const navigate = useNavigate();
  const { ajouterEspace, panier } = usePanier();
  const dejaDansPanier = panier.find((e) => e.id_espace === espace.id_espace);

  return (
    <div className="border-2 border-[#B2F7EF] rounded-2xl overflow-hidden hover:shadow-lg transition-all">
      <div
        style={{ backgroundColor: "#B2F7EF" }}
        className="h-48 cursor-pointer"
        onClick={() => navigate(`/espaces/${espace.id_espace}`)}
      >
        <img
          src={espace.photo_salle}
          alt={espace.nom}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-base text-[#3a3a3a]">{espace.nom}</h3>
        <p className="text-xs mt-1 text-[#888]">{espace.surface} m²</p>
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-sm text-[#7BDFF2]">
            {parseFloat(espace.prix_journalier || 0).toLocaleString()} FCFA
            <span className="text-xs text-gray-400"> / jour</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/espaces/${espace.id_espace}`)}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#EFF7F6] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
            >
              Détails
            </button>
            <button
              onClick={() =>
                dejaDansPanier ? navigate("/panier") : ajouterEspace(espace)
              }
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                dejaDansPanier
                  ? "bg-[#7BDFF2] text-white"
                  : "bg-[#F7D6E0] text-[#3a3a3a] hover:bg-pink-200"
              }`}
            >
              {dejaDansPanier ? "Voir panier" : "Ajouter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardEspace;
