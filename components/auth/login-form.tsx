'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas/login';
import {LoginAction} from '@/actions/login';
import {useTransition, useState, useEffect} from 'react';
import {useSearchParams} from "next/navigation";
import Link from "next/link";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {FormError} from '@/components/form-error';
import {FormSuccess} from '@/components/form-success';
import { CardWrapper } from "@/components/auth/card-wrapper";



export function LoginForm() {
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const form_ = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    function loginHandler(values: z.infer<typeof LoginSchema>){
        startTransition(() => {
            setError(undefined);
            setSuccess(undefined);

            LoginAction(values)
            .then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            })
        });
    }

    useEffect(() => {
        const error = searchParams.get("error");

        if(error === 'OAuthAccountNotLinked'){
            setError("Email already in use with a different provider. ")
        }
    }, [])

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form_}>
                <form
                    className="space-y-6"
                    onSubmit={form_.handleSubmit(loginHandler)}
                >
                    <div className="space-y-4">
                        <FormField
                            control={form_.control}
                            name="email"
                            render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder={"user@email.com"}
                                            type="email"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }
                        />
                        <FormField
                            control={form_.control}
                            name="password"
                            render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder='******'
                                            type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <Button
                                            variant={"link"}
                                            size={"sm"}
                                            asChild
                                            className="pl-0"
                                        >
                                            <Link href={"/auth/reset"}>
                                                Forgot password?
                                            </Link>
                                        </Button>
                                    </FormItem>
                                )
                            }
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type='submit'
                        className='w-full ring-offset-2'
                        disabled={isPending}
                    >
                        Login
                    </Button>
                    
                </form>
            </Form>

        </CardWrapper>
    )
}