export interface ButtonProps {
    variant : 'Primary' | 'Secondary';
    size : 'sm' | 'md' | 'lg';
    text : string;
    startIcon? : any;
    endIcon? : any;
    onClick : () => void;
}

const variantStyles = {
    "Primary" : "bg-purple-600 text-white",
    "Secondary" : "bg-purple-300 text-purple-600"
}

const sizeStyles = {
    "sm" : "px-4 py-1",
    "md" : "px-7 py-2",
    "lg" : "px-11 py-3"
}

const defaultStyle = "rounded-md p-4"



export const Button = (props : ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyle} ${sizeStyles[props.size]} flex place-content-evenly gap-3`}>
        {props.startIcon && <span>{props.startIcon}</span>}
        {props.text}
        {props.endIcon && <span>{props.endIcon}</span>}
  </button>
}