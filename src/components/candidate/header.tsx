import { Button } from "@/components/ui/button.tsx";
import { BellIcon, Settings2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/use-store.ts";
import Logo from "@/components/logo.tsx";

const Header = () => {
    const navigate = useNavigate();
    const logout = useStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white shadow-sm stiky fixed  w-full">
            <div className="max-w-full mx-auto  px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Logo />
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                    Mon Parcours
                </h2>
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="mr-2">
                        <BellIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="mr-4">
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

export default Header;