import { type IconProps, iconSizeVariants } from "./config";
export const CrossIcon = (props: IconProps) => {
    const sizeClass = iconSizeVariants[props.size || "sm"];
    const defaultStrokeWidth = 1.5;
    const defaultStroke = "currentColor";

    return (
        <svg
            {...props}
            className={sizeClass} 
           xmlns="http://www.w3.org/2000/svg"
            fill="none" 
            viewBox="0 0 24 24"
            strokeWidth={props.strokeWidth || defaultStrokeWidth}
            stroke={props.stroke || defaultStroke}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
            />
        </svg>
    );
};