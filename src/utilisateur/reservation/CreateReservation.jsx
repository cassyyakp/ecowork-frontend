import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateReservation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [espace, setEspace] = useState(null);
  const [formData, setFormData] = useState({
    date_debut_reservation: "",
    date_fin_reservation: "",
  });
  const [prixTotal, setPrixTotal] = useState(null);
  const [frais, setFrais] = useState(null);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEspace = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/espaces/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );
        const data = await response.json();
        setEspace(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEspace();
  }, [id]);

  useEffect(() => {
    if (
      formData.date_debut_reservation &&
      formData.date_fin_reservation &&
      espace
    ) {
      const debut = new Date(formData.date_debut_reservation);
      const fin = new Date(formData.date_fin_reservation);
      const nbJours = Math.max(1, (fin - debut) / (1000 * 60 * 60 * 24));
      const prixJournalier = parseFloat(espace.prix_journalier || 0);
      const fraisCalc = prixJournalier * 0.15;
      const total = prixJournalier * nbJours + fraisCalc;
      setFrais(fraisCalc);
      setPrixTotal(total);
    } else {
      setPrixTotal(null);
      setFrais(null);
    }
  }, [formData.date_debut_reservation, formData.date_fin_reservation, espace]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reservations`,
        {
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
            espaces: [parseInt(id)],
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        const errors = data.errors
          ? Object.values(data.errors).flat().join(", ")
          : data.message;
        throw new Error(errors);
      }

      setStatus("success");
      navigate("/reservations");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

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

  if (loading)
    return (
      <p className="text-sm text-gray-400 text-center mt-20">Chargement...</p>
    );

  return (
    <div className="max-w-lg mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold text-[#3a3a3a] mb-2">
        Réserver un espace
      </h2>
      <p className="text-sm text-gray-400 mb-6">{espace?.nom}</p>

      {status === "error" && (
        <div className="text-sm px-4 py-3 bg-[#F7D6E0] text-red-500 rounded-xl mb-5 text-center">
          {errorMsg}
        </div>
      )}

      <div className="border-2 border-[#B2F7EF] rounded-2xl p-6 bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
              Date début
            </label>
            <input
              type="date"
              name="date_debut_reservation"
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

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-yellow-700 mb-1">
              Frais de réservation non remboursables
            </p>
            <p className="text-xs text-yellow-600">
              Les frais de réservation (15%) ne sont pas remboursables en cas
              d'annulation.
              {formData.date_debut_reservation && (
                <span className="font-semibold">
                  {" "}
                  Le solde restant devra être réglé avant le{" "}
                  <span className="underline">{getDateLimiteSolde()}</span>.
                </span>
              )}
            </p>
          </div>

          {prixTotal && (
            <div className="bg-[#EFF7F6] border border-[#B2F7EF] rounded-xl px-4 py-4">
              <h1 className="text-2xl font-bold text-[#7BDFF2] text-center mb-4">
                {prixTotal.toLocaleString()} €
              </h1>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Prix / jour</span>
                <span className="text-sm text-[#3a3a3a]">
                  {parseFloat(espace.prix_journalier).toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Frais (15%)</span>
                <span className="text-sm text-[#3a3a3a]">
                  {frais?.toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between border-t border-[#B2F7EF] pt-2 mt-2">
                <span className="text-sm font-semibold text-[#3a3a3a]">
                  Total à payer
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
              onClick={() => navigate(`/espaces/${id}`)}
              className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={status === "loading" || !prixTotal}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-black transition-all disabled:opacity-50"
            >
              {status === "loading" ? "En cours..." : "Réserver"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReservation;
