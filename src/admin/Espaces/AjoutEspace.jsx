import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EspaceAjout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    surface: "",
    photo_salle: null,
    id_type_espace: "",
    prix_journalier: "",
  });

  const [typeEspaces, setTypeEspaces] = useState([]);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchTypeEspaces = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/typeespaces`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );
        const data = await response.json();
        // console.log(data);
        setTypeEspaces(data.data ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTypeEspaces();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
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
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "" && value !== undefined) {
          form.append(key, value);
        }
      });

      const response = await fetch("http://localhost:8000/api/espaces", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        const errors = data.errors
          ? Object.values(data.errors).flat().join(", ")
          : data.message;
        throw new Error(errors);
      }

      setStatus("success");
      navigate("/admin/espaces");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 lg:px-0">
      <div className="bg-[#EFF7F6] p-6 lg:p-10 rounded-2xl shadow-sm border border-[#B2F7EF]">
        <h2 className="text-xl font-bold text-[#3a3a3a] mb-6">
          Ajouter un espace
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
              placeholder="Nom de l'espace"
              value={formData.nom}
              onChange={handleChange}
              required
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
              placeholder="Ex: 50"
              value={formData.surface}
              onChange={handleChange}
              required
              className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
              Photo
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
              required
              className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
            >
              <option value="">-- Choisir un type --</option>
              {typeEspaces.map((type) => (
                <option key={type.id_type_espace} value={type.id_type_espace}>
                  {type.libelle_type_espace}
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
                name="prix_journalier"
                placeholder="Ex: 50000"
                value={formData.prix_reservation}
                onChange={handleChange}
                required
                className="w-full border-2 border-[#B2F7EF] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white"
              />
              <p className="text-xs text-gray-400 mt-1">
                Les frais (15%) seront calculés automatiquement
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
              {status === "loading" ? "Envoi..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
