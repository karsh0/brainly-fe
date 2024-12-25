
interface InputProps{
    reference: any,
    placeholder: string,
    onKeyUp?: ()=>void
}

export function Input({reference, placeholder, onKeyUp}: InputProps){
    return <div>
        <input ref={reference} type="text" placeholder={placeholder} onKeyUp={onKeyUp}  className="p-2 border rounded w-full text-black"/>
    </div>
}