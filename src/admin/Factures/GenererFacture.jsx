import jsPDF from "jspdf";

const genererfacture = (facture) => {
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
    doc.text(`N° ${facture.id_facture}`, pageWidth / 2, 28, { align: "center" });

    doc.setDrawColor(178, 247, 239);
    doc.setLineWidth(0.5);
    doc.line(14, 36, pageWidth - 14, 36);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("EcoWork", 14, 46);
    doc.text("Abidjan, Côte d'Ivoire", 14, 52);
    doc.text("contact@ecowork.ci", 14, 58);
    doc.text(`Date : ${facture.date}`, pageWidth - 14, 46, { align: "right" });
    doc.text(`Créé le : ${facture.created_at}`, pageWidth - 14, 52, { align: "right" });

    doc.line(14, 66, pageWidth - 14, 66);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Détails de la réservation", 14, 76);

    const formatPrix = (prix) =>
      parseFloat(prix).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    const rows = [
      ["Utilisateur", facture.utilisateur ?? "-"],
      ["Espace réservé", facture.espace ?? "-"],
      ["Date début", facture.date_debut_reservation ?? "-"],
      ["Date fin", facture.date_fin_reservation ?? "-"],
      ["Prix total", `${formatPrix(facture.prix_total)} €`],
      ["Statut paiement", facture.facture_acquittee ? "Acquittée" : "Non acquittée"],
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
    doc.text(`TOTAL : ${formatPrix(facture.prix_total)} €`, pageWidth - 14, y + 14, { align: "right" });

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.text("Merci pour votre confiance — EcoWork", pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });

    doc.save(`facture-${facture.id_facture}-${facture.utilisateur}.pdf`);
  };
};

export default genererfacture;