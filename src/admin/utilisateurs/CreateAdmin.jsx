// src/admin/utilisateurs/CreateAdmin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAdmin() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    password_confirmation: "",
    numero_telephone: "",
    adresse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await fetch("http://localhost:8000/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      navigate("/admin/utilisateurs");
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button
        onClick={() => navigate("/admin/utilisateurs")}
        style={{ borderColor: "#B2F7EF" }}
        className="px-4 py-2 rounded-xl text-sm font-medium border-2 flex items-center gap-2"
      >
        <i className="fi fi-rr-arrow-left"></i>
        Retour
      </button>
      {/* Titre + bouton retour */}
      jsx
      <div className="max-w-lg mx-auto px-4 lg:px-0 py-6">
        <div className="bg-[#EFF7F6] p-6 lg:p-10 rounded-2xl border border-[#B2F7EF]">
          <div className="w-full bg-[#EFF7F6] p-10 max-w-md rounded-xl">
            <h1 className="text-font text-3xl">AJOUTER UN ADMIN</h1>

            {/* Formulaire */}
            <div className="max-w-lg mt-10 space-y-4">
              {[
                { label: "Nom", name: "nom", type: "text" },
                { label: "Prénoms", name: "prenom", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Mot de passe", name: "password", type: "password" },
                {
                  label: "Confirmer mot de passe",
                  name: "password_confirmation",
                  type: "password",
                },
                { label: "Téléphone", name: "numero_telephone", type: "text" },
                { label: "Adresse", name: "adresse", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#3a3a3a" }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={{ borderColor: "#B2F7EF", backgroundColor: "#fff" }}
                    className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              ))}

              {/* Boutons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  style={{ backgroundColor: "#7BDFF2", color: "#3a3a3a" }}
                  className="flex-1 py-3 rounded-xl font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? "Enregistrement..." : "Valider"}
                </button>
                <button
                  onClick={() => navigate("/admin/utilisateurs")}
                  style={{ backgroundColor: "#EFF7F6", borderColor: "#B2F7EF" }}
                  className="flex-1 py-3 rounded-xl font-medium text-sm border-2"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAdmin;
