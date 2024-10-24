import jsPDF from "jspdf";
import 'jspdf-autotable';

const PDFTemplate = ({ formData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    addPage1(doc, formData);
    
    doc.addPage();
    addPage2(doc, formData);
    
    doc.addPage();
    addPage3(doc, formData);

    doc.addPage();
    addPage4(doc, formData);

    doc.addPage();
    addPage5(doc, formData);

    doc.addPage();
    addPage6(doc, formData);

    addPageNumbers(doc);

    const fileName = `bilan_prepa_competences_${formData.nomBeneficiaire}_${formData.prenomBeneficiaire}.pdf`;
    return { doc, fileName };
  };

  return generatePDF;
};

const addPage1 = (doc: jsPDF, formData: unknown) => {
  // Ajout logos
  doc.addImage('/logos/france_travail_logo.png', 'PNG', 10, 10, 40, 20);
  doc.addImage('/logos/afpa_logo.png', 'PNG', 160, 10, 40, 20);
  
  
  doc.setFont('Arial', 'normal');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(128, 100, 162);
  doc.rect(15, 40, 180, 10, 'F');
  doc.text("BILAN « Prépa Compétences »", 105, 47, { align: "center" });
  doc.setFont('Arial', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  
  // Add content for page 1
  doc.autoTable({
    body: [
      ['Centre AFPA de : ' + formData.centreAFPA, 'Agence France Travail de : '+ formData.agenceFranceTravail],
    ],
    startY: 60,   

  });


  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Nom du référent AFPA :', 'Nom du conseiller référent France Travail :']],
    body: [
      [`Téléphone : ${formData.telephoneReferentAFPA}`, `Téléphone : ${formData.telephoneConseillerFranceTravail}`],
      [`Mail : ${formData.mailReferentAFPA}`, `Mail : ${formData.mailConseillerFranceTravail}`],
      ['', `Nom du référent (autre que France Travail) qui suit le DE : ${formData.nomReferentAutre}`],
    ],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Le bénéficiaire :']],
    body: [
      [`Nom : ${formData.nomBeneficiaire}`],
      [`Prénom : ${formData.prenomBeneficiaire}`],
      [`Identifiant : ${formData.identifiantBeneficiaire}`],
      [`Téléphone : ${formData.telephoneBeneficiaire}`],
      [`Mail : ${formData.mailBeneficiaire}`],
    ],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Objectifs du bénéficiaire à l\'entrée dans le dispositif (prescription France Travail) :']],
    body: [[formData.objectifsBeneficiaire]],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Adhésion suite au premier entretien']],
    body: [
      [`OUI : ${formData.adhesion ? 'X' : ''}    NON : ${!formData.adhesion ? 'X' : ''}`],
      [`Date d'entrée dans le dispositif : ${formData.dateEntree}`],
    ],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Si non-adhésion, quel en est le motif ?']],
    body: [[formData.motifNonAdhesion]],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Métier(s) ou secteur(s) d\'activité ciblé(s)']],
    body: [[formData.metiersCibles]],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Signature du bénéficiaire :']],
    body: [['']],
    styles: { minCellHeight: 20 },
  });
};

