import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthService from "@/service/auth.service";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import LoginImg from "../../public/loginImg.jpg";
import Logo from "@/components/logo";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Adresse e-mail invalide"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await AuthService.forgotPassword(values);
      setMessage("Un email de réinitialisation a été envoyé.");
      toast.success("Un email de réinitialisation a été envoyé.");
      setTimeout(() => navigate("/login"), 2000);

    } catch {
      setMessage("Erreur lors de l'envoi de l'email.");
      toast.error("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen relative overflow-y-auto">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo className="lg:text-9xl" />
            <h2 className="mt-6 text-center text-2xl font-bold tracking-tight">
              Réinitialiser le mot de passe
            </h2>
            <p className=" text-muted-foreground ">
              Veuillez saisir votre adresse e-mail pour récupérer votre compte.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full shadow-xl rounded-xl p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
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
              {message && (
                <p className="mt-4 text-center text-red-500">{message}</p>
              )}
            </div>
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

export default ForgotPassword;
