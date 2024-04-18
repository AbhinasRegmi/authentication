import {PasswordResetForm} from "@/components/auth/password-reset-form";
import {Suspense} from "react";

export default function PasswordResetPage(){
    return (
        <Suspense>
            <PasswordResetForm />
        </Suspense>
    )
}