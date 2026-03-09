import LayoutBanner from "./banner/LayoutBanner";
import TypeEspaceSection from "./typesespace/TypeEspaceSection";


export default function Accueil() {
    return (
        <div>
            <LayoutBanner />
            <TypeEspaceSection/>
        </div>
    );
}