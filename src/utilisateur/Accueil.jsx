import { useState } from "react";
import LayoutBanner from "./banner/LayoutBanner";
import ListeEspaces from "./sectionEspace/ListeEpaces";
import ListeTemoignages from "./temoignage/ListeTemoignages";
import TypeEspaceSection from "./typesespace/TypeEspaceSection";
import FooterAccueil from "./FooterAccueil";

export default function Accueil() {
    const [filtreType, setFiltreType] = useState(null);

    return (
        <div>
            <LayoutBanner />
            <TypeEspaceSection onSelect={setFiltreType} active={filtreType} />
            <ListeEspaces filtreType={filtreType} />
            <ListeTemoignages />
            <FooterAccueil />
        </div>
    );
}