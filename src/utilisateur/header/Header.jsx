import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilDropdown from "./ProfilDropdwon";
import { useLowCarbon } from "../../context/LowcarbonContext";
import { usePanier } from "../../context/PanierContext";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lowCarbon, toggle } = useLowCarbon();
  const { panier } = usePanier();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b border-[#B2F7EF] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/images/logo-ecowork.png"
            alt="logo-ecowork"
            className="h-10 object-contain"
          />
        </div>

        <nav className="hidden md:flex items-center gap-8">
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

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            title={lowCarbon ? "Mode normal" : "Mode low carbon"}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-[#B2F7EF] hover:bg-[#EFF7F6] transition-all"
          >
            <img
              src="/images/low-carbon.webp"
              alt="low carbon"
              className="w-4 h-4 object-contain"
            />
            <span className="hidden sm:inline">
              {lowCarbon ? "Mode normal" : "Low carbon"}
            </span>
          </button>

          {/* Panier */}
          <button
            onClick={() => navigate("/panier")}
            className="relative flex items-center px-3 py-2 rounded-xl hover:bg-[#EFF7F6] transition-all"
          >
            <span className="text-xl">🛒</span>
            {panier.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#7BDFF2] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {panier.length}
              </span>
            )}
          </button>

          {/* Profil */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#EFF7F6] transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-[#7BDFF2] flex items-center justify-center">
                <img src="/images/user.webp" alt="user" className="w-4 h-4" />
              </div>
              <span className="text-xs text-gray-400 hidden sm:inline">▼</span>
            </button>
            {dropdownOpen && (
              <ProfilDropdown onClose={() => setDropdownOpen(false)} />
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl border border-[#B2F7EF]"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-3 pt-4 border-t border-[#B2F7EF] mt-4">
          <Link
            to="/accueil"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all"
          >
            Accueil
          </Link>
          <Link
            to="/espaces"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all"
          >
            Espaces
          </Link>
          <Link
            to="/reservations"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all"
          >
            Réservations
          </Link>
          {/* Panier mobile */}
          <button
            onClick={() => {
              navigate("/panier");
              setMenuOpen(false);
            }}
            className="text-left text-sm font-medium text-[#3a3a3a] hover:text-[#7BDFF2] transition-all flex items-center gap-2"
          >
            🛒 Panier
            {panier.length > 0 && (
              <span className="bg-[#7BDFF2] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {panier.length}
              </span>
            )}
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
