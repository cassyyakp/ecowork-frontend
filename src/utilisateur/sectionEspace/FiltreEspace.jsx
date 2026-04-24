
function FiltreEspace({ types, filtre, setFiltre }) {
    return (
        <div className="flex gap-2 flex-wrap justify-end">

            <button
                onClick={() => setFiltre('tous')}
                style={{
                    backgroundColor: filtre === 'tous' ? '#7BDFF2' : '#EFF7F6'
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

                        backgroundColor: String(filtre) === String(type.id_type_espace) ? '#7BDFF2' : '#EFF7F6'
                    }}
                    className="px-4 py-2 rounded-full text-sm font-medium border-2 transition border-2 border-[#B2F7EF] text-[#3a3a3a]">
                    {type.libelle_type_espace}
                </button>
            ))}
        </div>
    );
}
export default FiltreEspace;