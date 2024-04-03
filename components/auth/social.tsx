'use client';

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import { Tool } from "@/components/ui/tool";

export function Social() {
    return (
        <div className="w-full flex gap-4">
            <Button
                variant="outline"
                size="lg"
                className="w-full text-xl"
                onClick={() => { console.log('Google login clicked.') }}
                tabIndex={-1}
            >
                <FaGoogle />
            </Button>



            <Button
                variant="outline"
                size="lg"
                className="w-full text-xl"
                onClick={() => { console.log('Github login clicked.') }}
                tabIndex={-1}
            >
                <FaGithub />
            </Button>


        </div>
    )
}