const addPage2 = (doc: jsPDF, formData: any) => {
  const bilanSortie = formData.bilanSortie || {};

  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(128, 100, 162);
  doc.rect(0, 10, 210, 10, 'F');
  doc.text("Bilan de sortie", 105, 17, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  doc.autoTable({
    startY: 30,
    head: [['Date de réalisation du bilan :']],
    body: [[bilanSortie.dateBilan]],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Synthèse du parcours et plan d\'actions envisagé : (ce qui reste à faire pour concrétiser le projet)']],
    body: [[bilanSortie.syntheseParcours]],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['RDV pris avec FT le :']],
    body: [[bilanSortie.rdvFT]],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Points de vigilance : (ce qui pourrait gêner ou retarder le projet)']],
    body: [[bilanSortie.pointsVigilance]],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Commentaires du bénéficiaire :']],
    body: [[bilanSortie.commentairesBeneficiaire]],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Motif de sortie :']],
    body: [
      [`☐ Terme du dispositif (avec projet de formation ou de retour à l'emploi)`],
      [`    ○ Nécessité d'un suivi (Atelier Club Prepa)    ☐ oui    ☐ non`],
      [`    ○ Si oui, première date proposée (à confirmer) : ${bilanSortie.dateProposee}`],
      [`☐ Sortie anticipée positive (entrée en formation ou retour à l'emploi)`],
      [`    ○ Date de sortie : ${bilanSortie.dateSortie}`],
      [`    ○ Motif : ${bilanSortie.motifSortie}`],
      [`☐ Abandon`],
      [`    ○ Date d'abandon : ${bilanSortie.dateAbandon}`],
      [`    ○ Motif : ${bilanSortie.motifAbandon}`],
    ],
  });

  // Signature block
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 20,
    head: [['A', '']],
    body: [
      ['Le 10/10/2024', ''],
      ['Référent de parcours Afpa', 'Le bénéficiaire'],
      ['Nom, prénom :', `«Prénom» «Nom» ☐ J'autorise l'Afpa à transmettre`],
      ['Signature', 'ce bilan à mon conseiller référent Pôle emploi'],
      ['', 'Signature'],
    ],
    styles: { cellPadding: 2 },
    columnStyles: { 0: { cellWidth: 90 }, 1: { cellWidth: 90 } },
  });
};

