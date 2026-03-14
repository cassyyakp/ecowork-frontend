import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import genererfacture from "./GenererFacture";


function FactureShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facture, setFacture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacture = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/factures/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setFacture(Array.isArray(data.data) ? data.data[0] : data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacture();
  }, [id]);

  const formatPrix = (prix) =>
    parseFloat(prix).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  if (loading) return <p className="text-sm text-gray-400">Chargement...</p>;
  if (!facture) return <p className="text-sm text-gray-400">Facture introuvable.</p>;

  return (
    <div className="max-w-lg mx-auto px-4 lg:px-0">
      <div className="bg-[#EFF7F6] p-6 lg:p-10 rounded-2xl shadow-sm border border-[#B2F7EF]">
        <h2 className="text-xl font-bold text-[#3a3a3a] mb-6">Détail facture</h2>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">N° Facture</span>
            <span className="text-sm font-medium text-[#3a3a3a]">#{facture.id_facture}</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Date</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{facture.date}</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Utilisateur</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{facture.utilisateur}</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Espace</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{facture.espace}</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Date début</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{facture.date_debut_reservation}</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Date fin</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{facture.date_fin_reservation}</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Prix total</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{formatPrix(facture.prix_total)} FCFA</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Facture acquittée</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              facture.facture_acquittee ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
            }`}>
              {facture.facture_acquittee ? "Oui" : "Non"}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Créé le</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{facture.created_at}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => navigate("/admin/factures")}
            className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
          >
            Retour
          </button>
          <button
            onClick={() => genererfacture(facture)}
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
          >
            Télécharger facture
          </button>
        </div>
      </div>
    </div>
  );
}

export default FactureShow;