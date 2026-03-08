import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditEquipement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [espaces, setEspaces] = useState([]);
    const [formData, setFormData] = useState({
        nom: '',
        nombre: '',
        id_espace: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resEquipement, resEspaces] = await Promise.all([
                    fetch(`http://localhost:8000/api/equipementsalles/${id}`, {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }),
                    fetch("http://localhost:8000/api/espaces", {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }),
                ]);
                const dataEquipement = await resEquipement.json();
                const dataEspaces = await resEspaces.json();
                const e = dataEquipement.data || dataEquipement;
                setFormData({
                    nom: e.nom || '',
                    nombre: e.nombre || '',
                    id_espace: e.id_espace || '',
                });
                setEspaces(dataEspaces.data || dataEspaces);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            await fetch(`http://localhost:8000/api/equipementsalles/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });
            navigate("/admin/equipements");
        } catch (err) {
            console.log(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="text-center mt-10 text-gray-400">Chargement...</p>;

    return (
        <div className="flex items-center min-h-screen justify-center p-6">
            <div className="w-full bg-[#EFF7F6] p-10 max-w-md rounded-xl">
                <div className="text-center mb-10">
                    <p className="text-2xl font-bold text-[#3a3a3a]">MODIFIER L'ÉQUIPEMENT</p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-[#3a3a3a] font-medium mb-1">Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white border-[#B2F7EF]"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-[#3a3a3a] font-medium mb-1">Nombre</label>
                    <input
                        type="number"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white border-[#B2F7EF]"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm text-[#3a3a3a] font-medium mb-1">Espace</label>
                    <select
                        name="id_espace"
                        value={formData.id_espace}
                        onChange={handleChange}
                        className="w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 bg-white border-[#B2F7EF]">
                        <option value="">Sélectionner un espace</option>
                        {espaces.map(espace => (
                            <option key={espace.id_espace} value={espace.id_espace}>
                                {espace.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="flex-1 font-semibold py-3 rounded-xl text-sm bg-[#7BDFF2] disabled:opacity-50">
                        {saving ? "Enregistrement..." : "Modifier"}
                    </button>
                    <button
                        onClick={() => navigate("/admin/equipements")}
                        style={{ borderColor: '#B2F7EF' }}
                        className="flex-1 py-3 rounded-xl text-sm border-2">
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditEquipement;