'use client';

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { ProviderLogin } from "@/actions/login";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export function Social() {

    return (
        <div className="w-full flex gap-4">
            <form action={()=>ProviderLogin("google")} className="w-full">
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-xl"
                    type="submit"
                    tabIndex={-1}
                >
                    <FaGoogle />
                </Button>
            </form>


            <form action={() => ProviderLogin("github")} className="w-full">
            <Button
                variant="outline"
                size="lg"
                className="w-full text-xl"
                onClick={() => { }}
                tabIndex={-1}
            >
                <FaGithub />
            </Button>
            </form>


        </div>
    )
}