const addPage3 = (doc: jsPDF, formData: any) => {
  const phase1 = formData.phase1 || {};

  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(128, 100, 162);
  doc.rect(0, 10, 210, 10, 'F');
  doc.text("Mon parcours « Prépa compétences »", 105, 17, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(128, 100, 162);
  doc.text("PHASE 1", 10, 30);
  doc.text("Co-construire son parcours", 10, 40);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Atelier 1 : Co-construire son parcours", 10, 50);
  doc.text(`Du «Date_de_début» au de 9h00 à 17h00`, 10, 60);

  // Checkboxes
  const checkboxes = [
    "Obtenir des informations contextualisées sur la formation (marché du travail...)",
    "Être au clair avec les objectifs de la formation",
    "Identifier les compétences au regard du métier visé",
    "Compléter le profil de compétences (disponible dans l'espace personnel candidat sur www.pole-emploi.fr)",
    "Repérer les prérequis à la formation et les besoins d'entraînement"
  ];

  checkboxes.forEach((text, index) => {
    doc.rect(10, 70 + index * 10, 5, 5);
    doc.text(text, 20, 74 + index * 10);
  });

  // Synthèse des activités
  doc.setFontSize(14);
  doc.setTextColor(128, 100, 162);
  doc.text("Synthèse des activités et positionnement faits à l'issue de l'AT1", 10, 130);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  const syntheseItems = [
    "Savoirs de bases pour le métier visé (expression orale et écrite, calculs professionnels, univers numérique) Préciser les acquis et les points à travailler :",
    "Compétences transversales nécessaires au métier visé (capacité à travailler en autonomie, à apprendre, à s'adapter, à travailler en équipe, à respecter les règles et consignes, ...) - Préciser les points forts et les points à faire évoluer :",
    "Besoins liés au projet - prérequis en termes de mobilité, disponibilité ou autre (âge, statut, ...) acquis et restants à acquérir :",
    "Savoir-faire transférables au métier visé ou première expérience dans le métier visé :",
    "Connaissance du métier    Oui ☐    Non ☐ (programmer at2 si nécessaire)",
    "Perception du marché du travail pour le métier visé (métier en tension, nombre d'offres, critères de recrutements, ...) - Préciser les points clés :",
    "Formation existante, identifiée, accessible, finançable ? (Voir les organismes identifiés en fin de bilan)"
  ];

  syntheseItems.forEach((item, index) => {
    doc.text("•", 10, 140 + index * 20);
    doc.text(item, 15, 140 + index * 20, { maxWidth: 180 });
  });

  // Autres commentaires
  doc.setFontSize(14);
  doc.setTextColor(128, 100, 162);
  doc.text("Autres commentaires du référent AFPA", 10, 280);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.rect(10, 285, 190, 30);

  doc.setFontSize(14);
  doc.setTextColor(128, 100, 162);
  doc.text("« Ce que je retiens de cette phase » (par le bénéficiaire)", 10, 325);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.rect(10, 330, 190, 30);
};

const addPage4 = (doc: jsPDF, formData: any) => {
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(128, 100, 162);
  doc.rect(0, 10, 210, 10, 'F');
  doc.text("PHASE 2", 105, 17, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(128, 100, 162);
  doc.text("Découvrir, pratiquer et faire son choix", 10, 30);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  // Atelier 2
  doc.text("Atelier 2 : Découvrir son métier et consolider son projet professionnel", 10, 40);
  doc.autoTable({
    startY: 45,
    head: [['Mise en situation', 'Je découvre le métier de :']],
    body: [
      ['Du', 'au', 'de', 'heures à', 'heures', 'Au moyen de :'],
      ['☐ Immersion (PMSMP)', 'Entreprise / structure d\'accueil :'],
      ['☐ Plateau technique', ''],
      ['☐ Autre : enquête métier/prépa recherche PMSMP', ''],
    ],
  });

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Choix du métier confirmé', '☐ oui', '☐ non', '☐ ne sait pas encore']],
    body: [['Compétences', '☐ acquises', '☐ en cours d\'acquisition', '☐ non acquises']],
  });

  // Commentaires du référent AFPA
  doc.text("Commentaires du référent AFPA", 10, doc.lastAutoTable.finalY + 20);
  doc.rect(10, doc.lastAutoTable.finalY + 25, 190, 30);

  // Ce que je retiens de cette phase
  doc.text("« Ce que je retiens de cette phase » (par le bénéficiaire)", 10, doc.lastAutoTable.finalY + 65);
  doc.rect(10, doc.lastAutoTable.finalY + 70, 190, 30);

  // Ateliers 9 et 10
  const ateliers = [
    { numero: 9, titre: "Se construire un territoire facilitant" },
    { numero: 10, titre: "Cartographier ses compétences" }
  ];

  let startY = doc.lastAutoTable.finalY + 110;

  ateliers.forEach(atelier => {
    doc.text(`Atelier ${atelier.numero} : ${atelier.titre}`, 10, startY);
    doc.autoTable({
      startY: startY + 5,
      head: [['Du', 'au', 'de', 'heures à', 'heures', 'Au moyen de :']],
      body: [['', '', '', '', '', '']],
    });

    doc.text("« Ce que je retiens de cette phase » (par le bénéficiaire)", 10, doc.lastAutoTable.finalY + 10);
    doc.rect(10, doc.lastAutoTable.finalY + 15, 190, 20);

    doc.text("Commentaires de l'intervenant AFPA", 10, doc.lastAutoTable.finalY + 45);
    doc.rect(10, doc.lastAutoTable.finalY + 50, 190, 20);

    startY = doc.lastAutoTable.finalY + 80;
  });
};

