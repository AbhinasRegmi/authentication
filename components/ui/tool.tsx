import { 
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger 
} from "@/components/ui/tooltip";

import {
    Slot
} from "@radix-ui/react-slot"

interface ToolProps {
    children: React.ReactNode;
    text: string;
}
export function Tool(props: ToolProps){
    return (

        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="w-full">
                    {props.children}
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <p>
                        {props.text}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}