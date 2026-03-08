import { useState, useEffect } from 'react';
import FiltreUtilisateur from './FiltreUtilisateur';
import BoutonAjoutAdmin from './BoutonAjoutAdmin';
import TableauUtilisateur from './TableauUtilisateur';
import SearchUtilisateur from './SearchUtilisateur';

function ListeUtilisateur() {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtre, setFiltre] = useState('tous');
    const [search, setSearch] = useState("");
    


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
            <div className="flex justify-between items-center mt-2 mb-6">
                <h1 className="text-font text-3xl">LISTE DES UTILISATEURS</h1>
            </div>

            <SearchUtilisateur
                value={search}
                onChange={setSearch}
                placeholder="Rechercher un utilisateur..."
                className="justify-start"
            />

            {loading && (
                <p className="text-center mt-10 text-gray-400">Chargement...</p>
            )}

            <div className="flex items-center justify-between">
                <FiltreUtilisateur filtre={filtre} setFiltre={setFiltre} />
                <BoutonAjoutAdmin />
            </div>


            <TableauUtilisateur
                utilisateursFiltres={utilisateursFiltres}
                loading={loading}
                handleDelete={handleDelete}
                search={search}
            />
        </>
    );
}

export default ListeUtilisateur;