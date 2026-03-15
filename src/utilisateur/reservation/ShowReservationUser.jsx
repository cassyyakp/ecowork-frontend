import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";

function ShowReservationUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/reservations/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
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
    return parseFloat(prix).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const logo = new Image();
    logo.src = "/images/logo-ecowork.png";
    logo.onload = () => {
      doc.addImage(logo, "PNG", 14, 10, 40, 20);

      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.setFont("helvetica", "bold");
      doc.text("FACTURE", pageWidth / 2, 20, { align: "center" });

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`Réservation N° ${reservation.id_reservation}`, pageWidth / 2, 28, { align: "center" });

      doc.setDrawColor(178, 247, 239);
      doc.setLineWidth(0.5);
      doc.line(14, 36, pageWidth - 14, 36);

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("EcoWork", 14, 46);
      doc.text("Abidjan, Côte d'Ivoire", 14, 52);
      doc.text("contact@ecowork.ci", 14, 58);

      doc.text(`Créé le : ${reservation.created_at}`, pageWidth - 14, 46, { align: "right" });

      doc.line(14, 66, pageWidth - 14, 66);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text("Détails de la réservation", 14, 76);

      const rows = [
        ["Utilisateur", reservation.utilisateur ?? "-"],
        ["Espace réservé", reservation.espace ?? "-"],
        ["Date début", reservation.date_debut_reservation ?? "-"],
        ["Date fin", reservation.date_fin_reservation ?? "-"],
        ["Prix total", `${formatPrix(reservation.prix_total)} €`],
        ["Statut paiement", reservation.facture_acquittee ? "Acquittée" : "Non acquittée"],
      ];

      let y = 86;
      rows.forEach(([label, value], index) => {
        const bg = index % 2 === 0 ? [239, 247, 246] : [255, 255, 255];
        doc.setFillColor(...bg);
        doc.rect(14, y - 5, pageWidth - 28, 10, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(label, 18, y);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(40, 40, 40);
        doc.text(String(value), pageWidth - 18, y, { align: "right" });

        y += 12;
      });

      doc.setDrawColor(178, 247, 239);
      doc.line(14, y + 4, pageWidth - 14, y + 4);

      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(123, 223, 242);
      doc.text(
        `TOTAL : ${formatPrix(reservation.prix_total)} €`,
        pageWidth - 14,
        y + 14,
        { align: "right" }
      );

      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(150, 150, 150);
      doc.text(
        "Merci pour votre confiance — EcoWork",
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );

      doc.save(`reservation-${reservation.id_reservation}-${reservation.utilisateur}.pdf`);
    };
  };

  if (loading) return <p className="text-sm text-gray-400 text-center mt-20">Chargement...</p>;
  if (!reservation) return <p className="text-sm text-gray-400 text-center mt-20">Réservation introuvable.</p>;

  return (
    <div className="max-w-lg mx-auto py-10 px-6">
      <div className="bg-[#EFF7F6] p-10 rounded-2xl shadow-sm border border-[#B2F7EF]">
        <h2 className="text-xl font-bold text-[#3a3a3a] mb-6">Détail réservation</h2>

        {reservation.photo_espace ? (
          <img
            src={reservation.photo_espace}
            alt={reservation.espace}
            className="w-full h-48 object-cover rounded-2xl mb-6"
          />
        ) : (
          <div className="w-full h-48 bg-[#B2F7EF] rounded-2xl mb-6 flex items-center justify-center text-gray-400 text-sm">
            Aucune photo
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Espace</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{reservation.espace}</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Date début</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{reservation.date_debut_reservation}</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Date fin</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{reservation.date_fin_reservation}</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Prix total</span>
            <span className="text-sm font-bold text-[#7BDFF2]">{formatPrix(reservation.prix_total)} €</span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Statut</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              reservation.facture_acquittee
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}>
              {reservation.facture_acquittee ? "Payée" : "Non payée"}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
            <span className="text-sm text-gray-400">Créé le</span>
            <span className="text-sm font-medium text-[#3a3a3a]">{reservation.created_at}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => navigate("/reservations")}
            className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
          >
            Retour
          </button>
          <button
            onClick={generatePDF}
            className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
          >
            Télécharger facture
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowReservationUser;