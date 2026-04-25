import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

function Login({ onSwitch }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

       

      if (!response.ok) {
        throw new Error(data.message || "Identifiants incorrects.");
      }

      


      login(data.token, data.user);
      setStatus("success");

      if (data.user.id_type_compte === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/accueil");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-10">
        <div className="w-[120px] h-[120px] flex items-center justify-center mx-auto mb-4">
          <img
            src="/images/logo-ecowork.png"
            alt="logo-ecowork"
            className="w-full h-auto object-contain"
          />
        </div>

        <p className="text-sm mt-1 text-[#888]">
          Connectez-vous à votre espace
        </p>
      </div>

      {status === "error" && (
        <div className="text-sm px-4 py-3 bg-[#F7D6E0] text-[#c0395a] rounded-xl mb-5 text-center">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm text-[#3a3a3a] font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            data-cy="login-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre mail"
            required
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white border-[#B2F7EF]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#3a3a3a] text-sm font-medium mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            data-cy="login-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white border-[#B2F7EF]"
          />
        </div>

        <button
          type="submit"
          data-cy="login-submit"
          disabled={status === "loading"}
          className="w-full font-semibold py-3 rounded-xl text-sm transition duration-200 active:opacity-70 disabled:opacity-50 bg-[#7BDFF2] text-white shadow-sm"
        >
          {status === "loading" ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-[#3a3a3a]">
        Pas encore de compte ?{" "}
        <button
          onClick={onSwitch}
          data-cy="switch-to-register"
          className="font-semibold text-[#7BDFF2] hover:underline focus:outline-none"
        >
          S'inscrire
        </button>
      </p>
    </div>
  );
}

export default Login;
