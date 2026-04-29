import { useState, useEffect } from "react";
import CardEspace from "./CardEspace";
import FiltreEspace from "./FiltreEspace";
import TextEspace from "./TextEspace";
import { useNavigate } from "react-router-dom";

function PageEspace() {
  const navigate = useNavigate();
  const utilisateur = JSON.parse(localStorage.getItem("user"));

  const [espaces, setEspaces] = useState([]);
  const [types, setTypes] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [filtre, setFiltre] = useState("tous");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const fetchData = async () => {
      try {
        const [resEspaces, resTypes, resReservations] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/espaces?page=1`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/typeespaces`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/reservations`, { headers }),
        ]);
        const [dataEspaces, dataTypes, dataReservations] = await Promise.all([
          resEspaces.json(),
          resTypes.json(),
          resReservations.json(),
        ]);

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

        const mesReservations = (dataReservations.data || []).filter(
          (r) => r.id_utilisateur === utilisateur?.id_utilisateur,
        );

        setReservations(mesReservations);
        setEspaces(tousEspaces);
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
    return e.id_type_espace === filtre;
  });

  return (
    <div className="py-5 px-8">
      <div className="relative bg-gray-50 text-center mx-auto rounded-3xl w-full max-w-[700px] p-6 sm:p-10 mb-8 overflow-hidden border-2 border-[#F7D6E0]">
        <h1 className="text-3xl sm:text-4xl">
          Bienvenue{" "}
          <span className="text-[#7BDFF2] font-bold">
            {utilisateur?.prenom} {utilisateur?.nom}
          </span>
        </h1>
        <p className="text-md mt-3 text-gray-500">
          Ton expérience commence maintenant!! <br />
          Choisis un espace et fais ta réservation en sécurité.
        </p>

        <div className="flex gap-6 sm:gap-12 justify-center mt-6">
          <div>
            <p className="text-4xl font-bold text-[#3a3a3a]">
              {espaces.length}
            </p>
            <p className="text-xs text-center uppercase tracking-wider text-gray-400 mt-1">
              Espaces disponibles
            </p>
          </div>

          <div>
            <p className="text-4xl font-bold text-[#3a3a3a]">
              {reservations.length}
            </p>
            <p className="text-xs text-center uppercase tracking-wider text-gray-400 mt-1">
              Réservations totales
            </p>
          </div>
        </div>
      </div>

      <p className="text-center font-bold text-3xl mt-20">
        NOS ESPACES DISPONIBLES
      </p>

      <div className="mt-12 mb-12 flex justify-end">
        <FiltreEspace types={types} filtre={filtre} setFiltre={setFiltre} />
      </div>

      {loading && <p className="text-center text-gray-400">Chargement...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {espacesFiltres.map((espace) => (
          <div
            key={espace.id_espace}
            data-cy="card-espace"
            onClick={() => navigate(`/espaces/${espace.id_espace}`)}
            className="cursor-pointer"
          >
            <CardEspace espace={espace} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageEspace;
