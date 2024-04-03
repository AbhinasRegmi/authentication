import * as z from 'zod';

export const RegisterSchema = z.object({
    firstName: z.string().min(1, {
        message: 'You first name should have at least 1 character.'
    }),
    lastName: z.string().min(1, {
        message: 'You last name should have at least 1 character.'
    }),
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Password should be of min length 6.'
    })
})