import BoutonBanner from "./BoutonBanner";
import ImageBanner from "./ImageBanner";
import TextBanner from "./TextBanner";


function LayoutBanner() {

    return (
        <>

            <ImageBanner />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center  w-full h-[500px]">
                <TextBanner />
                <BoutonBanner />
            </div>
        </>
    )
}

export default LayoutBanner;