import CardTemoignage from './CardTemoignage';

const temoignages = [
    {
        nom: "Sophie Martin",
        poste: "Freelance designer",
        photo: "👩",
        texte: "EcoWork a complètement changé ma façon de travailler. Les espaces sont modernes, calmes et inspirants. Je recommande vivement !",
        note: 5,
    },
    {
        nom: "Karim Diallo",
        poste: "Développeur web",
        photo: "👨",
        texte: "Un cadre de travail éco-responsable et bien équipé. La connexion internet est excellente et l'ambiance est très productive.",
        note: 5,
    },
    {
        nom: "Amina Koné",
        poste: "Chef de projet",
        photo: "👩",
        texte: "Les salles de réunion sont parfaites pour nos réunions d'équipe. Le personnel est accueillant et très professionnel.",
        note: 4,
    },
];

function ListeTemoignages() {
    return (
        <div className="py-16 px-8 bg-[#7BDFF2]">
            <div className="text-center mb-10">
                <p className="text-4xl text-[#EFF7F6] font-semibold mb-2">
                    Témoignages
                </p>
                <h2 className="text-3xl text-[#EFF7F6] font-bold">
                    Ce que disent nos membres
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {temoignages.map((t, index) => (
                    <CardTemoignage key={index} temoignage={t} />
                ))}
            </div>
        </div>
    );
}

export default ListeTemoignages;