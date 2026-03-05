import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    email: "",
    password: "",
    adresse: "",
    telephone: "",
    id_type_compte: "",
  });

  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue.");
      }

      setStatus("success");
      navigate("/login");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#EFF7F6", fontFamily: "system-ui, sans-serif" }}
    >
      <div
        className="w-full max-w-lg rounded-3xl shadow-xl overflow-hidden"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Top banner */}
        <div
          className="px-10 py-8 text-center"
          style={{ backgroundColor: "#7BDFF2" }}
        >
          <h1
            className="text-3xl font-bold tracking-widest uppercase"
            style={{ color: "#EFF7F6" }}
          >
            ECO<span style={{ color: "#ffffff" }}>WORK</span>
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#EFF7F6", opacity: 0.85 }}>
            Créez votre compte
          </p>
        </div>

        <div className="px-10 py-8">
          {/* Error */}
          {status === "error" && (
            <div
              className="rounded-xl px-4 py-3 mb-5 text-sm font-medium"
              style={{ backgroundColor: "#F7D6E0", color: "#c0392b", border: "1px solid #F7D6E0" }}
            >
              ❌ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Nom + Prénom */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#7BDFF2" }}>
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Doe"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "#EFF7F6",
                    border: "1.5px solid #B2F7EF",
                    color: "#333",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#7BDFF2" }}>
                  Prénom(s)
                </label>
                <input
                  type="text"
                  name="prenoms"
                  placeholder="John"
                  value={formData.prenoms}
                  onChange={handleChange}
                  required
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "#EFF7F6",
                    border: "1.5px solid #B2F7EF",
                    color: "#333",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#7BDFF2" }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="john.doe@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  backgroundColor: "#EFF7F6",
                  border: "1.5px solid #B2F7EF",
                  color: "#333",
                }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#7BDFF2" }}>
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  backgroundColor: "#EFF7F6",
                  border: "1.5px solid #B2F7EF",
                  color: "#333",
                }}
              />
            </div>

            {/* Téléphone */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#7BDFF2" }}>
                Téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                placeholder="+225 07 00 00 00 00"
                value={formData.telephone}
                onChange={handleChange}
                required
                className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  backgroundColor: "#EFF7F6",
                  border: "1.5px solid #B2F7EF",
                  color: "#333",
                }}
              />
            </div>

            {/* Adresse */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#7BDFF2" }}>
                Adresse
              </label>
              <input
                type="text"
                name="adresse"
                placeholder="Cocody, Abidjan"
                value={formData.adresse}
                onChange={handleChange}
                required
                className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  backgroundColor: "#EFF7F6",
                  border: "1.5px solid #B2F7EF",
                  color: "#333",
                }}
              />
            </div>

            {/* Type de compte */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#7BDFF2" }}>
                Type de compte
              </label>
              <div className="flex gap-3">
                {/* Option 1 */}
                <label
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 cursor-pointer text-sm font-semibold transition-all"
                  style={{
                    border: formData.id_type_compte === "1"
                      ? "2px solid #7BDFF2"
                      : "1.5px solid #B2F7EF",
                    backgroundColor: formData.id_type_compte === "1" ? "#B2F7EF" : "#EFF7F6",
                    color: "#333",
                  }}
                >
                  <input
                    type="radio"
                    name="id_type_compte"
                    value="1"
                    checked={formData.id_type_compte === "1"}
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                  1
                </label>

               
                <label
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 cursor-pointer text-sm font-semibold transition-all"
                  style={{
                    border: formData.id_type_compte === "2"
                      ? "2px solid #7BDFF2"
                      : "1.5px solid #B2F7EF",
                    backgroundColor: formData.id_type_compte === "2" ? "#B2F7EF" : "#EFF7F6",
                    color: "#333",
                  }}
                >
                  <input
                    type="radio"
                    name="id_type_compte"
                    value="2"
                    checked={formData.id_type_compte === "2"}
                    onChange={handleChange}
                    className="hidden"
                  />
                 2
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 rounded-xl py-3 text-sm font-bold tracking-widest uppercase transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#7BDFF2",
                color: "#ffffff",
              }}
            >
              {status === "loading" ? "Envoi en cours..." : "Créer mon compte →"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm" style={{ color: "#aaa" }}>
            Déjà un compte ?{" "}
            <a href="/login" className="font-semibold" style={{ color: "#7BDFF2" }}>
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}