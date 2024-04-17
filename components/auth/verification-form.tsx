"use client";

import {CardWrapper} from "@/components/auth/card-wrapper";
import { FaSpinner } from "react-icons/fa";
import {useSearchParams} from "next/navigation";
import { useEffect } from "react";
import {verifyAction} from "@/actions/verification";


export function VerificationForm(){
    const token = useSearchParams().get("token");

    useEffect( () => {
        ( async () => {
            if(token){
                await verifyAction(token);
            }
        })();
    }, [])

    return (
        <CardWrapper
            headerLabel={"Verifying your account"}
            backButtonLabel={"Go back to login?"}
            backButtonHref={"/auth/login"}
        >
            <div className="flex justify-center text-3xl animate-spin text-foreground">
                <FaSpinner />
            </div>
        </CardWrapper>
    )
}