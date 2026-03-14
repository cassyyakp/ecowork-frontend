function CardTemoignage({ temoignage }) {
    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-4"
            style={{ borderLeft: '4px solid #F7D6E0' }}>


            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: i < temoignage.note ? '#F7D6E0' : '#ddd' }}>
                        ★
                    </span>
                ))}
            </div>

            {/* Texte */}
            <p className="text-sm italic" style={{ color: '#555' }}>
                "{temoignage.texte}"
            </p>

            {/* Auteur */}
            <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: '#B2F7EF' }}>
                    {temoignage.photo}
                </div>
                <div>
                    <p className="font-semibold text-sm" style={{ color: '#3a3a3a' }}>
                        {temoignage.nom}
                    </p>
                    <p className="text-xs" style={{ color: '#888' }}>
                        {temoignage.poste}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CardTemoignage;