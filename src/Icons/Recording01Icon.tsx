import { SVGProps } from "react"

interface Recording01IconSVGProps extends SVGProps<SVGSVGElement> {
    pathStroke?: string;
}

const Recording01Icon = ({ pathStroke = "#6C7275", ...props }: Recording01IconSVGProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke={pathStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2C13.6569 2 15 3.34315 15 5V11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11V5C9 3.34315 10.3431 2 12 2Z"
        />
        <path
            stroke={pathStroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11C19 14.866 15.866 18 12 18V18C8.13401 18 5 14.866 5 11M12 18V22M9 22H15"
        />
    </svg>
)
export default Recording01Icon
