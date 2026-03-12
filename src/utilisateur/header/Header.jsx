import { useState } from "react";
import { Link } from "react-router-dom";
import ProfilDropdown from "./ProfilDropdwon";
import { useLowCarbon } from "../../context/useLowCarbon";

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { lowCarbon, toggle } = useLowCarbon();

    return (
        <header className="w-full bg-white border-b border-[#B2F7EF] px-8 py-4 flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center">
                <img
                    src="/images/logo-ecowork.png"
                    alt="logo-ecowork"
                    className="h-12 object-contain"
                />
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-8">
                <Link to="/accueil"
                    className="text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all">
                    Accueil
                </Link>
                <Link to="/espaces"
                    className="text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all">
                    Espaces
                </Link>
                <Link to="/reservations"
                    className="text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all">
                    Réservations
                </Link>
                <Link to="/factures"
                    className="text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all">
                    Factures
                </Link>
            </nav>

            {/* LowCarbon */}
            <button
                onClick={toggle}
                className="px-3 py-1 rounded-full text-xs font-medium border-2"
                style={{
                    backgroundColor: lowCarbon ? '#3a3a3a' : '#EFF7F6',
                    color: lowCarbon ? '#fff' : '#3a3a3a',
                    borderColor: '#B2F7EF'
                }}>
                {lowCarbon ? '🌿 Low Carbon ON' : '🌿 Low Carbon'}
            </button>

            {/* Profil */}
            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-[#EFF7F6] transition-all">
                    <div className="w-9 h-9 rounded-full bg-[#7BDFF2] flex items-center justify-center">
                        👤
                    </div>
                    <span className="text-xs text-gray-400">▼</span>
                </button>

                {dropdownOpen && (
                    <ProfilDropdown onClose={() => setDropdownOpen(false)} />
                )}
            </div>

        </header>
    );
}

export default Header;