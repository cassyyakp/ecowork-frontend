import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";

function CreateEquipement() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [espaces, setEspaces] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    nombre: "",
    id_espace: "",
  });

  useEffect(() => {
    const fetchEspaces = async () => {
      try {
        const response = await fetch(`${API_URL}/api/espaces`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setEspaces(data.data || data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEspaces();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/equipementsalles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      navigate("/admin/equipements");
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center p-4 lg:p-6">
      <div className="w-full bg-[#EFF7F6] p-6 lg:p-10 max-w-md rounded-xl">
        <div className="text-center mb-10">
          <p className="text-2xl font-bold text-[#3a3a3a]">
            AJOUTER UN ÉQUIPEMENT
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
            Nom
          </label>
          <select
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white border-[#B2F7EF]"
          >
            <option value="">Sélectionner un équipement</option>
            {[
              "Grande table de réunion",
              "Table individuelle",
              "Vidéo projecteur",
              "Climatisation",
              "Sono et micro",
              "Internet wifi haut débit",
              "Photocopieur",
              "Machine à café",
            ].map((equipement, index) => (
              <option key={index} value={equipement}>
                {equipement}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
            Nombre
          </label>
          <input
            type="number"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ex: 2"
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white border-[#B2F7EF]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
            Espace
          </label>
          <select
            name="id_espace"
            value={formData.id_espace}
            onChange={handleChange}
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white border-[#B2F7EF]"
          >
            <option value="">Sélectionner un espace</option>
            {espaces.map((espace) => (
              <option key={espace.id_espace} value={espace.id_espace}>
                {espace.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 font-semibold py-3 rounded-xl text-sm bg-[#7BDFF2] disabled:opacity-50"
          >
            {saving ? "Enregistrement..." : "Ajouter"}
          </button>
          <button
            onClick={() => navigate("/admin/equipements")}
            style={{ borderColor: "#B2F7EF" }}
            className="flex-1 py-3 rounded-xl text-sm border-2"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEquipement;
