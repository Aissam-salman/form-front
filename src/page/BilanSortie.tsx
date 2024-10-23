import BilanSortieForm from "@/components/candidate/bilan-sortie/BilanSortieForm.tsx";
import { Toaster } from "@/components/ui/sonner";

const BilanSortiePage = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <BilanSortieForm />
      <Toaster />
    </div>
  );
};

export default BilanSortiePage;