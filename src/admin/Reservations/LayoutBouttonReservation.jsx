function LayoutBouttonReservation({ onSearch }) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Rechercher une réservation..."
        className="w-full sm:max-w-sm border-2 border-[#B2F7EF] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-400 bg-white"
      />
    </div>
  );
}

export default LayoutBouttonReservation;
