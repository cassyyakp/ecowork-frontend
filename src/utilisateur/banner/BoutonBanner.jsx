import { useNavigate } from 'react-router-dom';

function BoutonBanner() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/espaces')}
                className="mt-6 px-6 py-3 rounded-xl font-semibold text-sm bg-[#F7D6E0] ">
                Réservez dès maintentant
            </button>
        </div>
    )

}

export default BoutonBanner;