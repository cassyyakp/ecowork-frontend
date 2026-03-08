import { useNavigate } from "react-router-dom";

function BoutonAjoutEquipement() {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/admin/equipements/create")}
            className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 bg-[#7BDFF2] text-[#3a3a3a]">
            <i className="fi fi-rr-add"></i>
            <span>Ajouter un équipement</span>
        </button>
    );
}

export default BoutonAjoutEquipement;