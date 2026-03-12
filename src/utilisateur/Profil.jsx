
import { useState, useEffect } from 'react';

function Profil() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
        setFormData({
            nom: userData?.nom || '',
            prenoms: userData?.prenoms || '',
            email: userData?.email || '',
            telephone: userData?.telephone || '',
            adresse: userData?.adresse || '',
            password: '',
            password_confirmation: '',
        });
        setLoading(false);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const dataToSend = { ...formData };
        if (!dataToSend.password) {
            delete dataToSend.password;
            delete dataToSend.password_confirmation;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/utilisateurs/${user.id_utilisateur}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Erreur lors de la mise à jour');

            localStorage.setItem('user', JSON.stringify(data.data));
            setUser(data.data);
            setSuccess('Profil mis à jour avec succès');
            setEditMode(false);
        } catch (err) {
            setError(err.message);
        }


    };

    if (loading) return <p className="text-center mt-10">Chargement...</p>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold text-center mb-8" style={{ color: '#3a3a3a' }}>
                Mon Profil
            </h1>

            {/* Avatar */}
            <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                    style={{ backgroundColor: '#B2F7EF' }}>
                    👤
                </div>
            </div>

            {/* Messages */}
            {success && (
                <div className="mb-4 px-4 py-3 rounded-xl text-sm text-center"
                    style={{ backgroundColor: '#B2F7EF', color: '#3a3a3a' }}>
                    {success}
                </div>
            )}
            {error && (
                <div className="mb-4 px-4 py-3 rounded-xl text-sm text-center"
                    style={{ backgroundColor: '#F7D6E0', color: '#c0395a' }}>
                    {error}
                </div>
            )}

            {/* Formulaire */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#EFF7F6' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {[
                        { label: 'Nom', name: 'nom' },
                        { label: 'Prénoms', name: 'prenoms' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Téléphone', name: 'telephone' },
                        { label: 'Adresse', name: 'adresse' },
                    ].map(({ label, name, type = 'text' }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium mb-1" style={{ color: '#3a3a3a' }}>
                                {label}
                            </label>
                            {editMode ? (
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    className="w-full border-2 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#7BDFF2]"
                                    style={{ borderColor: '#B2F7EF' }}
                                />
                            ) : (
                                <p className="px-4 py-2 rounded-xl text-sm bg-white">
                                    {user?.[name] || '—'}
                                </p>
                            )}
                        </div>
                    ))}

                    {/* Mot de passe uniquement en mode édition */}
                    {editMode && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: '#3a3a3a' }}>
                                    Nouveau mot de passe
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Laisser vide pour ne pas changer"
                                    className="w-full border-2 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#7BDFF2]"
                                    style={{ borderColor: '#B2F7EF' }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: '#3a3a3a' }}>
                                    Confirmer mot de passe
                                </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full border-2 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#7BDFF2]"
                                    style={{ borderColor: '#B2F7EF' }}
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Boutons */}
                <div className="flex justify-end gap-3 mt-6">
                    {editMode ? (
                        <>
                            <button
                                onClick={() => setEditMode(false)}
                                className="px-5 py-2 rounded-xl text-sm font-medium"
                                style={{ backgroundColor: '#F7D6E0', color: '#3a3a3a' }}>
                                Annuler
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-5 py-2 rounded-xl text-sm font-medium"
                                style={{ backgroundColor: '#7BDFF2', color: '#3a3a3a' }}>
                                Sauvegarder
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-5 py-2 rounded-xl text-sm font-medium"
                            style={{ backgroundColor: '#7BDFF2', color: '#3a3a3a' }}>
                            Modifier le profil
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profil;