function SuccessModal({ message, subMessage, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <img
            src="/images/approved.png"
            alt="succès"
            className="w-full h-auto object-contain"
          />
        </div>
        <h3 className="text-lg font-bold text-[#3a3a3a] mb-2">{message}</h3>
        <p className="text-sm text-gray-400 mb-6">{subMessage}</p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#7BDFF2] text-white font-semibold text-sm"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;