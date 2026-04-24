import { useNavigate } from 'react-router-dom';

function BoutonBanner() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/register')}
                className="mt-6 px-6 py-3 rounded-xl font-semibold text-sm bg-[#F7D6E0] ">
                Inscrivez-vous maintenant !
            </button>
        </div>
    )

}

export default BoutonBanner;