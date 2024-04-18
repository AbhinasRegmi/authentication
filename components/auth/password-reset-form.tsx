"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";

import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas/reset";
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordAction } from "@/actions/reset";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PasswordResetForm() {
    const [error, setError] = useState<string | undefined>(undefined);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();
    const token = useSearchParams().get("token");


    if (!token) {
        router.push("/auth/error");
        return;
    }

    const form_ = useForm<z.infer<typeof ResetPasswordSchema>>(
        {
            resolver: zodResolver(ResetPasswordSchema),
            defaultValues: {
                password: "",
                token,
            }
        }
    )

    function passwordResetHandler(values: z.infer<typeof ResetPasswordSchema>) {
        startTransition(() => {
            ResetPasswordAction(values)
                .then(data => {
                    setError(data?.error);
                })
        })
    }

    return (
        <CardWrapper
            headerLabel="Reset your password"
            backButtonLabel="Back to login?"
            backButtonHref="/auth/login"
        >
            <Form {...form_}>
                <form
                    onSubmit={form_.handleSubmit(passwordResetHandler)}
                    className={"space-y-5"}
                >
                    <div className="space-y-3">
                        <FormField
                            name="password"
                            control={form_.control}
                            render={
                                ({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            New Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="*******"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />

                        <FormField
                            name="token"
                            control={form_.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Reset Token
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormError message={error} />

                    <Button
                        size={"lg"}
                        className="w-full ring-offset-2"
                        type={"submit"}
                        disabled={isPending}
                    >
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}