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
      onSwitch();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center min-h-screen justify-center p-6">
        <div className="w-full bg-[#EFF7F6] p-10 max-w-md rounded-xl">

          {status === "error" && (
            <div className="text-sm px-4 py-3 bg-[#F7D6E0] text-[#c0395a] rounded-xl mb-5 text-center">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full border-2 rounded-xl px-4 py-3 text-sm border-[#B2F7EF]"
            />

            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="w-full border-2 rounded-xl px-4 py-3 text-sm border-[#B2F7EF]"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mb-4 border-2 rounded-xl px-4 py-3 text-sm border-[#B2F7EF]"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mb-4 border-2 rounded-xl px-4 py-3 text-sm border-[#B2F7EF]"
          />

          <input
            type="text"
            name="numero_telephone"
            placeholder="Téléphone"
            value={formData.numero_telephone}
            onChange={handleChange}
            required
            className="w-full mb-4 border-2 rounded-xl px-4 py-3 text-sm border-[#B2F7EF]"
          />

          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
            className="w-full mb-6 border-2 rounded-xl px-4 py-3 text-sm border-[#B2F7EF]"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 rounded-xl bg-[#7BDFF2]"
          >
            {status === "loading" ? "Envoi..." : "Créer mon compte"}
          </button>

          <p className="text-center mt-4">
            Déjà un compte ?{" "}
            <button onClick={onSwitch} type="button">
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}