import { useState } from "react";
import LayoutBouttonFacture from "./LayoutBouttonFacture";
import FactureListe from "./FactureListe";

function FactureLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl lg:text-3xl text-font">LISTE DES FACTURES</h1>
      <LayoutBouttonFacture onSearch={setSearch} />
      <FactureListe search={search} />
    </div>
  );
}

export default FactureLayout;