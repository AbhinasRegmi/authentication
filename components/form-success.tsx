import {CheckCircledIcon} from '@radix-ui/react-icons';


interface FormSuccessProps {
    message?: string;
}

export function FormSuccess(props: FormSuccessProps){
    if(!props.message){
        return null;
    }

    return (
        <div className="flex items-center gap-4 bg-green-500/15 text-green-500 text-sm py-2 px-3 rounded-md">
            <CheckCircledIcon className='size-4' />
            {props.message}
        </div>
    )
}