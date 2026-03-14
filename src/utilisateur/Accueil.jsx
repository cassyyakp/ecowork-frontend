import LayoutBanner from "./banner/LayoutBanner";
import ListeEspaces from "./sectionEspace/ListeEpaces";
import ListeTemoignages from "./temoignage/ListeTemoignages";
import TypeEspaceSection from "./typesespace/TypeEspaceSection";


export default function Accueil() {
    return (
        <div>
            <LayoutBanner />
            <TypeEspaceSection />
            <ListeEspaces />
            <ListeTemoignages />
        </div>
    );
}