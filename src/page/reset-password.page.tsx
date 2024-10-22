import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import AuthService from "@/service/auth.service";
import { AuthResetPassword } from "@/dto/AuthResetPassword";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import Logo from "@/components/logo";
import LoginImg from "../../public/loginImg.jpg";

// Définition du schéma de validation avec Zod
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const requestData: AuthResetPassword = {
      token: token!,
      password: data.password,
    };

    try {
      await AuthService.resetPassword(requestData);
      toast.success("Votre mot de passe a été réinitialisé avec succès.");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      toast.error("Erreur lors de la réinitialisation du mot de passe.");
    }
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen relative overflow-y-auto">
      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center">
            <Logo className="lg:text-9xl" />
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight">
              Réinitialiser votre mot de passe
            </h2>
          </div>
          <div className="w-full shadow-xl rounded-xl p-6">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Réinitialiser le mot de passe
              </Button>
            </form>
          </Form>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={LoginImg}
          alt="Image"
          className="h-full w-full object-center lg:h-screen dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="absolute left-4 bottom-4">
        <ModeToggle />
      </div>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
