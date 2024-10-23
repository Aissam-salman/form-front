import AdhesionForm from "@/components/candidate/adhesion/AdhesionForm.tsx";
import { Toaster } from "@/components/ui/sonner";

const AdhesionPage = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <AdhesionForm />
      <Toaster />
    </div>
  );
};

export default AdhesionPage;