import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ShowEquipement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [equipement, setEquipement] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEquipement = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/equipementsalles/${id}`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();
                setEquipement(data.data || data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEquipement();
    }, [id]);

    if (loading) return <p className="text-center mt-10 text-gray-400">Chargement...</p>;
    if (!equipement) return <p className="text-center mt-10 text-gray-400">Équipement introuvable</p>;

    return (
        <>
            <h1 className="text-font text-center mt-2 text-3xl">DÉTAIL ÉQUIPEMENT</h1>

            <div className="max-w-lg mx-auto mt-10 bg-[#EFF7F6] border border-[#B2F7EF] rounded-2xl p-6 space-y-4">
                <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
                    <span className="font-medium text-gray-500">Nom</span>
                    <span>{equipement.nom}</span>
                </div>
                <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
                    <span className="font-medium text-gray-500">Nombre</span>
                    <span>{equipement.nombre}</span>
                </div>
                <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
                    <span className="font-medium text-gray-500">Espace</span>
                    <span>{equipement.espace?.nom || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
                    <span className="font-medium text-gray-500">Créé le</span>
                    <span>{equipement.created_at}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-500">Modifié le</span>
                    <span>{equipement.updated_at}</span>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => navigate(`/admin/equipements/${id}/edit`)}
                        style={{ backgroundColor: '#7BDFF2', color: '#3a3a3a' }}
                        className="flex-1 py-2 rounded-xl font-medium text-sm">
                        Modifier
                    </button>
                    <button
                        onClick={() => navigate('/admin/equipements')}
                        style={{ borderColor: '#B2F7EF' }}
                        className="flex-1 py-2 rounded-xl font-medium text-sm border-2">
                        Retour
                    </button>
                </div>
            </div>
        </>
    );
}

export default ShowEquipement;