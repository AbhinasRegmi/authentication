"use client";

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';


import { CardWrapper } from "@/components/auth/card-wrapper";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas/register";
import { Input } from "@/components/ui/input";
import { RegisterAction } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function RegisterForm() {
    const form_ = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }
    )

    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [isPending, startTransition] = useTransition()

    function registerHandler(data: z.infer<typeof RegisterSchema>) {
        startTransition(
            () => {
                setError(undefined);
                setSuccess(undefined);

                RegisterAction(data)
                    .then(data => {
                        setError(data.error);
                        setSuccess(data.success);
                    })
            }
        )
    }

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >
            <Form {...form_}>
                <form
                    className="space-y-5"
                    onSubmit={form_.handleSubmit(registerHandler)}>
                    <div className="space-y-3">
                        <FormField
                            control={form_.control}
                            name="firstName"
                            render={
                                ({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='Enter your first name'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />

                        <FormField
                            control={form_.control}
                            name="lastName"
                            render={
                                ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Enter your last name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />

                        <FormField
                            name="email"
                            control={form_.control}
                            render={
                                ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter you email"
                                                type="email"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />
                        <FormField
                            name="password"
                            control={form_.control}
                            render={
                                ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Enter you secure password'
                                                type="password"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <Button
                        disabled={isPending}
                        className="w-full ring-offset-2"
                        type='submit'
                    >
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}