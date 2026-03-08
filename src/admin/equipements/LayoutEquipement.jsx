import { useState } from "react";
import BoutonAjoutEquipement from "./BoutonAjoutEquipement";
import TableauEquipement from "./TableauEquipement";
import SearchEquipement from "./SearchEquipement";

function LayoutEquipement() {
    const [refresh, setRefresh] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-end">
                <h1 className="text-3xl text-font">LISTE DES ÉQUIPEMENTS</h1>
            </div>

            <div className="flex justify-between items-center">
                <SearchEquipement/>
                <BoutonAjoutEquipement />
            </div>

            <TableauEquipement refresh={refresh} setRefresh={setRefresh} />
        </div>
    );
}

export default LayoutEquipement;