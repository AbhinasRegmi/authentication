import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})

interface HeaderProps {
    label: string,
}

export function Header(props: HeaderProps){
    return (
        <div className="flex flex-col w-full justify-center items-center gap-4">
            <h1 className={cn(
                "text-3xl font-semibold",
                font.className
            )}>Authentication</h1>
            <p className="text-sm text-muted-foreground">{props.label}</p>
        </div>
    )
}