const addPage5 = (doc: jsPDF, formData: any) => {
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(128, 100, 162);
  doc.rect(0, 10, 210, 10, 'F');
  doc.text("PHASE 3", 105, 17, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(128, 100, 162);
  doc.text("Ateliers complémentaires d'entraînement et d'accompagnement", 10, 30);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  const ateliers = [
    { numero: 3, titre: "Renforcer ses compétences numériques" },
    { numero: 4, titre: "Développer ses compétences de bases" },
    { numero: 5, titre: "Sécuriser son parcours" },
    { numero: 8, titre: "Découvrir le CPF" }
  ];

  let startY = 40;

  ateliers.forEach(atelier => {
    doc.text(`Atelier ${atelier.numero} : ${atelier.titre}`, 10, startY);
    doc.autoTable({
      startY: startY + 5,
      head: [['Du', 'au', 'de', 'heures à', 'heures']],
      body: [['', '', '', '', '']],
    });

    doc.text("« Ce que je retiens de cette phase » (par le bénéficiaire)", 10, doc.lastAutoTable.finalY + 10);
    doc.rect(10, doc.lastAutoTable.finalY + 15, 190, 20);

    doc.text("Commentaires de l'intervenant AFPA", 10, doc.lastAutoTable.finalY + 45);
    doc.rect(10, doc.lastAutoTable.finalY + 50, 190, 20);

    startY = doc.lastAutoTable.finalY + 80;
  });
};

const addPage6 = (doc: jsPDF, formData: any) => {
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(128, 100, 162);
  doc.rect(0, 10, 210, 10, 'F');
  doc.text("PHASE 4", 105, 17, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(128, 100, 162);
  doc.text("Concrétiser son projet", 10, 30);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  doc.text("Atelier 6 : Concrétiser son projet de professionnalisation", 10, 40);
  doc.autoTable({
    startY: 45,
    head: [['Du', 'au', 'de', 'heures à', 'heures']],
    body: [['', '', '', '', '']],
  });

  doc.text("Métier(s) visé(s) :", 10, doc.lastAutoTable.finalY + 10);
  doc.rect(10, doc.lastAutoTable.finalY + 15, 190, 10);

  doc.text("Formations identifiées au sein de l'offre de formation", 10, doc.lastAutoTable.finalY + 35);
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 40,
    head: [['Intitulé de la formation', 'Organisme de formation', 'Lieu de formation', "Date d'entrée en formation éventuelle"]],
    body: [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ],
  });

  doc.text("Formation présente au PRF :", 10, doc.lastAutoTable.finalY + 10);
  doc.text(" Oui", 80, doc.lastAutoTable.finalY + 10);
  doc.text(" Non", 120, doc.lastAutoTable.finalY + 10);

  doc.text("Plan de formation argumenté :", 10, doc.lastAutoTable.finalY + 20);
  doc.rect(10, doc.lastAutoTable.finalY + 25, 190, 30);

  doc.setFontSize(12);
  doc.setTextColor(128, 100, 162);
  
  const text = "Les compétences développées pendant Prépa compétences et mises à jour dans le profil de compétences";
  const textX = 10;
  const textY = doc.lastAutoTable.finalY + 65;
  doc.text(text, textX, textY);
  const textWidth = doc.getTextWidth(text);
  doc.setDrawColor(128, 100, 162);
  doc.line(textX, textY + 1, textX + textWidth, textY + 1);
  
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  const competences = [
    " Communiquer à l'écrit dans un contexte professionnel",
    " Communiquer à l'oral dans un contexte professionnel",
    " Utiliser les mathématiques dans le cadre d'une pratique professionnelle",
    " Utiliser les outils numériques, découvrir les usages et la culture du numérique (plateforme numérique pour se former)",
    " Recueillir et traiter de l'information",
    " Travailler en groupe et en équipe",
    " Travailler en autonomie et réaliser un objectif individuel",
    " Connaître les règles de sécurité, l'environnement et la prévention santé en lien avec le métier visé",
    " Réaliser des activités pratiques en lien avec le métier visé",
    " S'organiser dans son activité professionnelle",
    " Faire des choix et construire son parcours de formation"
  ];

  const startX = 10;
  const startY = doc.lastAutoTable.finalY + 75;
  const checkboxSize = 5;
  const lineHeight = 10;
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  
  competences.forEach((competence, index) => {
    const checkboxX = startX;
    const checkboxY = startY + index * lineHeight;
  
    // Dessiner la case à cocher
    doc.rect(checkboxX, checkboxY, checkboxSize, checkboxSize);
  
    // Dessiner le texte à côté de la case à cocher
    doc.text(competence, checkboxX + checkboxSize + 5, checkboxY + checkboxSize - 1);
  });
};

// Numérotation des pages
const addPageNumbers = (doc: jsPDF) => {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(16);
    doc.setTextColor(128, 100, 162);
    doc.text(`${i}`, 10, doc.internal.pageSize.height - 10);
  }
};

export default PDFTemplate;