import LayoutBanner from "./banner/LayoutBanner";
import ListeEspaces from "./sectionEspace/ListeEpaces";
import TypeEspaceSection from "./typesespace/TypeEspaceSection";


export default function Accueil() {
    return (
        <div>
            <LayoutBanner />
            <TypeEspaceSection />
            <ListeEspaces />
        </div>
    );
}