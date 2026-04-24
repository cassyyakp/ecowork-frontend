import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";

function ShowReservationUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/reservations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );

        const data = await response.json();

        // 🔥 sécurité : empêcher accès autre user
        if (
          user &&
          data.data &&
          Number(data.data.id_utilisateur) !== Number(user.id_utilisateur)
        ) {
          setReservation(null);
          return;
        }

        setReservation(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const formatPrix = (prix) => {
    return parseFloat(prix || 0)
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const logo = new Image();
    logo.src = "/images/logo-ecowork.png";

    logo.onload = () => {
      doc.addImage(logo, "PNG", 14, 10, 40, 20);

      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("FACTURE", pageWidth / 2, 20, { align: "center" });

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Réservation N° ${reservation.id_reservation}`,
        pageWidth / 2,
        28,
        { align: "center" },
      );

      doc.line(14, 36, pageWidth - 14, 36);

      const rows = [
        ["Utilisateur", reservation.utilisateur ?? "—"],
        ["Espace(s)", reservation.espaces?.map((e) => e.nom).join(", ") || "—"],
        ["Début", reservation.date_debut_reservation ?? "—"],
        ["Fin", reservation.date_fin_reservation ?? "—"],
        ["Frais", `${formatPrix(reservation.frais_reservation)} €`],
        ["Total", `${formatPrix(reservation.prix_total_reservation)} €`],
        ["Statut", reservation.statut_reservation ?? "—"],
      ];

      let y = 75;

      rows.forEach(([label, value]) => {
        doc.setFont("helvetica", "bold");
        doc.text(label, 14, y);

        doc.setFont("helvetica", "normal");
        doc.text(String(value), pageWidth - 14, y, { align: "right" });

        y += 10;
      });

      doc.save(`reservation-${reservation.id_reservation}.pdf`);
    };
  };

  if (loading)
    return (
      <p className="text-sm text-gray-400 text-center mt-20">Chargement...</p>
    );

  if (!reservation)
    return (
      <p className="text-sm text-gray-400 text-center mt-20">
        Réservation introuvable.
      </p>
    );

  return (
    <div className="max-w-lg mx-auto py-10 px-6">
      <div className="bg-[#EFF7F6] p-8 rounded-2xl shadow-sm border border-[#B2F7EF]">
        <h2 className="text-xl font-bold text-[#3a3a3a] mb-6">
          Détail réservation
        </h2>

    
        {reservation.espaces?.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto mb-6">
            {reservation.espaces.map((espace) => (
              <img
                key={espace.id_espace}
                src={espace.photo_salle || "/placeholder.jpg"}
                alt={espace.nom}
                className="w-32 h-24 object-cover rounded-xl flex-shrink-0"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-48 bg-[#B2F7EF] rounded-2xl mb-6 flex items-center justify-center text-gray-400 text-sm">
            Aucune image
          </div>
        )}

  
        <div className="flex flex-col gap-4">
          <div className="flex justify-between border-b pb-3">
            <span className="text-sm text-gray-400">Espace(s)</span>
            <span className="text-sm font-medium text-[#3a3a3a]">
              {reservation.espaces?.map((e) => e.nom).join(", ") || "—"}
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-sm text-gray-400">Début</span>
            <span>{reservation.date_debut_reservation}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-sm text-gray-400">Fin</span>
            <span>{reservation.date_fin_reservation}</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-sm text-gray-400">Frais</span>
            <span>{formatPrix(reservation.frais_reservation)} €</span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-sm text-gray-400">Total</span>
            <span className="font-bold text-[#7BDFF2]">
              {formatPrix(reservation.prix_total_reservation)} €
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span className="text-sm text-gray-400">Statut</span>
            <span className="text-sm font-medium">
              {reservation.statut_reservation}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => navigate("/reservations")}
            className="flex-1 py-3 rounded-xl border border-[#B2F7EF]"
          >
            Retour
          </button>

          <button
            onClick={generatePDF}
            className="flex-1 py-3 rounded-xl bg-[#7BDFF2] text-white"
          >
            Télécharger facture
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowReservationUser;
