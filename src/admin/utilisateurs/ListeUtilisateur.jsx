import { useState, useEffect } from 'react';

function ListeUtilisateur() {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtre, setFiltre] = useState('tous');

    useEffect(() => {
        const fetchUtilisateurs = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/utilisateurs', {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setUtilisateurs(data.data || data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUtilisateurs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
        try {
            await fetch(`http://localhost:8000/api/utilisateurs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUtilisateurs(utilisateurs.filter(u => u.id_utilisateur !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const utilisateursFiltres = utilisateurs.filter(u => {
        if (filtre === 'admin') return u.id_type_compte === 1;
        if (filtre === 'utilisateur') return u.id_type_compte === 2;
        return true;
    });

    return (
        <>
            <h1 className="text-font text-center mt-2 text-3xl">LISTE DES UTILISATEURS</h1>

            {loading && (
                <p className="text-center mt-10 text-gray-400">Chargement...</p>
            )}

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

            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead className="text-sm text-body bg-[#F7D6E0] border-b border-default-medium">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-medium">N°</th>
                            <th scope="col" className="px-6 py-3 font-medium">Nom</th>
                            <th scope="col" className="px-6 py-3 font-medium">Prénoms</th>
                            <th scope="col" className="px-6 py-3 font-medium">Email</th>
                            <th scope="col" className="px-6 py-3 font-medium">Type de compte</th>
                            <th scope="col" className="px-6 py-3 font-medium">Téléphone</th>
                            <th scope="col" className="px-6 py-3 font-medium">Adresse</th>
                            <th scope="col" className="px-6 py-3 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#EFF7F6]">
                        {!loading && utilisateursFiltres.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-400">
                                    Aucun utilisateur trouvé
                                </td>
                            </tr>
                        )}
                        {utilisateursFiltres.map((utilisateur, index) => (
                            <tr key={utilisateur.id_utilisateur}
                                className="bg-neutral-primary-soft border-b border-default">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">{utilisateur.nom}</td>
                                <td className="px-6 py-4">{utilisateur.prenoms}</td>
                                <td className="px-6 py-4">{utilisateur.email}</td>
                                <td className="px-6 py-4">
                                    {utilisateur.id_type_compte === 1 ? 'Admin' : 'Utilisateur'}
                                </td>
                                <td className="px-6 py-4">{utilisateur.telephone}</td>
                                <td className="px-6 py-4">{utilisateur.adresse}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <a href="#" className="font-medium text-fg-brand hover:underline">
                                        <i className="fi fi-ss-eye text-purple-500"></i>
                                    </a>
                                    <a href="#" className="font-medium text-fg-brand hover:underline">
                                        <i className="fi fi-sr-pencil text-green-500"></i>
                                    </a>
                                    <button
                                        onClick={() => handleDelete(utilisateur.id_utilisateur)}
                                        className="font-medium text-red-500 hover:underline">
                                        <i className="fi fi-sr-trash"></i>
                                    </button>
                                </td>   
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListeUtilisateur;