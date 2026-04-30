import { useEffect, useState } from "react";
import TypeEspaceCard from "./TypeespaceCard";

const icones = {
  "Salle de réunion": "/images/reunion.webp",
  "Espace coworking": "/images/workspace.png",
  "Salle de conférence": "/images/conference.webp",
  "Bureau privé": "/images/office-desk.webp",
};

function TypeEspaceSection({ onSelect, active }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/typeespaces`,
          {
            headers: {
              Accept: "application/json",
            },
          },
        );
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
      <div className="text-center mb-10">
        <h1 className="text-white text-3xl font-medium mb-2">
          Nos differents espaces
        </h1>
        <p className="text-dark text-xl font-bold">
          Réservez facilement <span className="text-white">l'espace idéal</span>{" "}
          pour votre activité
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {types.map((type) => (
          <div
            key={type.id_type_espace}
            onClick={() => onSelect(type.id_type_espace)}
          >
            <TypeEspaceCard
              libelle_type_espace={type.libelle_type_espace}
              icone={icones[type.libelle_type_espace] ?? "/images/default.webp"}
              isActive={active === type.id_type_espace}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TypeEspaceSection;
