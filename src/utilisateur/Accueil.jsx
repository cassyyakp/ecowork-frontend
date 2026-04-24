import LayoutBanner from "./banner/LayoutBanner";
import ListeEspaces from "./sectionEspace/ListeEpaces";
import ListeTemoignages from "./temoignage/ListeTemoignages";
import TypeEspaceSection from "./typesespace/TypeEspaceSection";
import FooterAccueil from "./FooterAccueil";


export default function Accueil() {
    return (
        <div>
            <LayoutBanner />
            <TypeEspaceSection />
            <ListeEspaces />
            <ListeTemoignages />
            <FooterAccueil />
        </div>
    );
}