import {VerificationForm} from "@/components/auth/verification-form";
import {Suspense} from "react";

export default function VerificationPage(){
    return (
        <Suspense>
            <VerificationForm />
        </Suspense>
    )
}