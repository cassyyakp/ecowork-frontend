import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EspaceUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    surface: "",
    photo_salle: null,
    id_type_espace: "",
    prix_reservation: "",
  });

  const [typeEspaces, setTypeEspaces] = useState([]);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [espaceRes, typeRes] = await Promise.all([
          fetch(`http://localhost:8000/api/espaces/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          }),
          fetch("http://localhost:8000/api/typeespaces", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          }),
        ]);

        const espaceData = await espaceRes.json();
        const typeData = await typeRes.json();

        const espace = espaceData.data;
        setFormData({
          nom: espace.nom,
          surface: espace.surface,
          photo_salle: null,
          id_type_espace: espace.id_type_espace,
          prix_reservation: espace.prix_reservation,
        });
        setTypeEspaces(typeData.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const form = new FormData();
      form.append("_method", "PUT");
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") form.append(key, value);
      });

      const response = await fetch(`http://localhost:8000/api/espaces/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue.");
      }

      setStatus("success");
      navigate("/admin/espaces");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (loading) return <p className="text-sm text-gray-400">Chargement...</p>;

  return (
    <div className="max-w-lg mx-auto px-4 lg:px-0">
      <div className="bg-[#EFF7F6] p-6 lg:p-10 rounded-2xl shadow-sm border border-[#B2F7EF]">
        <h2 className="text-xl font-bold text-[#3a3a3a] mb-6">
          Modifier l'espace
        </h2>

        {status === "error" && (
          <div className="text-sm px-4 py-3 bg-[#F7D6E0] text-red-500 rounded-xl mb-5 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
              Surface (m²)
            </label>
            <input
              type="number"
              name="surface"
              value={formData.surface}
              onChange={handleChange}
              className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
              Photo{" "}
              <span className="text-gray-400 text-xs">
                (laisser vide pour garder l'actuelle)
              </span>
            </label>
            <input
              type="file"
              name="photo_salle"
              accept="image/*"
              onChange={handleChange}
              className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
              Type d'espace
            </label>
            <select
              name="id_type_espace"
              value={formData.id_type_espace}
              onChange={handleChange}
              className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
            >
              <option value="">-- Choisir un type --</option>
              {typeEspaces.map((type) => (
                <option key={type.id_type_espace} value={type.id_type_espace}>
                  {type.libelle}
                </option>
              ))}
            </select>
          </div>

          <div className="border-t border-[#B2F7EF] pt-4">
            <p className="text-sm font-semibold text-[#3a3a3a] mb-3">
              Tarif de réservation
            </p>
            <div>
              <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
                Prix (€)
              </label>
              <input
                type="number"
                name="prix_reservation"
                value={formData.prix_reservation}
                onChange={handleChange}
                className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
              />
              <p className="text-xs text-gray-400 mt-1">
                Les frais (15%) seront recalculés automatiquement
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/espaces")}
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
    </div>
  );
}

export default EspaceUpdate;
