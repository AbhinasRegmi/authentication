'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetSchema } from '@/schemas/reset';
import {ResetAction} from "@/actions/reset";
import {useTransition, useState } from 'react';

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



export function ResetForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const form_ = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        }
    })

    function resetHandler(values: z.infer<typeof ResetSchema>){
        startTransition(() => {
            setError(undefined);
            setSuccess(undefined);

            ResetAction(values)
            .then(data => {
                if(data?.error){
                    setError(data.error);
                }else if(data?.success){
                    setSuccess(data.success);
                }
            })
        });
    }

    return (
        <CardWrapper
            headerLabel="Forgot your password?"
            backButtonLabel="Back to login?"
            backButtonHref="/auth/login"
        >
            <Form {...form_}>
                <form
                    className="space-y-6"
                    onSubmit={form_.handleSubmit(resetHandler)}
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
                        
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        type='submit'
                        className='w-full ring-offset-2'
                        disabled={isPending}
                    >
                        Send reset email
                    </Button>
                </form>
            </Form>

        </CardWrapper>
    )
}