import { PropsWithChildren } from "react";

export default async function AuthLayout(props: PropsWithChildren){
    return (
        <main className="min-h-dvh flex items-center justify-center bg-muted">
            {props.children}
        </main>
    )
}