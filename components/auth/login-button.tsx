'use client';

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode,
    mode?: 'redirect' | 'modal',
}

export function LoginButton(
    {
        children,
        mode = 'redirect'
    }: LoginButtonProps
){

    const router = useRouter();

    if(mode === 'modal'){
        throw new Error('Not Implemented Error: Modals are not defined yet.')
    }

    function clickHandler(){
        router.push('/auth/login');
    }

    return (
        <span onClick={clickHandler} className="cursor-pointer">
            {children}
        </span>
    )
}