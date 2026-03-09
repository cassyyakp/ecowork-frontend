
function Footer() {
    return (
        <footer className="border-t-2 border-[#B2F7EF] px-8 py-10 mt-10 bg-[#EFF7F6]  ">


            <div className="flex justify-between items-start flex-wrap gap-8">

                {/* Logo + description */}
                <div className="max-w-xs">
                    <img src="/images/logo-ecowork.png" alt="logo" className="w-24 mb-3" />
                    <p className="text-sm text-[#888] ">
                        EcoWork est né de l'initiative GreenSpace, une entreprise engagée 
                        pour des espaces de travail modernes et éco-responsables.
                    </p>
                </div>

                {/* Liens */}
                <div>
                    <h4 className="font-bold text-[#3a3a3a] text-sm mb-3">
                        Navigation
                    </h4>
                    <ul className="space-y-2 text-sm text-[#888] ">
                        <li><a href="/accueil" className="hover:text-[#7BDFF2]">Accueil</a></li>
                        <li><a href="/salles" className="hover:text-[#7BDFF2]">Nos espaces</a></li>
                        <li><a href="/reservations" className="hover:text-[#7BDFF2]">Réservations</a></li>
                        <li><a href="/profil" className="hover:text-[#7BDFF2]">Mon profil</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-bold text-[#3a3a3a] text-sm mb-3">
                        Contact
                    </h4>
                    <ul className="space-y-2 text-sm text-[#888]">
                        <li>📍 Paris 11e, France</li>
                        <li>📧 contact@ecowork.fr</li>
                        <li>📞 +33 1 00 00 00 00</li>
                    </ul>
                </div>

            </div>

            {/* Bas du footer */}
            <div className="border-t border-[#B2F7EF] mt-8 pt-6 text-center text-xs text-[#888]">
                © 2026 EcoWork — GreenSpace. Tous droits réservés.
            </div>
        </footer>
    );
}

export default Footer;