import { jsPDF } from "jspdf";

export const addPageHeader = (doc: jsPDF, title: string) => {
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(128, 0, 128);
  doc.rect(0, 10, 210, 10, 'F');
  doc.text(title, 105, 17, { align: "center" });
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
};

export const safeGetValue = (obj: any, path: string, defaultValue: any = '') => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue;
};