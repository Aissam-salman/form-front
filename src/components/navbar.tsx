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

    const isConnected = useStore((state) => state.isConnected);

    //TODO: add state isConnected ?

    return (
        <nav className={cn("flex w-full items-center justify-between px-4", className)}>
            <Logo />
            {isConnected ? (
                <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                >
                    Connexion
                </Button>
                
            ) : null}
        {/*    TODO: add dropdown menu and disconnect btn*/}
        </nav>
    );
};

export default Navbar;
