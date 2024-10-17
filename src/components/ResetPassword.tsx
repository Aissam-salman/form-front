import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams<{ token: string }>();
    const { register, handleSubmit } = useForm<{ password: string; confirmPassword: string }>();
    const [message, setMessage] = useState('');

    const onSubmit = async (data: { password: string; confirmPassword: string }) => {
        if (data.password !== data.confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            await axios.post('/api/v1/auth/reset-password', { token, password: data.password });
            setMessage('Votre mot de passe a été réinitialisé avec succès.');
        } catch {
            setMessage('Erreur lors de la réinitialisation du mot de passe.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Réinitialiser le mot de passe</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="password"
                        {...register('password')}
                        placeholder="Nouveau mot de passe"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        placeholder="Confirmer le mot de passe"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Réinitialiser le mot de passe
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;