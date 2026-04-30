import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePanier } from "../../context/PanierContext";
import SuccessModal from "../../modal/sucessmodal";

function PagePanier() {
  const navigate = useNavigate();
  const { panier, retirerEspace, viderPanier } = usePanier();

  const [formData, setFormData] = useState({
    date_debut_reservation: "",
    date_fin_reservation: "",
    mode_paiement: "reservation",
  });

  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const nbJours =
    formData.date_debut_reservation && formData.date_fin_reservation
      ? Math.max(
          1,
          (new Date(formData.date_fin_reservation) -
            new Date(formData.date_debut_reservation)) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const prixJournalierTotal = panier.reduce(
    (acc, e) => acc + parseFloat(e.prix_journalier || 0),
    0,
  );

  const frais = prixJournalierTotal * 0.15;
  const prixTotal =
    formData.mode_paiement === "totalite"
      ? prixJournalierTotal * nbJours + frais
      : frais;

  const getDateLimiteSolde = () => {
    if (!formData.date_debut_reservation) return null;
    const date = new Date(formData.date_debut_reservation);
    date.setDate(date.getDate() - 2);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date_debut_reservation: formData.date_debut_reservation,
          date_fin_reservation: formData.date_fin_reservation,
          id_utilisateur: user.id_utilisateur,
          mode_paiement: formData.mode_paiement,
          espaces: panier.map((e) => e.id_espace),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errors = data.errors
          ? Object.values(data.errors).flat().join(", ")
          : data.message;
        throw new Error(errors);
      }

      setStatus("success");
      setShowModal(true);
      viderPanier();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (panier.length === 0 && !showModal)
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-sm mb-4">Votre panier est vide.</p>
        <button
          onClick={() => navigate("/espaces")}
          className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
        >
          Voir les espaces
        </button>
      </div>
    );

  return (
    <div data-cy="page-panier" className="max-w-2xl mx-auto py-10 px-6">
      {showModal && (
        <SuccessModal
          message="Réservation confirmée !"
          subMessage="Votre réservation a bien été enregistrée."
          onClose={() => {
            setShowModal(false);
            navigate("/reservations");
          }}
        />
      )}

      <h2 className="text-2xl font-bold text-[#3a3a3a] mb-6">Mon panier</h2>

      {status === "error" && (
        <div
          data-cy="panier-error"
          className="text-sm px-4 py-3 bg-[#F7D6E0] text-red-500 rounded-xl mb-5 text-center"
        >
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-3 mb-6">
        {panier.map((espace) => (
          <div
            key={espace.id_espace}
            data-cy="panier-item"
            className="flex gap-4 bg-white border border-[#B2F7EF] rounded-2xl overflow-hidden"
          >
            <div className="w-24 h-24 flex-shrink-0 bg-[#B2F7EF]">
              {espace.photo_salle ? (
                <img
                  src={espace.photo_salle}
                  alt={espace.nom}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                  Aucune photo
                </div>
              )}
            </div>
            <div className="flex flex-1 items-center justify-between py-3 pr-4">
              <div>
                <p className="font-bold text-sm text-[#3a3a3a]">{espace.nom}</p>
                <p className="text-xs text-gray-400">{espace.surface} m²</p>
                <p className="text-sm font-semibold text-[#7BDFF2] mt-1">
                  {parseFloat(espace.prix_journalier).toLocaleString()} € / jour
                </p>
              </div>
              <button
                onClick={() => retirerEspace(espace.id_espace)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-[#F7D6E0] text-red-500 hover:bg-red-100 transition-all"
              >
                Retirer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-[#B2F7EF] rounded-2xl p-6 bg-white shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-[#3a3a3a] mb-4">
          Choisir les dates et le paiement
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
                Date début
              </label>
              <input
                type="date"
                name="date_debut_reservation"
                data-cy="panier-date-debut"
                value={formData.date_debut_reservation}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
                Date fin
              </label>
              <input
                type="date"
                name="date_fin_reservation"
                data-cy="panier-date-fin"
                value={formData.date_fin_reservation}
                onChange={handleChange}
                required
                min={
                  formData.date_debut_reservation ||
                  new Date().toISOString().split("T")[0]
                }
                className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
              Mode de paiement
            </label>
            <select
              name="mode_paiement"
              data-cy="panier-mode-paiement"
              value={formData.mode_paiement}
              onChange={handleChange}
              className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
            >
              <option value="reservation">Réserver (frais uniquement)</option>
              <option value="totalite">Payer la totalité</option>
            </select>
          </div>

          {formData.mode_paiement === "reservation" &&
            formData.date_debut_reservation && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-yellow-700 mb-1">
                  Frais de réservation non remboursables
                </p>
                <p className="text-xs text-yellow-600">
                  Les frais (15%) ne sont pas remboursables en cas d'annulation.
                  <span className="font-semibold">
                    {" "}
                    Le solde devra être réglé avant le{" "}
                    <span className="underline">{getDateLimiteSolde()}</span>.
                  </span>
                </p>
              </div>
            )}

          {nbJours > 0 && (
            <div
              data-cy="panier-recap-prix"
              className="bg-[#EFF7F6] border border-[#B2F7EF] rounded-xl px-4 py-4"
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">
                  Location ({nbJours}j)
                </span>
                <span className="text-sm text-[#3a3a3a]">
                  {(prixJournalierTotal * nbJours).toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Frais (15%)</span>
                <span className="text-sm text-[#3a3a3a]">
                  {frais.toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between border-t border-[#B2F7EF] pt-2 mt-2">
                <span className="text-sm font-semibold text-[#3a3a3a]">
                  À régler maintenant (
                  {formData.mode_paiement === "totalite" ? "Total" : "Acompte"})
                </span>
                <span className="text-sm font-bold text-[#7BDFF2]">
                  {prixTotal.toLocaleString()} €
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate("/espaces")}
              className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
            >
              Continuer
            </button>
            <button
              type="submit"
              data-cy="panier-submit"
              disabled={status === "loading" || nbJours === 0}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all disabled:opacity-50"
            >
              {status === "loading" ? "En cours..." : "Réserver"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PagePanier;
