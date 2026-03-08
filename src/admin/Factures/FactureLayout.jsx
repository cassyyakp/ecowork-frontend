import { useState } from "react";
import LayoutBouttonFacture from "./LayoutBouttonFacture";
import FactureListe from "./FactureListe";

function FactureLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <LayoutBouttonFacture onSearch={setSearch} />
      <FactureListe search={search} />
    </div>
  );
}

export default FactureLayout;