function FiltreUtilisateur({ filtre, setFiltre }) {
    return (
        <div className="flex gap-3 mt-6 px-2">
            {[
                { label: 'Tous', value: 'tous' },
                { label: 'Admins', value: 'admin' },
                { label: 'Utilisateurs', value: 'utilisateur' },
            ].map(btn => (
                <button
                    key={btn.value}
                    onClick={() => setFiltre(btn.value)}
                    style={{
                        backgroundColor: filtre === btn.value ? '#7BDFF2' : '#EFF7F6',
                        color: '#3a3a3a',
                        borderColor: '#B2F7EF'
                    }}
                    className="px-4 py-2 rounded-full text-sm font-medium border-2 transition"
                >
                    {btn.label}
                </button>
            ))}
        </div>
    );
}

export default FiltreUtilisateur;