import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { addPageHeader, safeGetValue } from "@/utils/pdfUtils";

const PDFTemplate = ({ formData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    addPage1and2(doc, formData);
    
    doc.addPage();
    addPage3(doc, formData);
    
    doc.addPage();
    addPage4(doc, formData);

    doc.addPage();
    addPage5(doc, formData);

    doc.addPage();
    addPage6(doc, formData);

    addPageNumbers(doc);

    doc.save("bilan_prepa_competences.pdf");
  };

  return generatePDF;
};

const addPage1and2 = (doc: jsPDF, formData: never) => {
  doc.addImage('/logos/france_travail_logo.png', 'PNG', 10, 10, 40, 20);
  doc.addImage('/logos/afpa_logo.png', 'PNG', 160, 10, 40, 20);
  
  addPageHeader(doc, "BILAN « Prépa Compétences »");
  
  doc.autoTable({
    startY: 45,
    head: [['Centre AFPA de :', 'Agence France Travail de :']],
    body: [[formData.centreAFPA, formData.agenceFranceTravail]],
  });

};

const addPage3 = (doc: jsPDF, formData: any) => {
  addPageHeader(doc, "PHASE 1 : Confirmer son projet");

  const atelier1 = safeGetValue(formData, 'phase1.atelier1', {});
  doc.autoTable({
    startY: 30,
    head: [['Du', 'au', 'Heures', 'Ce que je retiens']],
    body: [[
      atelier1.dateDebut || '',
      atelier1.dateFin || '',
      atelier1.heures || '',
      atelier1.ceQueJeRetiens || ''
    ]],
  });
};

const addPage4 = (doc: jsPDF, formData: any) => {
  addPageHeader(doc, "PHASE 2 : Découvrir, pratiquer et faire son choix");

  const ateliers = [2, 9, 10];
  let startY = 30;

  ateliers.forEach((atelierNumber) => {
    const atelier = safeGetValue(formData, `phase2.atelier${atelierNumber}`, {});
    doc.text(`Atelier ${atelierNumber}`, 10, startY);
    doc.autoTable({
      startY: startY + 5,
      head: [['Métier découvert', 'Du', 'au', 'Heures']],
      body: [[
        atelier.metier || '',
        atelier.dateDebut || '',
        atelier.dateFin || '',
        atelier.heures || ''
      ]],
    });
    startY = doc.lastAutoTable.finalY + 10;
  });
};

const addPage5 = (doc: jsPDF, formData: any) => {
  addPageHeader(doc, "PHASE 3 : Ateliers complémentaires d'entraînement et d'accompagnement");

  const ateliers = [3, 4, 5, 8];
  let startY = 30;

  ateliers.forEach((atelierNumber) => {
    const atelier = safeGetValue(formData, `phase3.atelier${atelierNumber}`, {});
    doc.text(`Atelier ${atelierNumber}`, 10, startY);
    doc.autoTable({
      startY: startY + 5,
      head: [['Du', 'au', 'Heures', 'Ce que je retiens']],
      body: [[
        atelier.dateDebut || '',
        atelier.dateFin || '',
        atelier.heures || '',
        atelier.ceQueJeRetiens || ''
      ]],
    });
    startY = doc.lastAutoTable.finalY + 10;
  });
};

const addPage6 = (doc: jsPDF, formData: any) => {
  addPageHeader(doc, "PHASE 4 : Concrétiser son projet");

  const atelier6 = safeGetValue(formData, 'phase4.atelier6', {});
  doc.autoTable({
    startY: 30,
    head: [['Du', 'au', 'Heures', 'Métier(s) visé(s)']],
    body: [[
      atelier6.dateDebut || '',
      atelier6.dateFin || '',
      atelier6.heures || '',
      atelier6.metierVise || ''
    ]],
  });

  // Add formations table
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Intitulé de la formation', 'Organisme de formation', 'Lieu de formation', "Date d'entrée en formation éventuelle"]],
    body: (atelier6.formations || []).map(f => [f.intitule || '', f.organisme || '', f.lieu || '', f.dateEntree || '']),
  });

  // Add competences developed
  doc.text("Compétences développées pendant Prépa compétences :", 10, doc.lastAutoTable.finalY + 20);
  const competences = Object.entries(safeGetValue(formData, 'phase4.competencesDeveloppees', {}))
    .filter(([, value]) => value)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 25,
    head: [['Compétences']],
    body: competences.map(c => [c]),
  });
};

const addPageNumbers = (doc: jsPDF) => {
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} / ${pageCount}`, 10, doc.internal.pageSize.height - 10);
  }
};

export default PDFTemplate;