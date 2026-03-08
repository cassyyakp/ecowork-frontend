import { useState } from "react";
import LayoutBoutton from "./LayoutBoutton";
import EspaceList from "./EspaceList";

 function EspaceLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Liste des Espaces</h1>
      <LayoutBoutton onSearch={setSearch} />
      <EspaceList search={search} />
    </div>
  );
}

export default EspaceLayout;