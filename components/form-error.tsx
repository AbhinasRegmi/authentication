import {ExclamationTriangleIcon} from '@radix-ui/react-icons';


interface FormErrorProps {
    message?: string;
}

export function FormError(props: FormErrorProps){
    if(!props.message){
        return null;
    }

    return (
        <div className="flex items-center gap-4 bg-destructive/15 text-destructive text-sm py-2 px-3 rounded-md">
            <ExclamationTriangleIcon className='size-4' />
            {props.message}
        </div>
    )
}