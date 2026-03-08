import { useNavigate } from 'react-router-dom';

function TableauUtilisateur({ utilisateursFiltres, loading, handleDelete, search }) {
    const navigate = useNavigate();

    const filtered = utilisateursFiltres.filter(item =>
        item.nom.toLowerCase().includes((search ?? "").toLowerCase())
    );

    return (
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
                        <th scope="col" className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-[#EFF7F6]">
                    {!loading && filtered.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center py-6 text-gray-400">
                                Aucun utilisateur trouvé
                            </td>
                        </tr>
                    )}
                    {filtered.map((utilisateur, index) => (
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
                                <button onClick={() => navigate(`/admin/utilisateurs/${utilisateur.id_utilisateur}`)}>
                                    <i className="fi fi-ss-eye text-purple-500"></i>
                                </button>
                                <button onClick={() => navigate(`/admin/utilisateurs/${utilisateur.id_utilisateur}/edit`)}>
                                    <i className="fi fi-ss-pencil text-green-500"></i>
                                </button>
                                <button onClick={() => handleDelete(utilisateur.id_utilisateur)}
                                    className="font-medium text-red-500 hover:underline">
                                    <i className="fi fi-sr-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableauUtilisateur;