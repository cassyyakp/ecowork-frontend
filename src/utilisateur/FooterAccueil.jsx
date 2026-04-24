
function FooterAccueil() {
    return (
        <footer className="border-t-2 border-[#B2F7EF] px-8 py-10 mt-10 bg-[#EFF7F6]  ">


            <div className="flex justify-between items-start flex-wrap gap-8">

                <div className="max-w-xs">
                    <img src="/images/logo-ecowork.png" alt="logo" className="w-24 mb-3" />
                    <p className="text-sm text-[#888] ">
                        EcoWork est né de l'initiative GreenSpace, une entreprise engagée
                        pour des espaces de travail modernes et éco-responsables.
                    </p>
                </div>

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

                <div>
                    <h4 className="font-bold text-[#3a3a3a] text-sm mb-3">
                        Contact
                    </h4>
                    <ul className="space-y-2 text-sm text-[#888]">
                        <li>
                            <i class="fi fi-ss-map-marker text-red-500"> </i>
                            Paris 11e, France
                        </li>
                        <li>
                            <i class="fi fi-sr-envelope text-purple-500"> </i>
                            contact@ecowork.fr
                        </li>
                        <li>
                            <i class="fi fi-sr-phone-call text-green-500"> </i>
                            +33 1 00 00 00 00
                        </li>
                    </ul>
                </div>

            </div>

            <div className="border-t border-[#B2F7EF] mt-8 pt-6 text-center text-xs text-[#888]">
                © 2026 EcoWork — GreenSpace. Tous droits réservés.
            </div>
        </footer>
    );
}

export default FooterAccueil;