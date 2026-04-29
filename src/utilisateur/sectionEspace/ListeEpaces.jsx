import { useState, useEffect } from "react";
import CardEspace from "./CardEspace";
import FiltreEspace from "./FiltreEspace";
import TextEspace from "./TextEspace";

function ListeEspaces() {
  const [espaces, setEspaces] = useState([]);
  const [types, setTypes] = useState([]);
  const [filtre, setFiltre] = useState("tous");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const headers = {
      Accept: "application/json",
      // Authorization: `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        const resEspaces = await fetch(
          `${import.meta.env.VITE_API_URL}/espaces?page=1`,
          { headers },
        );
        const dataEspaces = await resEspaces.json();

        let tousEspaces = dataEspaces.data || [];
        const lastPage = dataEspaces.meta?.last_page ?? 1;

        if (lastPage > 1) {
          const autresPages = await Promise.all(
            Array.from({ length: lastPage - 1 }, (_, i) =>
              fetch(`${import.meta.env.VITE_API_URL}/espaces?page=${i + 2}`, {
                headers,
              }).then((r) => r.json()),
            ),
          );
          autresPages.forEach((page) => {
            tousEspaces = [...tousEspaces, ...(page.data || [])];
          });
        }

        const derniersEspaces = [...tousEspaces]
          .sort((a, b) => b.id_espace - a.id_espace)
          .slice(0, 3);
        setEspaces(derniersEspaces);

        const resTypes = await fetch(
          `${import.meta.env.VITE_API_URL}/typeespaces`,
          {
            headers,
          },
        );
        const dataTypes = await resTypes.json();
        setTypes(Array.isArray(dataTypes) ? dataTypes : dataTypes.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const espacesFiltres = espaces.filter((e) => {
    if (filtre === "tous") return true;
    return e.id_type_espace === Number(filtre);
  });

  return (
    <div className="py-16 px-8">
      <div className="flex justify-between items-start mb-10">
        <TextEspace />
        <FiltreEspace types={types} filtre={filtre} setFiltre={setFiltre} />
      </div>

      {loading && <p className="text-center text-gray-400">Chargement...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {espacesFiltres.map((espace) => (
          <CardEspace key={espace.id_espace} espace={espace} />
        ))}
      </div>
    </div>
  );
}

export default ListeEspaces;
