function TypeEspaceCard({ numero, libelle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
    >
      <div className="text-6xl font-bold text-[#B2F7EF] mb-2 group-hover:text-[#F7D6E0] transition-colors">
        {numero < 10 ? `0${numero}` : numero}
      </div>
      
      <h3 className="text-xl font-bold text-[#3a3a3a] mb-3">
        {libelle}
      </h3>
    </div>
  );
}

export default TypeEspaceCard;
