import Logo from "@/components/logo.tsx";
import {Button} from "@/components/ui/button.tsx";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-4">
            <Logo />
            <Button
                variant="outline"
            >
                Connexion
            </Button>
        </nav>
    );
};

export default Navbar;
