import { SVGProps } from "react";

const MobileMenuIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path
            fill="#6C7275"
            fillRule="evenodd"
            d="M2 8.5a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM2 15.5a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Z"
            clipRule="evenodd"
        />
    </svg>
);
export default MobileMenuIcon;
