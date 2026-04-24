import { useEffect, useState } from "react";
import TypeEspaceCard from "./TypeEspaceCard";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";

function TypeEspaceSection() {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTypes = async () => {
      try {

        const response = await fetch(`${API_URL}/api/typeespaces`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();

        setTypes(data.data || data || []);
      } catch (err) {
        console.error("Erreur fetch types:", err);
      }

    };
    fetchTypes();
  }, []);

  return (
    <section className="bg-[#7BDFF2] px-8 py-16">

      <div className="text-center mb-10">
        <h1 className="text-white text-3xl font-bold mb-2">
          Nos différents espaces
        </h1>
        <p className="text-gray-600 text-xl font-bold">
          Réservez facilement <span className="text-gray-50">l'espace idéal</span>{" "}
          pour votre activité
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {types.map((type, index) => (
          <TypeEspaceCard
            key={type.id_type_espace}
            numero={index + 1}                              
            libelle={type.libelle_type_espace}
            onClick={() => navigate("/login")}
          />
        ))}
      </div>
    </section>
  );
}

export default TypeEspaceSection;
