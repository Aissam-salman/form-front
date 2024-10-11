import Navbar from "@/components/navbar.tsx";
import Editor from "@/components/form/editor.tsx";

const NewFormPage = () => {

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="p-5 h-screen">
                <Editor />
            </div>
        </div>
    );
}

export default NewFormPage;