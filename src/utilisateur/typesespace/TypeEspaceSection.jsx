import { useEffect, useState } from "react";
import TypeEspaceCard from "./TypeespaceCard";

const icones = {
  "Bureau de travail": "/images/bureau.png",
  "Salle de réunion": "/images/reunion.png",
  "Salle de conférence": "/images/conference.png",
};

function TypeEspaceSection() {
  const [types, setTypes] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/typeespaces", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setTypes(data.data ?? []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTypes();
  }, []);

  return (
    <section className="bg-[#7BDFF2] px-8 py-16">
      {/* Titre */}
      <div className="text-center mb-10">
        <h1 className="text-white text-3xl font-medium mb-2">
          Nos differents espaces
        </h1>
        <p className="text-dark text-xl font-bold">
          Réservez facilement <span className="text-white">l'espace idéal</span>{" "}
          pour votre activité
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {types.map((type) => (
          <div
            key={type.id_type_espace}
            onClick={() => setActive(type.id_type_espace)}
          >
            <TypeEspaceCard
              libelle={type.libelle}
              icone={icones[type.libelle] ?? "/images/default.png"}
              isActive={active === type.id_type_espace}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TypeEspaceSection;
