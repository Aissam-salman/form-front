import Header from "@/components/candidate/header";
import Sidebar from "@/components/candidate/sidebar";

import {ReactNode} from "react";

interface MainLayoutProps {
  children: ReactNode;
  sidebarItems: { id: number; name: string }[];
  activeWorkshop: number;
  setActiveWorkshop: (id: number) => void;
}

const MainLayout = ({ children, sidebarItems, activeWorkshop, setActiveWorkshop }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex pt-16">

        <Sidebar
          items={sidebarItems}
          activeWorkshop={activeWorkshop}
          setActiveWorkshop={setActiveWorkshop}
        />
        <main className="flex-1 ml-64 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;