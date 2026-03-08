import { useState, useEffect } from 'react';
import FiltreUtilisateur from './FiltreUtilisateur';
import BoutonAjoutAdmin from './BoutonAjoutAdmin';
import TableauUtilisateur from './TableauUtilisateur';

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
            <div className="flex justify-between items-center mt-2">
                <h1 className="text-font text-3xl">LISTE DES UTILISATEURS</h1>
                <BoutonAjoutAdmin />
            </div>

            {loading && (
                <p className="text-center mt-10 text-gray-400">Chargement...</p>
            )}

            <FiltreUtilisateur filtre={filtre} setFiltre={setFiltre} />

            <TableauUtilisateur
                utilisateursFiltres={utilisateursFiltres}
                loading={loading}
                handleDelete={handleDelete}
            />
        </>
    );
}

export default ListeUtilisateur;