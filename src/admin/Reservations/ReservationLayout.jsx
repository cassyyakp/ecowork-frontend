import { useState } from "react";
import LayoutBouttonReservation from "./LayoutBouttonReservation";
import ReservationListe from "./ReservationListe";

export default function ReservationLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl lg:text-3xl font-semibold">Liste des réservations</h1>
      <LayoutBouttonReservation onSearch={setSearch} />
      <ReservationListe search={search} />
    </div>
  );
}
