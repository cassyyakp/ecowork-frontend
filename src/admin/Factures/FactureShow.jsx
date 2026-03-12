import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";

function FactureShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facture, setFacture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacture = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/factures/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          },
        );
        const data = await response.json();
        setFacture(Array.isArray(data.data) ? data.data[0] : data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacture();
  }, [id]);

  const formatPrix = (prix) => {
    return parseFloat(prix)
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
      doc.setTextColor(40, 40, 40);
      doc.setFont("helvetica", "bold");
      doc.text("FACTURE", pageWidth / 2, 20, { align: "center" });

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`N° ${facture.id_facture}`, pageWidth / 2, 28, {
        align: "center",
      });

      doc.setDrawColor(178, 247, 239);
      doc.setLineWidth(0.5);
      doc.line(14, 36, pageWidth - 14, 36);

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("EcoWork", 14, 46);
      doc.text("Abidjan, Côte d'Ivoire", 14, 52);
      doc.text("contact@ecowork.ci", 14, 58);

      doc.text(`Date : ${facture.date}`, pageWidth - 14, 46, {
        align: "right",
      });
      doc.text(`Créé le : ${facture.created_at}`, pageWidth - 14, 52, {
        align: "right",
      });

      doc.line(14, 66, pageWidth - 14, 66);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text("Détails de la réservation", 14, 76);

      const rows = [
        ["Utilisateur", facture.utilisateur ?? "-"],
        ["Espace réservé", facture.espace ?? "-"],
        ["Date début", facture.date_debut_reservation ?? "-"],
        ["Date fin", facture.date_fin_reservation ?? "-"],
        ["Prix total", `${formatPrix(facture.prix_total)} FCFA`],
        [
          "Statut paiement",
          facture.facture_acquittee ? "Acquittée" : "Non acquittée",
        ],
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
        `TOTAL : ${formatPrix(facture.prix_total)} FCFA`,
        pageWidth - 14,
        y + 14,
        { align: "right" },
      );

      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(150, 150, 150);
      doc.text(
        "Merci pour votre confiance — EcoWork",
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" },
      );

      doc.save(`facture-${facture.id_facture}-${facture.utilisateur}.pdf`);
    };
  };

  if (loading) return <p className="text-sm text-gray-400">Chargement...</p>;
  if (!facture)
    return <p className="text-sm text-gray-400">Facture introuvable.</p>;

  return (
    <div className="max-w-lg mx-auto bg-[#EFF7F6] p-10 rounded-2xl shadow-sm border border-[#B2F7EF]">
      <h2 className="text-xl font-bold text-[#3a3a3a] mb-6">Détail facture</h2>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">N° Facture</span>
          <span className="text-sm font-medium text-[#3a3a3a]">
            #{facture.id_facture}
          </span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">Date</span>
          <span className="text-sm font-medium text-[#3a3a3a]">
            {facture.date}
          </span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">Utilisateur</span>
          <span className="text-sm font-medium text-[#3a3a3a]">
            {facture.utilisateur}
          </span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">Espace</span>
          <span className="text-sm font-medium text-[#3a3a3a]">
            {facture.espace}
          </span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">Date début</span>
          <span className="text-sm font-medium text-[#3a3a3a]">
            {facture.date_debut_reservation}
          </span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">Date fin</span>
          <span className="text-sm font-medium text-[#3a3a3a]">
            {facture.date_fin_reservation}
          </span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">Prix total</span>
          <span className="text-sm font-medium text-[#3a3a3a]">
            {facture.prix_total} FCFA
          </span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">Facture acquittée</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              facture.facture_acquittee
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-500"
            }`}
          >
            {facture.facture_acquittee ? "Oui" : "Non"}
          </span>
        </div>
        <div className="flex justify-between border-b border-[#B2F7EF] pb-3">
          <span className="text-sm text-gray-400">Créé le</span>
          <span className="text-sm font-medium text-[#3a3a3a]">
            {facture.created_at}
          </span>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={() => navigate("/admin/factures")}
          className="flex-1 py-3 rounded-xl text-sm font-medium border-2 border-[#B2F7EF] text-[#3a3a3a] hover:bg-[#B2F7EF] transition-all"
        >
          Retour
        </button>
        <button
          onClick={generatePDF}
          className="flex-1 py-3 rounded-xl text-sm font-semibold bg-[#7BDFF2] text-white hover:bg-cyan-400 transition-all"
        >
          Télécharger PDF
        </button>
      </div>
    </div>
  );
}

export default FactureShow;
