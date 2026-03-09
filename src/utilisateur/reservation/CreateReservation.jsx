import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateReservation() {
  const { id } = useParams(); // id_espace
  const navigate = useNavigate();

  const [espace, setEspace] = useState(null);
  const [formData, setFormData] = useState({
    date_debut_reservation: "",
    date_fin_reservation: "",
  });
  const [prixTotal, setPrixTotal] = useState(null);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEspace = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/espaces/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
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

  // Calcul automatique du prix total
  useEffect(() => {
    if (
      formData.date_debut_reservation &&
      formData.date_fin_reservation &&
      espace
    ) {
      const debut = new Date(formData.date_debut_reservation);
      const fin = new Date(formData.date_fin_reservation);
      const nbJours = Math.max(1, (fin - debut) / (1000 * 60 * 60 * 24));
      const prix =
        parseFloat(espace.prix_reservation) * nbJours +
        parseFloat(espace.frais_reservation);
      setPrixTotal(prix);
    } else {
      setPrixTotal(null);
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
      const response = await fetch("http://localhost:8000/api/reservations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date_debut_reservation: formData.date_debut_reservation,
          date_fin_reservation: formData.date_fin_reservation,
          id_tarif: espace.id_tarif,
          id_utilisateur: user.id_utilisateur,
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
      navigate("/reservations");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (loading) return <p className="text-sm text-gray-400 text-center mt-20">Chargement...</p>;

  return (
    <div className="max-w-lg mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold text-[#3a3a3a] mb-2">Réserver un espace</h2>
      <p className="text-sm text-gray-400 mb-6">{espace?.nom}</p>

      {status === "error" && (
        <div className="text-sm px-4 py-3 bg-[#F7D6E0] text-red-500 rounded-xl mb-5 text-center">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div>
          <label className="block text-sm text-[#3a3a3a] font-medium mb-1">Date début</label>
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
          <label className="block text-sm text-[#3a3a3a] font-medium mb-1">Date fin</label>
          <input
            type="date"
            name="date_fin_reservation"
            value={formData.date_fin_reservation}
            onChange={handleChange}
            required
            min={formData.date_debut_reservation || new Date().toISOString().split("T")[0]}
            className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
          />
        </div>

        {/* Prix total calculé automatiquement */}
        {prixTotal && (
          <div className="bg-[#EFF7F6] border border-[#B2F7EF] rounded-xl px-4 py-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Prix / jour</span>
              <span className="text-sm text-[#3a3a3a]">
                {parseFloat(espace.prix_reservation).toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Frais de réservation</span>
              <span className="text-sm text-[#3a3a3a]">
                {parseFloat(espace.frais_reservation).toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between border-t border-[#B2F7EF] pt-2 mt-2">
              <span className="text-sm font-semibold text-[#3a3a3a]">Total</span>
              <span className="text-sm font-bold text-[#7BDFF2]">
                {prixTotal.toLocaleString()} FCFA
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
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all disabled:opacity-50"
          >
            {status === "loading" ? "Réservation..." : "Payer et réserver"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreateReservation;