import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '@/service/auth.service';
import { AuthForgotPassword } from '@/dto/AuthForgotPassword';
import { Button } from '@/components/ui/button';

const ForgotPassword = () => {
    const { register, handleSubmit } = useForm<{ email: string }>();
    const [message, setMessage] = useState('');

    const onSubmit = async (data: { email: string }) => {
        const requestData: AuthForgotPassword = { email: data.email };
        try {
            await AuthService.forgotPassword(requestData);
            setMessage('Un email de réinitialisation a été envoyé.');
        } catch {
            setMessage('Erreur lors de l\'envoi de l\'email.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Réinitialiser le mot de passe</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="email"
                        {...register('email')}
                        placeholder="Email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                    <Button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Réinitialiser le mot de passe
                    </Button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;