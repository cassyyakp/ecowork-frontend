import { useState } from "react";
import LayoutBouttonReservation from "./LayoutBouttonReservation";
import ReservationListe from "./ReservationListe";

export default function ReservationLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <LayoutBouttonReservation onSearch={setSearch} />
      <ReservationListe search={search} />
    </div>
  );
}