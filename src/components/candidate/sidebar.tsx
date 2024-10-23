import React from 'react';
import {Button} from '@/components/ui/button.tsx';
import {Separator} from "@/components/ui/separator.tsx";


interface SidebarProps {
    items: { phase: string; workshops: { id: number; name: string }[] }[];
    activeWorkshop: number;
    setActiveWorkshop: (id: number) => void;
  }
  



const Sidebar: React.FC<SidebarProps> = ({ items, activeWorkshop, setActiveWorkshop }) => {


    return (
        <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-4rem)] fixed h-full ">
        

            <nav className="p-4 space-y-2">
                {items.map((item, index) => (
                    <div key={index}>
                        <h3 className="font-bold  mb-2">{item.phase}</h3>
                        {item.workshops.map((workshop) => (
                            <Button
                                key={workshop.id}
                                variant={activeWorkshop === workshop.id ? "default" : "ghost"}
                                className="w-full text-left p-2 justify-start mb-1"
                                onClick={() => setActiveWorkshop(workshop.id)}
                            >
                                {"Atelier " + workshop.id}
                            </Button>
                        ))}
                        <Separator className="my-2" />
                    </div>
                ))}

            </nav>
        </aside>
    );
};

export default Sidebar;