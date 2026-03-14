function CardTemoignage({ temoignage }) {
    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 border-l-4 border-[#F7D6E0]">

            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: i < temoignage.note ? '#F7D6E0' : '#ddd' }}>
                        ★
                    </span>
                ))}
            </div>

            <p className="text-sm italic text-[#555]">
                "{temoignage.texte}"
            </p>

            <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-[#B2F7EF]">
                    {temoignage.photo}
                </div>
                <div>
                    <p className="font-semibold text-[#3a3a3a] text-sm">
                        {temoignage.nom}
                    </p>
                    <p className="text-xs  text-[#888]">
                        {temoignage.poste}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CardTemoignage;