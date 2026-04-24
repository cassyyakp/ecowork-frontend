function TextBanner() {
    return (
        <>
            <div>
                <div className="container mx-auto px-4 text-start">
                    <h1 className="text-[#B2F7EF] text-2xl sm:text-3xl lg:text-4xl font-bold">
                        Bienvenue sur EcoWork
                    </h1>
                    <p className="text-white text-base sm:text-lg mt-4 w-full lg:w-[50%]">
                        EcoWork est né de l'initiative GreenSpace, une entreprise engagée
                        pour des espaces de travail modernes et éco-responsables.
                        Nous mettons à votre disposition des salles de réunion,
                        bureaux privés et open spaces pensés pour votre productivité,
                        dans un cadre respectueux de l'environnement. <br />
                        Réservez votre espace de coworking idéal
                    </p>
                </div>
            </div>
        </>
    )
}

export default TextBanner;