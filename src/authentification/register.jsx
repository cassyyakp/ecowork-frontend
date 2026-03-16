import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../config";

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
      const response = await fetch(`${API_URL}/api/register`, {
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
    <div className="flex items-center min-h-screen justify-center p-6">
      <div className="w-full bg-[#EFF7F6] p-10 max-w-md rounded-xl">
        <div className="text-center mb-10">
          <div className="w-[150px] h-[150px] rounded-full flex items-center justify-center mx-auto mb-4">
            <img src="/images/logo-ecowork.png" alt="logo-ecowork" />
          </div>
          <p className="text-sm mt-1 text-[#888]">Créez votre compte</p>
        </div>

        {status === "error" && (
          <div className="text-sm px-4 py-3 bg-[#F7D6E0] text-[#c0395a] rounded-xl mb-5 text-center">
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              placeholder="Doe"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-[#fff] border-[#B2F7EF]"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
              Prénom(s)
            </label>
            <input
              type="text"
              name="prenoms"
              placeholder="John"
              value={formData.prenoms}
              onChange={handleChange}
              required
              className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-[#fff] border-[#B2F7EF]"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="exemple@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-[#fff] border-[#B2F7EF]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-[#fff] border-[#B2F7EF]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            name="telephone"
            placeholder="+225 07 00 00 00 00"
            value={formData.telephone}
            onChange={handleChange}
            required
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-[#fff] border-[#B2F7EF]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
            Adresse
          </label>
          <input
            type="text"
            name="adresse"
            placeholder="Cocody, Abidjan"
            value={formData.adresse}
            onChange={handleChange}
            required
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-[#fff] border-[#B2F7EF]"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="w-full font-semibold py-3 rounded-xl text-sm transition duration-200 active:opacity-70 disabled:opacity-50 bg-[#7BDFF2]"
        >
          {status === "loading" ? "Envoi en cours..." : "Créer mon compte"}
        </button>

        <p className="text-center text-sm mt-6 text-[#3a3a3a]">
          Déjà un compte ?{" "}
          <Link to="/login" className="font-semibold text-[#7BDFF2]">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
