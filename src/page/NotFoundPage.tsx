import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-2xl text-gray-700 mt-4">Oups! Page non trouvée.</p>
            <p className="mt-2 text-gray-500">
                La page que vous cherchez n'existe pas ou a été déplacée.
            </p>
            <Link to="/" className="mt-6 text-blue-500 hover:underline">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default NotFoundPage;
