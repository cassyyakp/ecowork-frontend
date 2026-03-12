import { useState } from "react";
import { Link } from "react-router-dom";
import ProfilDropdown from "./ProfilDropdwon";

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <Link
          to="/accueil"
          className="text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all"
        >
          Accueil
        </Link>
        <Link
          to="/espaces"
          className="text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all"
        >
          Espaces
        </Link>
        <Link
          to="/reservations"
          className="text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all"
        >
          Réservations
        </Link>

      </nav>

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