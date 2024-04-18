"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FaSpinner } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyAction } from "@/actions/verification";
import { FormError } from "@/components/form-error";


export function VerificationForm() {
    const token = useSearchParams().get("token");
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        (async () => {
            if (token) {
                const res = await verifyAction(token);

                if(res?.error){
                    setError(res.error);
                }
            }
        })();
    }, [token])

    return (
        <CardWrapper
            headerLabel={"Verifying your account"}
            backButtonLabel={"Go back to login?"}
            backButtonHref={"/auth/login"}
        >
            {
                !error &&
                <div className="flex justify-center text-3xl animate-spin text-foreground">
                    <FaSpinner />
                </div>
            }

            <FormError message={error} />
        </CardWrapper>
    )
}