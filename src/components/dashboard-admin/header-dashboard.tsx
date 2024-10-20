import {Button} from "@/components/ui/button.tsx";
import {BellIcon, Settings2Icon} from "lucide-react";
import {useNavigate} from "react-router-dom";
import { useStore } from "@/store/use-store.ts";


interface MenuItem {
    id: string;
    label: string;
}

interface HeaderProps {
    menuItems: MenuItem[];
    activeTab: string; // Onglet actif (id de l'item sélectionné)
}

const HeaderDashboard = ({menuItems, activeTab}: HeaderProps) => {
    const navigate = useNavigate();
    const logout = useStore((state) => state.logout);

    const activeLabel = menuItems.find((item) => item.id === activeTab)?.label || 'Dashboard';
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                    {activeLabel}
                </h2>
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="mr-2">
                        {/* TODO: add dropdown menu with notifications */}
                        <BellIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="mr-4">
                        {/* TODO: add dropdown with logout, profile */}
                        <Settings2Icon className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" onClick={handleLogout}>
                        Déconnexion
                    </Button>

                </div>
            </div>
        </header>
    );
}

export default HeaderDashboard;