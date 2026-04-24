import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ onSwitch }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    adresse: "",
    numero_telephone: "",
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
      // navigate("/login");
      onSwitch();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] mx-auto mb-3">
          <img
            src="/images/logo-ecowork.png"
            alt="logo-ecowork"
            className="w-full h-auto object-contain"
          />
        </div>
        <p className="text-sm text-[#666]">Créez votre compte</p>
      </div>

      {/* ERROR */}
      {status === "error" && (
        <div className="text-sm px-4 py-3 bg-[#F7D6E0] text-[#c0395a] rounded-xl mb-4 text-center">
          {errorMsg}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 border-[#B2F7EF]"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom(s)"
            value={formData.prenom}
            onChange={handleChange}
            required
            className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 border-[#B2F7EF]"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 border-[#B2F7EF]"
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 border-[#B2F7EF]"
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="numero_telephone"
            placeholder="Téléphone"
            value={formData.numero_telephone}
            onChange={handleChange}
            required
            className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 border-[#B2F7EF]"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
            className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-400 border-[#B2F7EF]"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full font-semibold py-3 rounded-xl text-sm transition duration-200 active:opacity-70 disabled:opacity-50 bg-[#7BDFF2] text-white shadow-sm"
        >
          {status === "loading" ? "Envoi..." : "Créer mon compte"}
        </button>
      </form>

      <p className="text-center text-sm mt-5 text-[#3a3a3a]">
        Déjà un compte ?{" "}
        <button
          onClick={onSwitch}
          className="font-semibold text-[#7BDFF2] hover:underline"
        >
          Se connecter
        </button>
      </p>
    </div>
  );
}
