import {Label} from "@/components/ui/label.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useState} from "react";

interface DateFormProps {
    label: string;
}

export const DateForm = ({label}: DateFormProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={`w-[280px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
