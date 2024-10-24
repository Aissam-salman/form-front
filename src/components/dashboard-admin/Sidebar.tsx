import React from 'react';
import {Button} from '@/components/ui/button.tsx';
import Logo from "@/components/logo.tsx";
import { LucideProps, Printer} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface MenuItem {
    id: string;
    label: string;
    icon:  React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface SidebarProps {
    menuItems: MenuItem[];
    activeTab?:  string;
    setActiveTab: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeTab, setActiveTab }) => {

    if (!activeTab) {
        activeTab = menuItems[0].id;
    }
const navigate = useNavigate();

    return (
        <aside className="w-64 bg-white shadow-md">
            <Logo />
            <nav className="mt-6">
                {menuItems.map((item) => (
                    <Button
                        key={item.id}
                        variant={activeTab === item.id ? 'default' : 'ghost'}
                        className="w-full justify-start text-left font-normal mx-2 mb-1"
                        onClick={() => setActiveTab(item.id)}
                    >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                    </Button>
                ))}
            </nav>
            <Button variant="default"
                    onClick={() => navigate("/generate-pdf")}
                    className="w-full justify-start text-left font-normal fixed bottom-2 left-1 w-64">

                <Printer className={"mx-2"} />  Générer un PDF

            </Button>
        </aside>
    );
};

export default Sidebar;
