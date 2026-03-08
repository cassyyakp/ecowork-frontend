import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditUtilisateur() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenoms: '',
        email: '',
        telephone: '',
        adresse: '',
    });

    useEffect(() => {
        const fetchUtilisateur = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/utilisateurs/${id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                const u = data.data || data;
                setFormData({
                    nom: u.nom || '',
                    prenoms: u.prenoms || '',
                    email: u.email || '',
                    telephone: u.telephone || '',
                    adresse: u.adresse || '',
                });
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUtilisateur();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            await fetch(`http://localhost:8000/api/utilisateurs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });
            navigate('/admin/utilisateurs');
        } catch (err) {
            console.log(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="text-center mt-10 text-gray-400">Chargement...</p>;

    return (
        <>

            <div className="flex items-center min-h-screen justify-center p-6">

                <div className="w-full bg-[#EFF7F6] p-10 max-w-md rounded-xl">
                     <h1 className="text-font text-center mt-2 text-3xl">MODIFIER UTILISATEUR</h1>

            <div className="max-w-lg mx-auto mt-10 space-y-4">
                {[
                    { label: 'Nom', name: 'nom', type: 'text' },
                    { label: 'Prénoms', name: 'prenoms', type: 'text' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Téléphone', name: 'telephone', type: 'text' },
                    { label: 'Adresse', name: 'adresse', type: 'text' },
                ].map(field => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium mb-1" style={{ color: '#3a3a3a' }}>
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            style={{ borderColor: '#B2F7EF', backgroundColor: '#fff' }}
                            className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400"
                        />
                    </div>
                ))}

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        style={{ backgroundColor: '#7BDFF2', color: '#3a3a3a' }}
                        className="flex-1 py-2 rounded-xl font-medium text-sm disabled:opacity-50">
                        {saving ? 'Enregistrement...' : 'Enregistrer'}
                    </button>
                    <button
                        onClick={() => navigate('/admin/utilisateurs')}
                        style={{ backgroundColor: '#EFF7F6', borderColor: '#B2F7EF' }}
                        className="flex-1 py-2 rounded-xl font-medium text-sm border-2">
                        Annuler
                    </button>
                </div>
            </div>
                </div>
            </div>
        </>
    );
}

export default EditUtilisateur;