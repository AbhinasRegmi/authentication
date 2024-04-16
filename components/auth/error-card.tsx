import {CardWrapper} from "@/components/auth/card-wrapper";

export function ErrorCard(){
    return (
        <CardWrapper
            headerLabel="Something went wrong!"
            backButtonLabel="Go back to login?"
            backButtonHref="/auth/login"
            showSocial
        >
            <p className="text-foreground text-sm text-center py-5 select-none">Please try to login in again.</p>
        </CardWrapper>
    )
}