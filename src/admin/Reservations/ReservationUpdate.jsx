import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ReservationUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date_debut_reservation: "",
    date_fin_reservation: "",
    facture_acquittee: false,
    id_tarif: "",
  });

  const [prixTotal, setPrixTotal] = useState(null);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/reservations/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
        const r = data.data;
        setFormData({
          date_debut_reservation: r.date_debut_reservation,
          date_fin_reservation: r.date_fin_reservation,
          facture_acquittee: r.facture_acquittee,
          id_tarif: r.id_tarif,
        });
        setPrixTotal(r.prix_total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch(`http://localhost:8000/api/reservations/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errors = data.errors
          ? Object.values(data.errors).flat().join(", ")
          : data.message;
        throw new Error(errors);
      }

      setStatus("success");
      window.location.href = "/admin/reservations";
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (loading) return <p className="text-sm text-gray-400">Chargement...</p>;

  return (
    <div className="max-w-lg mx-auto bg-[#EFF7F6] p-10 rounded-2xl shadow-sm border border-[#B2F7EF]">
      <h2 className="text-xl font-bold text-[#3a3a3a] mb-6">Modifier la réservation</h2>

      {status === "error" && (
        <div className="text-sm px-4 py-3 bg-[#F7D6E0] text-red-500 rounded-xl mb-5 text-center">
          {errorMsg}
        </div>
      )}

      {prixTotal && (
        <div className="bg-white border border-[#B2F7EF] rounded-xl px-4 py-3 mb-4 flex justify-between">
          <span className="text-sm text-gray-400">Prix total actuel</span>
          <span className="text-sm font-semibold text-[#3a3a3a]">{prixTotal} FCFA</span>
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
            className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
          />
        </div>

        <p className="text-xs text-gray-400">
          Le prix total sera recalculé automatiquement selon les nouvelles dates.
        </p>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="facture_acquittee"
            checked={formData.facture_acquittee}
            onChange={handleChange}
            className="w-4 h-4 accent-cyan-400"
          />
          <label className="text-sm text-[#3a3a3a] font-medium">Facture acquittée</label>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/reservations")}
            className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all disabled:opacity-50"
          >
            {status === "loading" ? "Modification..." : "Modifier"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ReservationUpdate;