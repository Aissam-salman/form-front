
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoginImg from "../../public/loginImg.jpg"
import Logo from "@/components/logo"
import {ModeToggle} from "@/components/mode-toggle.tsx";

export const LoginPage = () => {
  //TODO: add event to login and redirect

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen relative overflow-y-auto">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo className="lg:text-9xl" />
            <h1 className="text-3xl font-bold">Connexion</h1>
            <p className="text-balance text-muted-foreground">
              Bienvenue sur Forme
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Mot de passe oublié?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button
                onClick={() => {}}
                type="submit"
                className="w-full">
              Connexion
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Pas de compte?{" "}
            <a href="/signup" className="underline">
              Inscription
            </a>
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
      <div className="absolute left-5 bottom-2">
        <ModeToggle />
      </div>
    </div>
  )
}
