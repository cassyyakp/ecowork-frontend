import { useState } from "react";
import BoutonAjoutEquipement from "./BoutonAjoutEquipement";
import TableauEquipement from "./TableauEquipement";
import SearchEquipement from "./SearchEquipement";

function LayoutEquipement() {
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl lg:text-3xl text-font">
          LISTE DES ÉQUIPEMENTS
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SearchEquipement value={search} onChange={setSearch} />
        <BoutonAjoutEquipement />
      </div>
      <TableauEquipement
        refresh={refresh}
        setRefresh={setRefresh}
        search={search}
      />
    </div>
  );
}

export default LayoutEquipement;
