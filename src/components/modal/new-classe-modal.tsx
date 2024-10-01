import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import React, {useEffect, useState} from "react";
import z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import classeService from "@/service/classe.service.ts";
import formerService from "@/service/former.service.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Former} from "@/types/Former.ts";


interface NewClasseModalProps {
    children: React.ReactNode;
    onSuccess: (isSuccess: boolean) => void;
}


const ClasseSchema = z.object({
    center_name: z.string(),
    former_name: z.string(),
    date_start: z.string(),
    date_end: z.string()
})

const NewClasseModal = ({children, onSuccess}: NewClasseModalProps) => {
    const [formers, setFormer] = useState<Former[]>([]);

    const form = useForm<z.infer<typeof ClasseSchema>>({
        resolver: zodResolver(ClasseSchema),
        defaultValues: {
            center_name: "",
            former_name: "",
            date_start: "",
            date_end: "",
        },
    });


    const handleCreateClasse = async (data: z.infer<typeof ClasseSchema>) => {
        try {
            console.log(data)
            await classeService.create({data : data});
            onSuccess(true);
        } catch (error) {
            console.error(error);
            onSuccess(false);
        }
    }

    const fetchFormers = async () => {
        const resp =  await formerService.getAll();
        setFormer(resp.data);
    }

    useEffect(() => {
        fetchFormers()
    }, []);

    const centers = ["BREST", "ROUBAIX"];

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Créer une nouvelle classe</AlertDialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreateClasse)} className=" flex flex-col gap-2">
                            <FormField
                                control={form.control}
                                name="center_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Centre</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selectionner un centre" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {centers && (
                                                    centers.map((item) => (
                                                        <SelectItem value={item.toLowerCase()}>{item}</SelectItem>
                                                    ))

                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="former_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Formateur</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selectionner un formateur" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {formers && (
                                                    formers.map((item) => (
                                                        <SelectItem value={item.lastname.toLowerCase()}>{item.lastname}</SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date_start"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Date de début
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <FormField
                                control={form.control}
                                name="date_end"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Date de fin
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="date"  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <AlertDialogFooter>
                                <AlertDialogAction type="submit">
                                    Créer une classe
                                </AlertDialogAction>
                                <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                                    Cancel
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );

}

export default NewClasseModal;