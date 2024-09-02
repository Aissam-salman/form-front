import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import Navbar from "@/components/navbar.tsx";
import afpa from "../../public/afpaLogo.svg"

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import AuthService from "@/service/auth.service.ts";

const RegisterSchema = z.object({
    firstname: z.string({
        required_error: "Please enter first name.",
    }),
    lastname: z.string({
        required_error: "Please enter last name.",
    }),
    email: z.string({
        required_error: "Please enter email.",
    }).email(),
    password: z.string({
        required_error: "Please enter password.",
    }),
    role: z.string({
        required_error: "Please select an role.",
    }),
    phone_number: z.string({
        required_error: "Please enter phone number valid.",
    }).max(10),
})


export function SignupPage() {

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
    });




    const handleSignup = (data: z.infer<typeof RegisterSchema>) => {

        AuthService.signup(data)
            .then(resp => {
                console.log(resp)
                // redirect to page appropriate
            }).catch(err => {
            console.log(err)
            // show err, in DOM
        })
    }


    // state for isConnected ??   redirect to page => candidatepage
    // state isConnected global, i need for all, and token register
    // zustand ?

    return (
        <div className="w-full min-h-screen flex flex-col relative">
            <Navbar/>
            <div className="flex items-center justify-center py-12">
                <Card className="mx-auto">
                    <CardHeader>
                        <CardTitle className="text-xl">Inscription</CardTitle>
                        <CardDescription>
                            Remplir les informations afin de créer un compte sur Forme
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSignup)} className=" flex flex-col gap-2">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Prénom
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Nom
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="m@exemple.com" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Mot de passe
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="password"  {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Numéro de téléphone
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                Role
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selectionner un role"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="CANDIDATE">CANDIDATE</SelectItem>
                                                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                                                    <SelectItem value="FORMER">FORMER</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <Button
                                    type="submit"
                                    className="w-full mt-8">
                                    Créer un compte
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <img className="absolute bottom-2 left-5" width={100} src={afpa} alt="Logo afpa"/>
        </div>
    )
}
