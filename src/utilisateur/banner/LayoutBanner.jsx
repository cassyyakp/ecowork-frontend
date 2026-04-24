import BoutonBanner from "./BoutonBanner";
import ImageBanner from "./ImageBanner";
import TextBanner from "./TextBanner";


function LayoutBanner() {
    return (
        <div className="relative">
            <ImageBanner />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center">
                <TextBanner />
                <BoutonBanner />
            </div>
        </div>
    );
}

export default LayoutBanner;