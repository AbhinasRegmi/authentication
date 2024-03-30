import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const poppins = Poppins({ weight: "600", subsets: ['latin'] })

export default async function RootPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-muted">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-foreground text-4xl md:text-6xl drop-shadow-md font-semibold select-none leading-none", poppins.className)}>Authentication</h1>
        <p className="text-muted-foreground leading-none text-sm md:text-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button size={"lg"}>
              Login
            </Button>
        </LoginButton>
        </div>
      </div>
    </main>
  )
}