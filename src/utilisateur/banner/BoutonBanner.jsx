import { useNavigate } from 'react-router-dom';

function BoutonBanner() {
    const navigate = useNavigate();

    const handleClick = () => {
        if (localStorage.getItem("token")) {
            navigate('/reservations');
        } else {
            navigate('/AuthPage');
        }
    };

    return (
        <div>
            <button onClick={handleClick}
                className="mt-6 px-6 py-3 rounded-xl font-semibold text-sm bg-[#F7D6E0] ">
                Réservez dès maintenant !
            </button>
        </div>
    )
}

export default BoutonBanner;