import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FormComponent from '@/components/pdf/FormComponent';
import Phase1Component from '@/components/pdf/Phase1Component';
import Phase2Component from '@/components/pdf/Phase2Component';
import Phase3Component from '@/components/pdf/Phase3Component';
import Phase4Component from '@/components/pdf/Phase4Component';
import BilanSortieComponent from '@/components/pdf/BilanSortieComponent';
import PDFTemplate from '@/components/pdf/PDFTemplate';

const GeneratePDF = () => {
    const [formData, setFormData] = useState({});
    const [phase1Data, setPhase1Data] = useState({});
    const [phase2Data, setPhase2Data] = useState({});
    const [phase3Data, setPhase3Data] = useState({});
    const [phase4Data, setPhase4Data] = useState({});
    const [bilanSortieData, setBilanSortieData] = useState({});
    const [pdfUrl, setPdfUrl] = useState('');
    const [isIframeVisible, setIsIframeVisible] = useState(false);

    const handleFormSubmit = (data) => {
        setFormData(data);
    };

    const handlePhase1DataChange = (data) => {
        setPhase1Data(data);
    };

    const handlePhase2DataChange = (data) => {
        setPhase2Data(data);
    };

    const handlePhase3DataChange = (data) => {
        setPhase3Data(data);
    };

    const handlePhase4DataChange = (data) => {
        setPhase4Data(data);
    };

    const handleBilanSortieDataChange = (data) => {
        setBilanSortieData(data);
    };

    const handleGeneratePDF = () => {
        const allData = {
            ...formData,
            phase1: phase1Data,
            phase2: phase2Data,
            phase3: phase3Data,
            phase4: phase4Data,
            bilanSortie: bilanSortieData,
        };
        const generatePDF = PDFTemplate({ formData: allData });
        const { doc, fileName } = generatePDF();
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
        setIsIframeVisible(true);
    };

    const handleDownloadPDF = () => {
        if (pdfUrl) {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `bilan_prepa_competences_${formData.nomBeneficiaire}_${formData.prenomBeneficiaire}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handlePrintPDF = () => {
        if (pdfUrl) {
            const printWindow = window.open(pdfUrl);
            if (printWindow) {
                printWindow.print();
            }
        }
    };


    const handleSendEmail = () => {
        // Implement email sending logic here
        console.log("Sending email...");
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-4">
                        Bilan « Prépa Compétences »
                    </div>

                    <Tabs defaultValue="adhesion">
                        <TabsList>
                            <TabsTrigger value="adhesion">Adhésion</TabsTrigger>
                            <TabsTrigger value="phase1">Phase 1</TabsTrigger>
                            <TabsTrigger value="phase2">Phase 2</TabsTrigger>
                            <TabsTrigger value="phase3">Phase 3</TabsTrigger>
                            <TabsTrigger value="phase4">Phase 4</TabsTrigger>
                            <TabsTrigger value="bilanSortie">Bilan de sortie</TabsTrigger>
                        </TabsList>
                        <TabsContent value="adhesion">
                            <FormComponent onSubmit={handleFormSubmit} />
                        </TabsContent>
                        <TabsContent value="phase1">
                            <Phase1Component onDataChange={handlePhase1DataChange} />
                        </TabsContent>
                        <TabsContent value="phase2">
                            <Phase2Component onDataChange={handlePhase2DataChange} />
                        </TabsContent>
                        <TabsContent value="phase3">
                            <Phase3Component onDataChange={handlePhase3DataChange} />
                        </TabsContent>
                        <TabsContent value="phase4">
                            <Phase4Component onDataChange={handlePhase4DataChange} />
                        </TabsContent>
                        <TabsContent value="bilanSortie">
                            <BilanSortieComponent onDataChange={handleBilanSortieDataChange} />
                        </TabsContent>
                    </Tabs>

                    <div className="mt-8 flex space-x-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Aperçu</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Aperçu du Bilan</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4">
                                    <h2 className="text-xl font-bold mb-2">Adhésion</h2>
                                    <pre>{JSON.stringify(formData, null, 2)}</pre>
                                    <h2 className="text-xl font-bold mb-2 mt-4">Phase 1</h2>
                                    <pre>{JSON.stringify(phase1Data, null, 2)}</pre>
                                    <h2 className="text-xl font-bold mb-2 mt-4">Phase 2</h2>
                                    <pre>{JSON.stringify(phase2Data, null, 2)}</pre>
                                    <h2 className="text-xl font-bold mb-2 mt-4">Phase 3</h2>
                                    <pre>{JSON.stringify(phase3Data, null, 2)}</pre>
                                    <h2 className="text-xl font-bold mb-2 mt-4">Phase 4</h2>
                                    <pre>{JSON.stringify(phase4Data, null, 2)}</pre>
                                    <h2 className="text-xl font-bold mb-2 mt-4">Bilan de sortie</h2>
                                    <pre>{JSON.stringify(bilanSortieData, null, 2)}</pre>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Button onClick={handleGeneratePDF}>Générer PDF</Button>
                        <Button onClick={() => setIsIframeVisible(true)}>Aperçu PDF</Button>
                        <Button onClick={handlePrintPDF}>Imprimer</Button>
                        <Button onClick={handleSendEmail}>Envoyer par email</Button>
                        <Button onClick={handleDownloadPDF}>Télécharger PDF</Button>
                    </div>
                </div>
                {isIframeVisible && (
                    <div className="relative">
                        <button
                            onClick={() => setIsIframeVisible(false)}
                            className="absolute -top-20 right-4 m-2 p-2 bg-red-500 text-white rounded"
                        >
                            Fermer
                        </button>
                        <iframe src={pdfUrl} width="100%" height="600px"></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeneratePDF;
