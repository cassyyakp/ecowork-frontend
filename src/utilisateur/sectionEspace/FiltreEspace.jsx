import { useState } from "react";

function FiltreEspace({ types, filtre, setFiltre }) {
    const [menuOuvert, setMenuOuvert] = useState(false);

    const choisirFiltre = (valeur) => {
        setFiltre(valeur);
        setMenuOuvert(false);
    };

    return (
        <div>

            <div className="lg:hidden">
                <button
                    onClick={() => setMenuOuvert(!menuOuvert)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#EFF7F6] border-2 border-[#F7D6E0] text-[#3a3a3a] font-medium"
                >
                    <span className="flex items-center gap-2">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>

                    </span>

                </button>

                {menuOuvert && (
                    <div className="mt-2 p-3 bg-white rounded-xl border border-[#F7D6E0] flex flex-col gap-2">
                        <button
                            onClick={() => choisirFiltre("tous")}
                            style={{
                                backgroundColor:
                                    filtre === "tous" ? "#7BDFF2" : "#EFF7F6",
                            }}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-[#3a3a3a] text-left transition"
                        >
                            Tous
                        </button>

                        {types.map((type) => (
                            <button
                                key={type.id_type_espace}
                                onClick={() => choisirFiltre(type.id_type_espace)}
                                style={{
                                    backgroundColor:
                                        String(filtre) === String(type.id_type_espace)
                                            ? "#7BDFF2"
                                            : "#EFF7F6",
                                }}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-[#3a3a3a] text-left transition"
                            >
                                {type.libelle_type_espace}
                            </button>
                        ))}
                    </div>
                )}
            </div>


            <div className="hidden lg:inline-flex gap-2 flex-wrap border-2 border-[#F7D6E0] rounded-full p-2">
                <button
                    onClick={() => setFiltre("tous")}
                    style={{
                        backgroundColor: filtre === "tous" ? "#7BDFF2" : "#EFF7F6",
                    }}
                    className="px-4 py-2 rounded-full text-sm font-medium border-2 border-[#F7D6E0] text-[#3a3a3a] transition"
                >
                    Tous
                </button>

                {types.map((type) => (
                    <button
                        key={type.id_type_espace}
                        onClick={() => setFiltre(type.id_type_espace)}
                        style={{
                            backgroundColor:
                                String(filtre) === String(type.id_type_espace)
                                    ? "#7BDFF2"
                                    : "#EFF7F6",
                        }}
                        className="px-4 py-2 rounded-full text-sm font-medium border-2 border-[#F7D6E0] text-[#3a3a3a] transition"
                    >
                        {type.libelle_type_espace}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FiltreEspace;
