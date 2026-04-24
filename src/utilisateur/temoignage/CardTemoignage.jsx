function CardTemoignage({ temoignage }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4 border-2 border-[#F7D6E0]">
      

      <p className="text-sm text-[#555]">"{temoignage.texte}"</p>

      <div className="flex items-center gap-3 mt-2">
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
