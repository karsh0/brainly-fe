import React, { ReactElement } from "react"

interface ButtonInterface{
    size: "sm" | "md" | "lg",
    startIcon? : ReactElement,
    endIcon? : ReactElement,
    title: String,
    variant:"primary" | "secondary" | "danger",
    onClick?: () => void,
    fullWidth?: boolean,
    loading?: boolean
}


const sizeStyles = {
    "lg": "px-8 py-4 text-xl rounded-xl",
    "md": "px-4 py-2 text-md rounded-md",
    "sm": "px-2 py-1 text-sm rounded-sm",
}

const variantStyles = {
    "primary": "bg-[#5046e5] text-white",
    "secondary": "bg-[#e0e7ff] text-purple-600",
    "danger" : "bg-red-500 text-white"
}


export const Button = ({size, startIcon, title, variant, onClick, fullWidth, loading}: ButtonInterface) =>{
    const startIconWithProps = startIcon ? React.cloneElement(startIcon, {size}) : null;

    return  <button onClick={onClick} className={sizeStyles[size] + " " + variantStyles[variant] + `${fullWidth ? " w-full" : ""}`+ `${loading ? ' opacity-45' : ""}`  } disabled={loading}>
    <div className="flex items-center justify-center">
        {startIconWithProps}
        <div className="pl-2 pr-2">
            {title}
        </div>
    </div>
</button>
}