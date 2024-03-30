'use client';

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}
export function CardWrapper(props: CardWrapperProps) {

    return (
        <Card className="w-full mx-4 md:mx-0 md:w-[400px] shadow-md">
            <CardHeader>
                <Header label={props.headerLabel} />
            </CardHeader>
            <CardContent>
                {props.children}
            </CardContent>
            {
                props.showSocial && <CardFooter><Social /></CardFooter>
            }
            <CardFooter>
                <BackButton
                    label={props.backButtonLabel}
                    href={props.backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}