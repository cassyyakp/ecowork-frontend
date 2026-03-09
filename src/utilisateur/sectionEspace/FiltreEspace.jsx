function FiltreEspace({ types, filtre, setFiltre }) {

    return (
        <div className="flex gap-2 flex-wrap justify-end px-4 py-2 rounded-full text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a]">
            <button
                onClick={() => setFiltre('tous')}
                style={{
                    backgroundColor: filtre === 'tous' ? '#7BDFF2' : '#EFF7F6'
                }}
                className="px-4 py-2 rounded-full text-sm font-medium border-2 transition">
                Tous
            </button>
            {types.map(type => (
                <button
                    key={type.id_type_espace}
                    onClick={() => setFiltre(type.id_type_espace)}
                    style={{
                        backgroundColor: filtre === type.id_type_espace ? '#7BDFF2' : '#EFF7F6'
                    }}
                    className="px-4 py-2 rounded-full text-sm font-medium border-2 transition border-2 border-[#B2F7EF] text-[#3a3a3a]">
                    {type.libelle}
                </button>
            ))}
        </div>
    );
}

export default FiltreEspace;