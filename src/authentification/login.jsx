import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

            // Sauvegarde le token et l'utilisateur
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setStatus("success");
            navigate("/dashboard");
        } catch (err) {
            setStatus("error");
            setErrorMsg(err.message);
        }
    };

    return (
        <div style={{ backgroundColor: '#EFF7F6', minHeight: '100vh' }}
            className="flex items-center justify-center px-6">

            <div className="w-full max-w-sm">

                {/* Header */}
                <div className="text-center mb-10">
                    <div style={{ backgroundColor: '#7BDFF2' }}
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🌿</span>
                    </div>
                    <h1 className="text-2xl font-bold" style={{ color: '#3a3a3a' }}>
                        Greenspace
                    </h1>
                    <p className="text-sm mt-1" style={{ color: '#888' }}>
                        Connectez-vous à votre espace
                    </p>
                </div>

                {/* Erreur */}
                {status === "error" && (
                    <div style={{ backgroundColor: '#F7D6E0', color: '#c0395a' }}
                        className="text-sm px-4 py-3 rounded-xl mb-5 text-center">
                        {errorMsg}
                    </div>
                )}

                {/* Formulaire */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1"
                        style={{ color: '#3a3a3a' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="exemple@email.com"
                        style={{ borderColor: '#B2F7EF', backgroundColor: '#fff' }}
                        className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1"
                        style={{ color: '#3a3a3a' }}>
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        style={{ borderColor: '#B2F7EF', backgroundColor: '#fff' }}
                        className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400"
                    />
                </div>

                {/* Bouton */}
                <button
                    onClick={handleSubmit}
                    disabled={status === "loading"}
                    style={{ backgroundColor: '#7BDFF2', color: '#3a3a3a' }}
                    className="w-full font-semibold py-3 rounded-xl text-sm transition duration-200 active:opacity-70 disabled:opacity-50"
                >
                    {status === "loading" ? "Connexion..." : "Se connecter"}
                </button>

                {/* Lien register */}
                <p className="text-center text-sm mt-6" style={{ color: '#888' }}>
                    Pas encore de compte ?{' '}
                    <Link to="/register"
                        style={{ color: '#7BDFF2' }}
                        className="font-semibold">
                        S'inscrire
                    </Link>
                </p>

            </div>
        </div>
    );
}