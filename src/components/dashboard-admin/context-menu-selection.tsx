import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {ReactNode} from "react";
import {Row} from "@tanstack/react-table";

interface ContextMenuSelectionProps<TData,> {
    children?: ReactNode;
    isSelected?: boolean;
    selectedRows?: Row<TData>[];
    onAddToClass?: (rows: Row<TData>[]) => void;
    onDelete?: (rows: Row<TData>[]) => Promise<void>;
}

const ContextMenuSelection = <TData,>({children, isSelected, selectedRows, onAddToClass, onDelete}: ContextMenuSelectionProps<TData>) => {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                {children}
            </ContextMenuTrigger>
            {isSelected ? (
                <ContextMenuContent className="w-64">
                    <ContextMenuItem
                        inset
                        onClick={() => onAddToClass && selectedRows && onAddToClass(selectedRows)}
                    >
                        Ajouter à une classe
                    </ContextMenuItem>
                    <ContextMenuItem
                        className="text-red-300 bg-red-100"
                        inset
                        onClick={() => selectedRows && onDelete && onDelete(selectedRows)}
                    >
                        Supprimé !
                        <ContextMenuShortcut>ctrl + Z</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuSeparator/>
                    <ContextMenuCheckboxItem checked>
                        selectionné
                        <ContextMenuShortcut>ctrl + D</ContextMenuShortcut>
                    </ContextMenuCheckboxItem>
                    <ContextMenuSeparator/>
                    <ContextMenuRadioGroup value="current">
                        <ContextMenuLabel inset>Status</ContextMenuLabel>
                        <ContextMenuSeparator/>

                        <ContextMenuRadioItem value="current">
                            En cours
                        </ContextMenuRadioItem>

                        <ContextMenuRadioItem value="archived">
                            Archivé
                        </ContextMenuRadioItem>
                        <ContextMenuRadioItem value="done">
                            Terminé
                        </ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                </ContextMenuContent>
            ) : null}
        </ContextMenu>
    )
}

export default ContextMenuSelection;