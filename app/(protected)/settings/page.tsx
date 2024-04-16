import {auth} from "@/auth";
import {signOut} from "@/auth";
import {Button} from "@/components/ui/button";

export default async function SettingsPage(){
    const session = await auth();

    async function handler(){
        "use server";
        await signOut();
    }

    return (
        <div className="container">
            {
                JSON.stringify(session)
            }

            <form action={handler}>
                <Button variant={"outline"} size={"sm"}>Sign Out</Button>
            </form>
        </div>
    )
}