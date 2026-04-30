function CardTemoignage({ temoignage }) {
  return (
    <div>
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-4  border-4 border-[#F7D6E0]">
        <p className="text-sm italic text-[#555]">"{temoignage.texte}"</p>

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              style={{ color: i < temoignage.note ? "#F7D6E0" : "#ddd" }}
            >
              ★
            </span>
          ))}
        </div>

      </div>
      <div className="flex items-center bg-[#EFF7F6] rounded-lg gap-3 mt-2">
        <img
          src={temoignage.photo}
          alt={temoignage.nom}
          className="w-10 h-10 rounded-full object-cover bg-[#B2F7EF]"
        />
        <div>
          <p className="font-semibold text-[#3a3a3a] text-sm">
            {temoignage.nom}
          </p>
          <p className="text-xs text-[#888]">{temoignage.poste}</p>
        </div>
      </div>
    </div>


  );
}

export default CardTemoignage;
