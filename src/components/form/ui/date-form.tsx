import {Label} from "@/components/ui/label.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Controller} from "react-hook-form";

interface DateFormProps {
    label: string;
    name: string;
    control: any;
    errors?: any;
}

export const DateForm = ({label, name, control, errors}: DateFormProps) => {
    return (
        <div className="space-y-2 flex flex-col">
            <Label>{label}</Label>
            <Controller
                control={control}
                name={name}
                render={({field}) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={`w-[280px] justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date ? date.toISOString() : undefined)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />
            {errors?.[name] && <p className="text-red-500">{errors[name]?.message}</p>}
        </div>
    );
}
