import Logo from "@/components/logo.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {useNavigate} from "react-router-dom";
import {useStore} from "@/store/use-store.ts";

interface NavbarProps {
    className?: string;
}

const Navbar = ({className}: NavbarProps) => {
    const navigate = useNavigate();
    const logout = useStore((state) => state.logout);
    const isConnected = useStore((state) => state.isConnected);

    //TODO: add state isConnected ?
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <nav className={cn("flex w-full items-center justify-between px-4", className)}>
            <Logo />
            {isConnected ? (
                <>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                    >
                        Déconnexion
                    </Button>
                </>
            ) : (
                <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                >
                    Connexion
                </Button>
            )}
        </nav>
    );
        {/*    TODO: add dropdown menu and disconnect btn*/}
};

export default Navbar;
