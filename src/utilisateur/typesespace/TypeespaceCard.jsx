function TypeEspaceCard({ libelle, icone, isActive }) {
  return (
    <div className={`flex flex-col items-center gap-3 p-6 rounded-2xl border cursor-pointer transition-all
      ${isActive 
        ? "border-[#7BDFF2] bg-[#7BDFF2]/10" 
        : "border-gray-600 bg-transparent hover:border-white"
      }`}
    >
      <div className="w-14 h-14 flex items-center justify-center">
        <img src={icone} alt={libelle} className="w-10 h-10 object-contain" />
      </div>
      <p className="text-white text-sm font-semibold">{libelle}</p>
      
    </div>
  );
}
export default TypeEspaceCard;