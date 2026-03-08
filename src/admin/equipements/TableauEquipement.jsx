import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TableauEquipement({ refresh }) {
    const navigate = useNavigate();
    const [equipements, setEquipements] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchEquipements = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/equipementsalles", {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();
                setEquipements(data.data || data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEquipements();
    }, [refresh]);

    const handleDelete = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet équipement ?")) return;
        try {
            await fetch(`http://localhost:8000/api/equipementsalles/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setEquipements(equipements.filter(e => e.id_equipement !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-4">
            <table className="w-full text-sm text-left text-body">
                <thead className="text-sm bg-[#F7D6E0] border-b border-default-medium">
                    <tr>
                        <th className="px-6 py-3 font-medium">N°</th>
                        <th className="px-6 py-3 font-medium">Nom</th>
                        <th className="px-6 py-3 font-medium">Nombre</th>
                        <th className="px-6 py-3 font-medium">Espace</th>
                        <th className="px-6 py-3 font-medium"></th>
                    </tr>
                </thead>
                <tbody className="bg-[#EFF7F6]">
                    {loading && (
                        <tr>
                            <td colSpan="5" className="text-center py-6 text-gray-400">
                                Chargement...
                            </td>
                        </tr>
                    )}
                    {!loading && equipements.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-6 text-gray-400">
                                Aucun équipement trouvé
                            </td>
                        </tr>
                    )}
                    {equipements.map((equipement, index) => (
                        <tr key={equipement.id_equipement}
                            className="border-b border-default">
                            <td className="px-6 py-4 font-medium">{index + 1}</td>
                            <td className="px-6 py-4">{equipement.nom}</td>
                            <td className="px-6 py-4">{equipement.nombre}</td>
                            <td className="px-6 py-4">{equipement.espace?.nom || '-'}</td>
                            <td className="px-6 py-4 flex gap-4">
                                <button onClick={() => navigate(`/admin/equipements/${equipement.id_equipement}`)}>
                                    <i className="fi fi-ss-eye text-purple-500"></i>
                                </button>
                                <button onClick={() => navigate(`/admin/equipements/${equipement.id_equipement}/edit`)}>
                                    <i className="fi fi-ss-pencil text-green-500"></i>
                                </button>
                                <button onClick={() => handleDelete(equipement.id_equipement)}>
                                    <i className="fi fi-ss-trash text-red-500"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableauEquipement;