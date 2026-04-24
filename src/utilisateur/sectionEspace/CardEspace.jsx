import { useNavigate } from 'react-router-dom';
import API_URL from '../../config';

function CardEspace({ espace }) {
    const navigate = useNavigate();

    return (
        <div className="border-2 border-[#F7D6E0] rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate(`/register`)}>
    
            <div style={{ backgroundColor: '#B2F7EF' }} className="h-48">
                <img
                    src={`${API_URL}/storage/${espace.photo_salle}`}
                    alt={espace.nom}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <h3 className="font-bold text-base text-[#3a3a3a]">
                    {espace.nom}
                </h3>
                <p className="text-xs mt-1 text-[#888] ">
                    {espace.surface} m²
                </p>
                <div className="flex justify-between items-center mt-4">
                    <p className="font-bold text-sm text-[#7BDFF2] ">
                        {parseFloat(espace.prix_journalier).toLocaleString()} € 
                        <span className="text-xs text-gray-400"> / jour</span>
                    </p>
                    <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F7D6E0] text-[#3a3a3a] ">
                        Détails
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardEspace;