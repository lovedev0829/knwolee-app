import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
    pathFill?: string;
}


function HelpIconComponent({ pathFill = "#000", ...svgProps }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...svgProps}
        >
            <path
                fill={pathFill}
                d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
            />
            <path
                fill={pathFill}
                d="M12 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 10a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1Z"
            />
        </svg>
    );
}

export default HelpIconComponent;
